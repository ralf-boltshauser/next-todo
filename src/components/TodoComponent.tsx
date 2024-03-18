"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useOptimistic } from "react";
import { deleteTodoById, toggleTodoDone } from "../app/actions";

export default function TodoComponent({ todo }: { todo: Todo }) {
  const deleteTodo = deleteTodoById.bind(null, todo.id);
  const toggleTodo = toggleTodoDone.bind(null, todo.id);

  const handleUpdate = async () => {
    setOptimisticTodo(!todo.done);
    await toggleTodo();
  };

  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    { done: todo.done, optimistic: false },
    (state: any, newState: boolean) => {
      // toggleTodo();
      return { done: newState, optimistic: true };
    }
  );

  return (
    <div className="flex gap-2 justify-between items-center mt-3 max-w-[200px]">
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: optimisticTodo.optimistic ? 0.8 : 1 }}
          className="flex justify-center items-center"
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 260,
            damping: 10,

            // repeat: Infinity,
            // ease: "easeInOut",
            // repeatType: "reverse",
          }}
        >
          <Checkbox onClick={handleUpdate} checked={optimisticTodo.done} />
        </motion.div>
        <h2>{todo.title}</h2>
      </div>
      <Button size={"sm"} variant={"destructive"} onClick={() => deleteTodo()}>
        <TrashIcon />
      </Button>
    </div>
  );
}
