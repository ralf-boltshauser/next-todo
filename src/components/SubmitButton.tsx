"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-3" disabled={pending} size={"sm"}>
      <span className={pending ? "animate-spin" : ""}>Add</span>
    </Button>
  );
}
