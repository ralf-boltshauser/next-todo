"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { toast } from "sonner";
import { addTodo } from "../app/actions";
import SubmitButton from "./SubmitButton";

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null) as any;
  const handleFormSubmit = async (event: FormData) => {
    await addTodo(event);
    formRef.current.reset();
    toast.success("todo added");
  };
  return (
    <form action={handleFormSubmit} ref={formRef}>
      <Card className="mt-16">
        <CardHeader>
          <CardTitle>Add new todo</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="What needs to be done?" name="title" />
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
