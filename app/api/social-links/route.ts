
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: {
        platform: "asc",
      },
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error("Failed to fetch social links:", error);

    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}
