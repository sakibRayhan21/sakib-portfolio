"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusIcon, CloseIcon, ShieldIcon } from "../Icons";

export interface Skill {
  id: number;
  name: string;
  category: string;
  level?: number;
}

export default function Skills({ initialSkills }: { initialSkills?: Skill[] }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
  const [loading, setLoading] = useState(!initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Programming");
  const [customCategory, setCustomCategory] = useState("");
  const [level, setLevel] = useState(85);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/skills");
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialSkills) {
      fetchSkills();
    }
  }, [initialSkills]);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalCategory = category === "Custom" ? customCategory.trim() : category;
    if (!finalCategory) {
      setError("Please specify a category");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category: finalCategory,
          level: Number(level),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add skill");
      }

      const newSkill = await res.json();
      setSkills((prev) => [...prev, newSkill]);
      setName("");
      setCustomCategory("");
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category || "General")));

  return (
    <section id="skills" className="px-6 py-24 relative">
      <div className="mx-auto max-w-6xl">
        {/* Header with Title and Add Skill Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              My Skills
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl text-white">
              Technologies I Work With
            </h2>
            <p className="mt-3 text-gray-400 text-sm max-w-xl">
              Languages, frameworks, and developer tools I use to craft high-performance applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-95"
            >
              <PlusIcon className="w-4 h-4" />
              Add Skill
            </button>

            <Link
              href="/admin?tab=skills"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-800 bg-gray-900/80 px-3.5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-gray-700 transition"
              title="Manage in Admin"
            >
              <ShieldIcon className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Manage</span>
            </Link>
          </div>
        </div>

        {/* Skills Content */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 rounded-2xl border border-gray-800 bg-gray-950 p-6" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-800 p-12 text-center">
            <p className="text-gray-400">No skills added yet.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              <PlusIcon className="w-4 h-4" /> Add your first skill
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => (s.category || "General") === cat);
              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-gray-800/80 bg-gray-950/60 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex items-center justify-between border-b border-gray-800/60 pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide">
                      {cat}
                    </h3>
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                      {catSkills.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {catSkills.map((skill) => (
                      <div key={skill.id} className="group/item">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300 font-medium group-hover/item:text-white transition">
                            {skill.name}
                          </span>
                          {skill.level && (
                            <span className="text-xs text-gray-500 font-mono">
                              {skill.level}%
                            </span>
                          )}
                        </div>
                        {skill.level && (
                          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-900">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500"
                              style={{ width: `${Math.min(100, Math.max(10, skill.level))}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Skill Quick Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
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
              <h3 className="text-xl font-bold text-white">Add New Skill</h3>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, Docker, Python"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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

              {category === "Custom" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Custom Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mobile Development"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Proficiency Level ({level}%)
                  </label>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-gray-800 accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
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
                  {submitting ? "Saving..." : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
