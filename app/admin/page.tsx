"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ShieldIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  ExternalLinkIcon,
  GithubIcon,
  CheckIcon,
  CloseIcon,
  ArrowLeftIcon,
  StarIcon,
  CodeIcon,
  FolderIcon,
} from "@/components/Icons";
import { Project, Skill } from "@/lib/portfolio-store";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  aboutP1: string;
  aboutP2: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  whatIDo: string[];
}

function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab State
  const initialTab = searchParams.get("tab") || "projects";
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "profile" | "backup">(
    initialTab as any
  );

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    title: "",
    bio: "",
    aboutP1: "",
    aboutP2: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    whatIDo: [],
  });
  const [newFocusItem, setNewFocusItem] = useState("");

  // Loading & Toast States
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Project Modals State
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tags: "",
    image: "🚀",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  // Skill Modals State
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Programming",
    customCategory: "",
    level: 85,
  });

  // Show Toast
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Check Local Auth
  useEffect(() => {
    const savedAuth = localStorage.getItem("portfolio_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode: admin123 (or can be any custom)
    if (passcode === "admin123" || passcode === "admin" || passcode === "sakib2026") {
      setIsAuthenticated(true);
      localStorage.setItem("portfolio_admin_auth", "true");
      setAuthError("");
      showToast("Signed in to Admin Panel");
    } else {
      setAuthError("Incorrect passcode. Hint: Use 'admin123'");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("portfolio_admin_auth");
    showToast("Logged out successfully");
  };

  // Fetch All Data
  const loadAllData = async () => {
    try {
      setLoading(true);
      const [projRes, skillRes, profRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/skills"),
        fetch("/api/profile"),
      ]);

      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData);
      }
      if (skillRes.ok) {
        const skillData = await skillRes.json();
        setSkills(skillData);
      }
      if (profRes.ok) {
        const profData = await profRes.json();
        setProfile(profData);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
      showToast("Error loading portfolio data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Sync Tab with URL parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["projects", "skills", "profile", "backup"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
    const editProjId = searchParams.get("edit");
    if (editProjId && projects.length > 0) {
      const p = projects.find((item) => item.id === Number(editProjId));
      if (p) {
        openEditProject(p);
      }
    }
  }, [searchParams, projects]);

  // ===================== PROJECT HANDLERS =====================
  const openAddProject = () => {
    setProjectForm({
      title: "",
      description: "",
      tags: "",
      image: "🚀",
      githubUrl: "",
      liveUrl: "",
      featured: false,
    });
    setEditingProject(null);
    setIsAddProjectOpen(true);
  };

  const openEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      tags: (proj.tags || []).join(", "),
      image: proj.image || "🚀",
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
      featured: proj.featured || false,
    });
    setIsAddProjectOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const tagsArray = projectForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: projectForm.title.trim(),
      description: projectForm.description.trim(),
      tags: tagsArray,
      image: projectForm.image.trim() || "🚀",
      githubUrl: projectForm.githubUrl.trim() || null,
      liveUrl: projectForm.liveUrl.trim() || null,
      featured: projectForm.featured,
    };

    try {
      if (editingProject) {
        // PUT update
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update project");
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast("Project updated successfully");
      } else {
        // POST create
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create project");
        const created = await res.json();
        setProjects((prev) => [created, ...prev]);
        showToast("Project created successfully");
      }
      setIsAddProjectOpen(false);
      setEditingProject(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save project", "error");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project deleted");
    } catch (err: any) {
      showToast(err.message || "Error deleting project", "error");
    }
  };

  const handleToggleFeatured = async (proj: Project) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !proj.featured }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showToast(updated.featured ? "Project featured!" : "Removed from featured");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  // ===================== SKILL HANDLERS =====================
  const openAddSkill = () => {
    setSkillForm({
      name: "",
      category: "Programming",
      customCategory: "",
      level: 85,
    });
    setEditingSkill(null);
    setIsAddSkillOpen(true);
  };

  const openEditSkill = (s: Skill) => {
    setEditingSkill(s);
    const standardCategories = [
      "Programming",
      "Frontend",
      "Backend",
      "Database & Tools",
      "DevOps & Cloud",
      "AI & Machine Learning",
    ];
    const isStandard = standardCategories.includes(s.category);

    setSkillForm({
      name: s.name,
      category: isStandard ? s.category : "Custom",
      customCategory: isStandard ? "" : s.category,
      level: s.level ?? 80,
    });
    setIsAddSkillOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    const finalCategory =
      skillForm.category === "Custom"
        ? skillForm.customCategory.trim()
        : skillForm.category;

    if (!finalCategory) {
      showToast("Please provide a valid category", "error");
      return;
    }

    const payload = {
      name: skillForm.name.trim(),
      category: finalCategory,
      level: Number(skillForm.level),
    };

    try {
      if (editingSkill) {
        const res = await fetch(`/api/skills/${editingSkill.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update skill");
        const updated = await res.json();
        setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        showToast("Skill updated successfully");
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create skill");
        const created = await res.json();
        setSkills((prev) => [...prev, created]);
        showToast("Skill added successfully");
      }
      setIsAddSkillOpen(false);
      setEditingSkill(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save skill", "error");
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast("Skill removed");
    } catch (err: any) {
      showToast(err.message || "Error deleting skill", "error");
    }
  };

  // ===================== PROFILE HANDLERS =====================
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      const updated = await res.json();
      setProfile(updated);
      showToast("Profile personalized and saved!");
    } catch (err: any) {
      showToast(err.message || "Error saving profile", "error");
    }
  };

  const handleAddFocusItem = () => {
    if (!newFocusItem.trim()) return;
    setProfile((prev) => ({
      ...prev,
      whatIDo: [...(prev.whatIDo || []), newFocusItem.trim()],
    }));
    setNewFocusItem("");
  };

  const handleRemoveFocusItem = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      whatIDo: (prev.whatIDo || []).filter((_, i) => i !== index),
    }));
  };

  // ===================== BACKUP & RESET =====================
  const handleResetDefaults = async () => {
    if (
      !confirm(
        "Are you sure you want to reset portfolio data to original defaults? Any custom additions will be restored to initial sample."
      )
    )
      return;
    try {
      const res = await fetch("/api/reset", { method: "POST" });
      if (!res.ok) throw new Error("Failed to reset");
      await loadAllData();
      showToast("Reset to defaults successfully");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ profile, skills, projects }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Backup JSON file exported");
  };

  // ===================== LOGIN SCREEN =====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
            <ShieldIcon className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold text-center text-white">
            Portfolio Admin
          </h1>
          <p className="mt-2 text-center text-xs text-gray-400">
            Sign in to personalize your profile, add skills & projects
          </p>

          {authError && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition active:scale-98"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              Back to Portfolio
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-900 text-center">
            <p className="text-[11px] text-gray-500">
              Default passcode: <code className="text-blue-400 bg-gray-900 px-1.5 py-0.5 rounded">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===================== ADMIN DASHBOARD =====================
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-2xl border transition duration-300 ${
            toast.type === "success"
              ? "border-blue-500/40 bg-gray-900 text-blue-400 shadow-blue-500/10"
              : "border-red-500/40 bg-gray-900 text-red-400 shadow-red-500/10"
          }`}
        >
          {toast.type === "success" ? (
            <CheckIcon className="w-4 h-4 text-blue-400" />
          ) : (
            <CloseIcon className="w-4 h-4 text-red-400" />
          )}
          {toast.message}
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:border-gray-700 transition"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <ShieldIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-red-400 hover:border-red-500/30 transition"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl gap-2 px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-medium transition ${
              activeTab === "projects"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <FolderIcon className="w-4 h-4" />
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-medium transition ${
              activeTab === "skills"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <CodeIcon className="w-4 h-4" />
            Skills ({skills.length})
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-medium transition ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <ShieldIcon className="w-4 h-4" />
            Personal Profile & Bio
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-medium transition ${
              activeTab === "backup"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <ExternalLinkIcon className="w-4 h-4" />
            Data & Backup
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading portfolio data...</div>
        ) : (
          <>
            {/* ==================== PROJECTS TAB ==================== */}
            {activeTab === "projects" && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Project Manager</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Add, update, feature, or remove projects shown on your portfolio
                    </p>
                  </div>

                  <button
                    onClick={openAddProject}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add New Project
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-800 p-12 text-center">
                    <p className="text-gray-400">No projects added yet.</p>
                    <button
                      onClick={openAddProject}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <PlusIcon className="w-4 h-4" /> Add your first project
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-2xl border border-gray-800 bg-gray-950 p-5 flex flex-col justify-between hover:border-gray-700 transition"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <span className="text-3xl">{proj.image || "🚀"}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleToggleFeatured(proj)}
                                title={proj.featured ? "Featured on homepage" : "Mark as featured"}
                                className={`rounded-lg p-1.5 text-xs transition ${
                                  proj.featured
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    : "bg-gray-900 text-gray-500 hover:text-gray-300"
                                }`}
                              >
                                <StarIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                          <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                            {proj.description}
                          </p>

                          {proj.tags && proj.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {proj.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="rounded bg-gray-900 px-2 py-0.5 text-[11px] text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-5 pt-3 border-t border-gray-900 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1"
                              >
                                <GithubIcon className="w-3.5 h-3.5" /> Source
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                              >
                                <ExternalLinkIcon className="w-3.5 h-3.5" /> Demo
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditProject(proj)}
                              className="rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-gray-900 transition"
                              title="Edit Project"
                            >
                              <EditIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="rounded-lg p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-900 transition"
                              title="Delete Project"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ==================== SKILLS TAB ==================== */}
            {activeTab === "skills" && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Skills Manager</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Add, categorize, adjust proficiency, and manage technical capabilities
                    </p>
                  </div>

                  <button
                    onClick={openAddSkill}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add New Skill
                  </button>
                </div>

                {skills.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-800 p-12 text-center">
                    <p className="text-gray-400">No skills added yet.</p>
                    <button
                      onClick={openAddSkill}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <PlusIcon className="w-4 h-4" /> Add your first skill
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from(new Set(skills.map((s) => s.category || "General"))).map((category) => {
                      const catSkills = skills.filter((s) => (s.category || "General") === category);
                      return (
                        <div
                          key={category}
                          className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                              <h3 className="font-bold text-white">{category}</h3>
                              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                                {catSkills.length} skills
                              </span>
                            </div>

                            <div className="space-y-3">
                              {catSkills.map((s) => (
                                <div
                                  key={s.id}
                                  className="group flex items-center justify-between rounded-xl bg-gray-900/50 p-2.5 hover:bg-gray-900 transition"
                                >
                                  <div>
                                    <div className="text-sm font-medium text-white">{s.name}</div>
                                    {s.level && (
                                      <div className="text-[11px] text-gray-500 font-mono">
                                        Level: {s.level}%
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                                    <button
                                      onClick={() => openEditSkill(s)}
                                      className="p-1 text-gray-400 hover:text-white"
                                      title="Edit Skill"
                                    >
                                      <EditIcon className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSkill(s.id)}
                                      className="p-1 text-gray-400 hover:text-red-400"
                                      title="Delete Skill"
                                    >
                                      <TrashIcon className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ==================== PROFILE TAB ==================== */}
            {activeTab === "profile" && (
              <div className="max-w-4xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information & Bio</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Personalize your name, developer title, hero bio, contact details, and links
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        required
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        Professional Title / Headline *
                      </label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        required
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Hero Introduction Bio
                    </label>
                    <textarea
                      rows={2}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        About Me: Paragraph 1
                      </label>
                      <textarea
                        rows={3}
                        value={profile.aboutP1}
                        onChange={(e) => setProfile({ ...profile, aboutP1: e.target.value })}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        About Me: Paragraph 2
                      </label>
                      <textarea
                        rows={3}
                        value={profile.aboutP2}
                        onChange={(e) => setProfile({ ...profile, aboutP2: e.target.value })}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={profile.githubUrl}
                        onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={profile.linkedinUrl}
                        onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Resume Link / File URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /resume.pdf or https://drive.google.com/..."
                      value={profile.resumeUrl}
                      onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                      className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Focus Areas */}
                  <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                      Focus Areas / What I Do Bullet Points
                    </label>

                    <div className="space-y-2 mb-4">
                      {(profile.whatIDo || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-xl bg-gray-900 px-3 py-2 text-sm text-gray-300"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFocusItem(idx)}
                            className="text-gray-400 hover:text-red-400 p-1"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a new focus point (e.g. Cloud & DevOps Architecture)"
                        value={newFocusItem}
                        onChange={(e) => setNewFocusItem(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddFocusItem}
                        className="rounded-xl bg-gray-800 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-700 transition"
                      >
                        Add Point
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ==================== BACKUP & DATA TAB ==================== */}
            {activeTab === "backup" && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Data Management & Backup</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Export your custom portfolio data or reset to factory defaults
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Export Backup</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Download a full JSON backup of all your projects, skills, and personalized profile settings to save locally.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-900 border border-gray-800 px-4 py-2.5 text-sm font-semibold text-white hover:border-gray-700 hover:bg-gray-850 transition"
                  >
                    <ExternalLinkIcon className="w-4 h-4 text-blue-400" />
                    Export Backup (JSON)
                  </button>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-gray-950 p-6 space-y-4">
                  <h3 className="font-bold text-red-400 text-base">Reset to Sample Defaults</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Restores the initial sample profile, skills, and projects dataset. Use this if you want to start over from scratch.
                  </p>
                  <button
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Reset Data to Defaults
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ==================== PROJECT MODAL ==================== */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl my-8">
            <button
              onClick={() => setIsAddProjectOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Task Queue"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Project purpose, technical implementation, and highlights..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Emoji / Icon
                  </label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-800 bg-gray-900 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-300">Featured</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Technologies / Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, TypeScript, PostgreSQL"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== SKILL MODAL ==================== */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
            <button
              onClick={() => setIsAddSkillOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. GraphQL, Kubernetes, Rust"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="Programming">Programming</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database & Tools">Database & Tools</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Custom">+ Custom Category</option>
                </select>
              </div>

              {skillForm.category === "Custom" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Custom Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mobile Development"
                    value={skillForm.customCategory}
                    onChange={(e) => setSkillForm({ ...skillForm, customCategory: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Proficiency Level ({skillForm.level}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                  className="w-full h-2 rounded-lg bg-gray-800 accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition"
                >
                  {editingSkill ? "Save Changes" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-12 text-center">Loading Admin Panel...</div>}>
      <AdminContent />
    </Suspense>
  );
}
