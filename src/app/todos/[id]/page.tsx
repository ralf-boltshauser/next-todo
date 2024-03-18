import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });

  return {
    title: "Todo - " + todo?.title,
    description: "Todo description",
  };
}

export default async function Todo({ params }: { params: { id: string } }) {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.done ? "Done" : "Not done"}</p>
    </div>
  );
}
