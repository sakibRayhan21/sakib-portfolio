import { NextResponse } from "next/server";
import { resetToDefault } from "@/lib/portfolio-store";

export async function POST() {
  try {
    const data = await resetToDefault();
    return NextResponse.json({ success: true, message: "Reset to default data successfully", data });
  } catch (error) {
    console.error("Failed to reset portfolio data:", error);
    return NextResponse.json({ error: "Failed to reset portfolio data" }, { status: 500 });
  }
}
