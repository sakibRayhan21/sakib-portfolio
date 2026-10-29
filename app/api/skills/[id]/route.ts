import { NextResponse } from "next/server";
import { z } from "zod";
import { updateSkill, deleteSkill } from "@/lib/portfolio-store";

const updateSkillSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  level: z.number().min(1).max(100).optional(),
});

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
    }

    const body = await request.json();
    const result = updateSkillSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid skill data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateSkill(numericId, result.data);
    if (!updated) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update skill:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
    }

    const deleted = await deleteSkill(numericId);
    if (!deleted) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
