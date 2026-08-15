
"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  technologies: {
    id: number;
    name: string;
  }[];
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-14">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            My Work
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Featured Projects
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
            A selection of projects that demonstrate my experience
            with software development, AI, and full-stack technologies.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-400">
            Loading projects...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {/* No Projects */}
        {!loading && !error && projects.length === 0 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-10 text-center">
            <p className="text-gray-400">
              No projects available yet.
            </p>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-500/10"
              >

                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full border border-blue-400/20 bg-gray-950/80 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology.id}
                          className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-xs text-gray-300"
                        >
                          {technology.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-3">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-blue-500 hover:text-blue-400"
                      >
                        GitHub
                        <span className="ml-2">↗</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                      >
                        Live Demo
                        <span className="ml-2">↗</span>
                      </a>
                    )}

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
