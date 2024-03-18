"use client";

import { useOptimistic } from "react";

export default function UseOpmtiisticComp() {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    { done: false, optimistic: false },
    async (state: any, newState: boolean) => {
      await toggleTodo();
      return { done: newState, optimistic: true };
    }
  );

  return (
    <div>
      UseOpmtiisticComp {JSON.stringify(optimisticTodo)}{" "}
      <button onClick={() => setOptimisticTodo(true)}>asdf</button>
    </div>
  );
}
async function toggleTodo() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
