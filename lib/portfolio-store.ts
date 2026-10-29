import fs from "fs/promises";
import path from "path";

export interface Skill {
  id: number;
  name: string;
  category: string;
  level?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  image?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  aboutP1: string;
  aboutP2: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  profileImage?: string;
  whatIDo: string[];
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  startYear?: number;
  endYear?: number;
  status?: string;
  description?: string;
}

export interface AchievementItem {
  id: number;
  title: string;
  icon?: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  education: EducationItem[];
  achievements: AchievementItem[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio.json");
const DEFAULT_DATA_FILE_PATH = path.join(process.cwd(), "data", "default-portfolio.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(raw) as PortfolioData;
  } catch (error) {
    try {
      const defaultRaw = await fs.readFile(DEFAULT_DATA_FILE_PATH, "utf-8");
      const defaultData = JSON.parse(defaultRaw) as PortfolioData;
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    } catch {
      return getFallbackData();
    }
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Skills Helpers
export async function getSkills(): Promise<Skill[]> {
  const data = await getPortfolioData();
  return data.skills;
}

export async function addSkill(skillInput: Omit<Skill, "id">): Promise<Skill> {
  const data = await getPortfolioData();
  const nextId = data.skills.length > 0 ? Math.max(...data.skills.map((s) => s.id)) + 1 : 1;
  const newSkill: Skill = {
    id: nextId,
    name: skillInput.name.trim(),
    category: skillInput.category.trim(),
    level: skillInput.level ?? 80,
  };
  data.skills.push(newSkill);
  await savePortfolioData(data);
  return newSkill;
}

export async function updateSkill(id: number, updates: Partial<Omit<Skill, "id">>): Promise<Skill | null> {
  const data = await getPortfolioData();
  const index = data.skills.findIndex((s) => s.id === id);
  if (index === -1) return null;

  data.skills[index] = {
    ...data.skills[index],
    ...updates,
    id,
  };
  await savePortfolioData(data);
  return data.skills[index];
}

export async function deleteSkill(id: number): Promise<boolean> {
  const data = await getPortfolioData();
  const initialLength = data.skills.length;
  data.skills = data.skills.filter((s) => s.id !== id);
  if (data.skills.length !== initialLength) {
    await savePortfolioData(data);
    return true;
  }
  return false;
}

// Projects Helpers
export async function getProjects(): Promise<Project[]> {
  const data = await getPortfolioData();
  return data.projects;
}

export async function addProject(projectInput: Omit<Project, "id">): Promise<Project> {
  const data = await getPortfolioData();
  const nextId = data.projects.length > 0 ? Math.max(...data.projects.map((p) => p.id)) + 1 : 1;
  const newProject: Project = {
    id: nextId,
    title: projectInput.title.trim(),
    description: projectInput.description.trim(),
    tags: projectInput.tags ?? [],
    image: projectInput.image || "💻",
    githubUrl: projectInput.githubUrl || null,
    liveUrl: projectInput.liveUrl || null,
    featured: projectInput.featured ?? false,
  };
  data.projects.unshift(newProject);
  await savePortfolioData(data);
  return newProject;
}

export async function updateProject(id: number, updates: Partial<Omit<Project, "id">>): Promise<Project | null> {
  const data = await getPortfolioData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  data.projects[index] = {
    ...data.projects[index],
    ...updates,
    id,
  };
  await savePortfolioData(data);
  return data.projects[index];
}

export async function deleteProject(id: number): Promise<boolean> {
  const data = await getPortfolioData();
  const initialLength = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id);
  if (data.projects.length !== initialLength) {
    await savePortfolioData(data);
    return true;
  }
  return false;
}

// Profile Helpers
export async function getProfile(): Promise<Profile> {
  const data = await getPortfolioData();
  return data.profile;
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
  const data = await getPortfolioData();
  data.profile = {
    ...data.profile,
    ...updates,
  };
  await savePortfolioData(data);
  return data.profile;
}

export async function resetToDefault(): Promise<PortfolioData> {
  try {
    const defaultRaw = await fs.readFile(DEFAULT_DATA_FILE_PATH, "utf-8");
    const defaultData = JSON.parse(defaultRaw) as PortfolioData;
    await savePortfolioData(defaultData);
    return defaultData;
  } catch {
    const fallback = getFallbackData();
    await savePortfolioData(fallback);
    return fallback;
  }
}

function getFallbackData(): PortfolioData {
  return {
    profile: {
      name: "Sakib Rayhan",
      title: "Full-Stack Developer",
      bio: "I build modern web applications, solve programming problems, and explore the world of software engineering, AI, and full-stack development.",
      aboutP1: "I am a Computer Science and Engineering student with a strong interest in software development, competitive programming, artificial intelligence, and modern web technologies.",
      aboutP2: "I enjoy turning ideas into practical software and continuously improving my problem-solving and engineering skills through projects and programming challenges.",
      email: "sakib.rayhan.dev@example.com",
      githubUrl: "https://github.com/sakibRayhan21",
      linkedinUrl: "https://linkedin.com/in/sakibrayhan",
      resumeUrl: "#",
      profileImage: "/avatar.svg",
      whatIDo: [
        "Full-Stack Web Development",
        "Competitive Programming",
        "AI & Machine Learning Exploration",
        "Software Project Development",
      ],
    },
    skills: [
      { id: 1, name: "C++", category: "Programming", level: 90 },
      { id: 2, name: "JavaScript", category: "Programming", level: 90 },
      { id: 3, name: "React", category: "Frontend", level: 90 },
      { id: 4, name: "Node.js", category: "Backend", level: 85 },
      { id: 5, name: "PostgreSQL", category: "Database & Tools", level: 80 },
    ],
    projects: [
      {
        id: 1,
        title: "Offline University Messenger",
        description: "A communication platform designed to help university students communicate when internet connectivity is limited.",
        tags: ["Next.js", "Node.js", "PostgreSQL"],
        githubUrl: "https://github.com/sakibRayhan21",
        liveUrl: "",
        featured: true,
        image: "💬",
      },
    ],
    education: [
      {
        id: 1,
        institution: "Khwaja Yunus Ali University",
        degree: "Bachelor of Science in Computer Science & Engineering",
        startYear: 2022,
        endYear: 2026,
        status: "Current",
        description: "Studying computer science with a focus on programming, algorithms, and software engineering.",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Competitive Programming",
        icon: "🏆",
        description: "Active participation in competitive programming and algorithmic problem solving.",
      },
    ],
  };
}
