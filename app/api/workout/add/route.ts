import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { type, distance, date, duration, userId } = await req.json();

  // Optional: Validate that the user with userId exists
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        type,
        duration,
        distance,
        date: new Date(date),
        userId: userId, // associate the workout with the user
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
