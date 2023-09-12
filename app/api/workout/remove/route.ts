import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const request = req;
  const workoutId = request.nextUrl.searchParams.get("id");

  if (!workoutId) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  const id = parseInt(workoutId, 10);

  try {
    const workout = await prisma.workout.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(workout);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting workout" },
      { status: 500 }
    );
  }
}
