import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const workoutId = parseInt(req.nextUrl.searchParams.get("id"));

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId: workoutId,
      },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching workouts" },
      { status: 500 }
    );
  }
}
