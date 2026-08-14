import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional(),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

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

    const project = await prisma.project.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        image: result.data.image || null,
        githubUrl: result.data.githubUrl || null,
        liveUrl: result.data.liveUrl || null,
        featured: result.data.featured ?? false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
