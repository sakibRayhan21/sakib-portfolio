
"use client";

import { useEffect, useState } from "react";

type Skill = {
  id: number;
  name: string;
  category: string;
  level: number | null;
};

const categoryConfig = [
  {
    name: "Programming",
    description: "Languages I use for problem solving and software development.",
  },
  {
    name: "Frontend",
    description: "Technologies I use to build modern web interfaces.",
  },
  {
    name: "Backend",
    description: "Tools and technologies for server-side development.",
  },
  {
    name: "Database & Tools",
    description: "Tools I use for data, development, and engineering workflows.",
  },
];

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("/api/skills");

        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            My Skills
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Technologies & Tools
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
            The technologies I use while developing software,
            solving programming problems, and building a strong
            foundation for cybersecurity.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-400">
            Loading skills...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {/* Skills */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2">

            {categoryConfig.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category.name
              );

              if (categorySkills.length === 0) {
                return null;
              }

              return (
                <div
                  key={category.name}
                  className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 sm:p-7"
                >

                  {/* Category Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {category.description}
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Bottom Statement */}
        {!loading && !error && (
          <div className="mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-6 text-center">
            <p className="text-sm leading-6 text-gray-400">
              Currently strengthening my programming and development
              skills while building toward a career in cybersecurity.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

