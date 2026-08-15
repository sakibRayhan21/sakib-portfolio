"use client";

import { useEffect, useState } from "react";

type Profile = {
  name: string;
  title: string;
  bio: string;
  email: string;
  profileImage: string | null;
  resumeUrl: string | null;
};

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <p className="text-gray-400">Loading...</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <p className="text-red-400">Failed to load profile.</p>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="flex min-h-screen items-center px-6 py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[280px_1fr] lg:grid-cols-[360px_1fr] lg:gap-20">

        {/* Profile Image */}
        <div className="flex justify-center md:justify-start">
          {profile.profileImage ? (
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-blue-500/10 blur-xl" />

              <img
                src={profile.profileImage}
                alt={profile.name}
                className="relative aspect-square w-56 rounded-3xl border border-gray-800 object-cover shadow-2xl sm:w-64 md:w-64 lg:w-80"
              />
            </div>
          ) : (
            <div className="flex aspect-square w-56 items-center justify-center rounded-3xl border border-gray-800 bg-gray-950 text-gray-600 sm:w-64 md:w-64 lg:w-80">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="text-center md:text-left">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            Hello, I'm
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <h2 className="mt-4 max-w-3xl text-xl font-semibold leading-relaxed text-gray-300 sm:text-2xl lg:text-3xl">
            {profile.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg md:mx-0">
            {profile.bio}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:justify-start">

            <a
              href="#projects"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-500 sm:w-auto"
            >
              View My Projects
            </a>

            <a
              href="#contact"
              className="w-full rounded-lg border border-gray-700 px-6 py-3 text-center font-medium text-gray-200 transition hover:border-gray-500 hover:text-white sm:w-auto"
            >
              Contact Me
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}