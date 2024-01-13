import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const {
    type,
    distance,
    date,
    duration,
    userId,
    isComplete,
    note,
    title,
    effort,
  } = await req.json();

  const workoutId = parseInt(req.nextUrl.searchParams.get("id"));

  try {
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        title,
        type,
        duration,
        distance,
        date: new Date(date),
        userId: userId,
        isComplete: isComplete,
        note,
        effort,
      },
    });
    return NextResponse.json(updatedWorkout);
  } catch (error) {
    console.error("Error when updating workout:", error);
    return NextResponse.json(
      { error: "Error updating workout" },
      { status: 500 }
    );
  }
}
