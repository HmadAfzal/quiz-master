import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, score, totalQuestions, category, difficulty } = body;
    let stringCategory;
    if (category == "9") {
      stringCategory = "General Knowledge";
    } else if (category == "28") {
      stringCategory = "Vehicles";
    } else if (category == "23") {
      stringCategory = "History";
    } else {
      stringCategory = "Animals";
    }
    const gameHistory = await prisma.gameHistory.create({
      data: {
        userId,
        score,
        totalQuestions,
        category:stringCategory,
        difficulty,
      },
    });

    return NextResponse.json(gameHistory);
  } catch (error) {
    console.error("Error creating game history:", error);
    return NextResponse.json(
      { error: "Error creating game history" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const gameHistory = await prisma.gameHistory.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(gameHistory);
  } catch (error) {
    console.error("Error fetching game history:", error);
    return NextResponse.json(
      { error: "Error fetching game history" },
      { status: 500 }
    );
  }
}
