import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    title,
    type,
    distance,
    date,
    duration,
    userId,
    isComplete,
    description,
  } = await req.json();

  const userExists = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  if (!userExists) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const event = await prisma.event.create({
      data: {
        title,
        type,
        duration,
        distance,
        date: new Date(date),
        userId,
        isComplete: false,
        description,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error when adding workout:", error);
    return NextResponse.json(
      { error: "Error adding workout" },
      { status: 500 }
    );
  }
}
