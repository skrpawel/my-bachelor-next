import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { type, date, duration, userId } = await req.json();

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
        date: new Date(date),
        duration,
        userId, // associate the workout with the user
      },
    });
    return NextResponse.json(workout);
  } catch (error) {
    // Handle the error appropriately
    return NextResponse.json(
      { error: "Error adding workout" },
      { status: 500 }
    );
  }
}
