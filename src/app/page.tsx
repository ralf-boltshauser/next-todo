import UseOpmtiisticComp from "@/components/Useoptimistic";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/client";
import { Suspense } from "react";
import TodoComponent from "../components/TodoComponent";
import TodoForm from "../components/TodoFormComponent";

export default async function Home() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">todos</h2>
      <Suspense
        fallback={
          <div className="mt-5">
            <Skeleton className="w-[250px] h-8 mt-5" />
            <Skeleton className="w-[250px] h-8 mt-5" />
            <Skeleton className="w-[250px] h-8 mt-5" />
          </div>
        }
      >
        <TodoList />
      </Suspense>
      <TodoForm />
      <UseOpmtiisticComp />
    </div>
  );
}

async function TodoList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const todos = await prisma.todo.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div>
      {" "}
      {todos.map((todo) => (
        <TodoComponent todo={todo} key={todo.id} />
      ))}
    </div>
  );
}
