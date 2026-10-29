import { NextResponse } from "next/server";
import { z } from "zod";
import { getSkills, addSkill } from "@/lib/portfolio-store";

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.number().min(1).max(100).optional().default(80),
});

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = skillSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid skill data",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const createdSkill = await addSkill({
      name: result.data.name,
      category: result.data.category,
      level: result.data.level,
    });

    return NextResponse.json(createdSkill, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
