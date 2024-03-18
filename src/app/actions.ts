"use server";
import { prisma } from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const title = formData.get("title") as string;
  await prisma.todo.create({ data: { title } });

  revalidatePath("/");
}

export async function deleteTodoById(id: number) {
  console.log("deleting todo", id);
  await prisma.todo.delete({ where: { id } });

  revalidatePath("/");
}

export async function toggleTodoDone(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) return;

  await prisma.todo.update({
    where: { id },
    data: { done: !todo.done },
  });

  revalidatePath("/");
}
