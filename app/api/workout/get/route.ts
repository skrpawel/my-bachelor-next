import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req;

  // Grab the userId from the query parameters

  if (!userId) {
    return NextResponse.json({ error: "UserId not provided" }, { status: 400 });
  }

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId: 1,
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
