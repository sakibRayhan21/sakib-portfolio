
import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  /*
   * ==========================================
   * PROFILE
   * ==========================================
   */

  const profile = await prisma.profile.upsert({
    where: {
      id: 1,
    },
    update: {
      name: "MD. Sakib Rayhan",
      title:
        "Competitive Programmer | Cybersecurity Enthusiast | Full-Stack Developer",
      bio: "I build modern web applications, solve programming problems, and explore software engineering with a focus on building strong foundations for cybersecurity.",
      email: "",
      profileImage: "/images/profile/sakib.png", 
      resumeUrl: null,
    },
    create: {
      name: "MD. Sakib Rayhan",
      title:
        "Competitive Programmer | Cybersecurity Enthusiast | Full-Stack Developer",
      bio: "I build modern web applications, solve programming problems, and explore software engineering with a focus on building strong foundations for cybersecurity.",
      email: "",
      profileImage: "/images/profile/sakib.png",
      resumeUrl: null,
    },
  });

  /*
   * ==========================================
   * SOCIAL LINKS
   * ==========================================
   */

  const socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/sakibRayhan21",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/sakib-rayhan-913483205/",
    },
  ];

  for (const socialLink of socialLinks) {
    await prisma.socialLink.upsert({
      where: {
        platform: socialLink.platform,
      },
      update: {
        url: socialLink.url,
      },
      create: socialLink,
    });
  }

  /*
   * ==========================================
   * SKILLS
   * ==========================================
   */

  const skills = [
    // Programming
    { name: "C++", category: "Programming" },
    { name: "JavaScript", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "TypeScript", category: "Programming" },

    // Frontend
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "HTML & CSS", category: "Frontend" },

    // Backend
    { name: "Node.js", category: "Backend" },

    // Database & Tools
    { name: "PostgreSQL", category: "Database & Tools" },
    { name: "Prisma", category: "Database & Tools" },
    { name: "Git & GitHub", category: "Database & Tools" },
    { name: "VS Code", category: "Database & Tools" },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: {
        name_category: {
          name: skill.name,
          category: skill.category,
        },
      },
      update: {},
      create: skill,
    });
  }

  /*
   * ==========================================
   * PROJECT TECHNOLOGIES
   * ==========================================
   */

  const technologies = [
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
  ];

  const project = await prisma.project.findFirst({
    where: {
      title: "Sakib Rayhan Portfolio",
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  for (const name of technologies) {
    const technology = await prisma.technology.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });

    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        technologies: {
          connect: {
            id: technology.id,
          },
        },
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
