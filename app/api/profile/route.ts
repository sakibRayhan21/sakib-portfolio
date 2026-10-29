import { NextResponse } from "next/server";
import { z } from "zod";
import { getProfile, updateProfile } from "@/lib/portfolio-store";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  bio: z.string().optional(),
  aboutP1: z.string().optional(),
  aboutP2: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  resumeUrl: z.string().optional(),
  profileImage: z.string().optional(),
  whatIDo: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid profile data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateProfile(result.data);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
