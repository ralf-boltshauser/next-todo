"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deleteTodoById, toggleTodoDone } from "./actions";

export default function TodoComponent({ todo }: { todo: Todo }) {
  const deleteTodo = deleteTodoById.bind(null, todo.id);
  const toggleTodo = toggleTodoDone.bind(null, todo.id);
  return (
    <Link href={`/todos/${todo.id}`}>
      <div className="flex gap-2 justify-between items-center mt-3 max-w-[200px]">
        <div className="flex items-center gap-2">
          <Checkbox onClick={() => toggleTodo()} checked={todo.done} />
          <h2>{todo.title}</h2>
        </div>
        <Button
          size={"sm"}
          variant={"destructive"}
          onClick={() => deleteTodo()}
        >
          <TrashIcon />
        </Button>
      </div>
    </Link>
  );
}
