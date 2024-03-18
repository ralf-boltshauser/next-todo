import { PrismaClient } from "@prisma/client";
import { ImageResponse } from "next/og";

// Route segment config

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
const prisma = new PrismaClient();
// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });
  // Font
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {todo?.title}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
