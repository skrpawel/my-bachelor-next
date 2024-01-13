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
    note,
    effort,
    postNote,
  } = await req.json();

  // Optional: Validate that the user with userId exists
  const userExists = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  if (!userExists) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        title,
        type,
        duration,
        distance,
        date: new Date(date),
        userId, // associate the workout with the user
        isComplete: false,
        note,
        effort,
        postNote,
      },
    });
    return NextResponse.json(workout);
  } catch (error) {
    console.error("Error when adding workout:", error);
    return NextResponse.json(
      { error: "Error adding workout" },
      { status: 500 }
    );
  }
}
