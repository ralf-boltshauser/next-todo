import { PrismaClient } from "@prisma/client";
import { ImageResponse } from "next/og";

// Route segment config

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";
const prisma = new PrismaClient();
// Image generation
export default async function Icon({ params }: { params: { id: string } }) {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {todo?.title[0]}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
