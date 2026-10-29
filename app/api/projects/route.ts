import { NextResponse } from "next/server";
import { z } from "zod";
import { getProjects, addProject } from "@/lib/portfolio-store";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).optional().default([]),
  image: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().or(z.literal("")).nullable(),
  liveUrl: z.string().url().optional().or(z.literal("")).nullable(),
  featured: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = projectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid project data",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const createdProject = await addProject({
      title: result.data.title,
      description: result.data.description,
      tags: result.data.tags || [],
      image: result.data.image || "💻",
      githubUrl: result.data.githubUrl || null,
      liveUrl: result.data.liveUrl || null,
      featured: result.data.featured ?? false,
    });

    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
