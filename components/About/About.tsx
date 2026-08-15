
"use client";

import { useEffect, useState } from "react";

type Profile = {
  bio: string;
};

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            About Me
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Who I Am
          </h2>
        </div>

        {/* Content */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start">

          {/* About Text */}
          <div>
            <p className="text-lg leading-8 text-gray-400">
              I am a Computer Science and Engineering student with a
              strong interest in cybersecurity, software development,
              and competitive programming.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              Currently, I am strengthening my programming and
              problem-solving skills through competitive programming
              while building practical software projects. My long-term
              goal is to specialize in cybersecurity and develop secure,
              reliable, and well-engineered software.
            </p>
          </div>

          {/* What I Do */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5 sm:p-8">

            <h3 className="text-xl font-semibold text-white">
              What I Focus On
            </h3>

            <div className="mt-6 space-y-4">

              {/* Development */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
                  &lt;/&gt;
                </span>

                <span className="text-gray-400">
                  Full-Stack Development
                </span>
              </div>

              {/* Competitive Programming */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
                  &gt;_
                </span>

                <span className="text-gray-400">
                  Competitive Programming
                </span>
              </div>

              {/* Cybersecurity */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
                  ◈
                </span>

                <span className="text-gray-400">
                  Cybersecurity Exploration
                </span>
              </div>

              {/* Software Engineering */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
                  ⚙
                </span>

                <span className="text-gray-400">
                  Software Engineering
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

