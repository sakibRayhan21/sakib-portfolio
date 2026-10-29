"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusIcon, CloseIcon, ShieldIcon, ExternalLinkIcon, GithubIcon, StarIcon } from "../Icons";

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

export default function Projects({ initialProjects }: { initialProjects?: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [activeFilter, setActiveFilter] = useState<"all" | "featured">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [image, setImage] = useState("🚀");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialProjects) {
      fetchProjects();
    }
  }, [initialProjects]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          tags,
          image: image.trim() || "🚀",
          githubUrl: githubUrl.trim() || null,
          liveUrl: liveUrl.trim() || null,
          featured,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add project");
      }

      const newProject = await res.json();
      setProjects((prev) => [newProject, ...prev]);

      // Reset form
      setTitle("");
      setDescription("");
      setTagsInput("");
      setGithubUrl("");
      setLiveUrl("");
      setFeatured(false);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred while adding the project");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects = activeFilter === "featured"
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section id="projects" className="px-6 py-24 relative">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              My Work
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl text-white">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-2xl text-gray-400 text-sm">
              A selection of projects demonstrating expertise in full-stack architecture, software engineering, and AI solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Toggle */}
            <div className="flex items-center rounded-xl border border-gray-800 bg-gray-950 p-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setActiveFilter("featured")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === "featured"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Featured ({projects.filter((p) => p.featured).length})
              </button>
            </div>

            {/* Add Project Action Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-95"
            >
              <PlusIcon className="w-4 h-4" />
              Add Project
            </button>

            {/* Manage in Admin */}
            <Link
              href="/admin?tab=projects"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-800 bg-gray-900/80 px-3.5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-gray-700 transition"
              title="Manage in Admin"
            >
              <ShieldIcon className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl border border-gray-800 bg-gray-950" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-800 p-12 text-center">
            <p className="text-gray-400">No projects found in this view.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              <PlusIcon className="w-4 h-4" /> Add a new project
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-950/70 transition duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  {/* Visual Header / Emoji Icon */}
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-900">
                    <span className="text-6xl transition duration-300 group-hover:scale-110 select-none">
                      {project.image || "🚀"}
                    </span>
                    {project.featured && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-500/40 px-2.5 py-1 text-xs font-medium text-blue-400">
                        <StarIcon className="w-3 h-3 text-blue-400" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-gray-900 p-6 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition"
                      >
                        <GithubIcon className="w-4 h-4" />
                        Source
                      </a>
                    ) : (
                      <span className="text-xs text-gray-600">Private Repo</span>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                      >
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/admin?tab=projects&edit=${project.id}`}
                    className="text-xs text-gray-500 hover:text-gray-300"
                    title="Edit in Admin"
                  >
                    Edit
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Add Project Quick Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <PlusIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white">Add New Project</h3>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Workflow Automation Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Project Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what the project does, key architecture, and impact..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Icon / Emoji Banner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 🚀, 💻, 🧠, ⚡"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-800 bg-gray-900 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-300">Feature on top</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Technologies / Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, TypeScript, Tailwind, PostgreSQL"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://myproject.demo.com"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-50 transition"
                >
                  {submitting ? "Saving..." : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
