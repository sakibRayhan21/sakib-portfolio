
"use client";

import { useEffect, useState } from "react";

type Profile = {
  email: string;
};

type SocialLink = {
  id: number;
  platform: string;
  url: string;
};

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const [profileResponse, socialResponse] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/social-links"),
        ]);

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData);
        }

        if (socialResponse.ok) {
          const socialData = await socialResponse.json();
          setSocialLinks(socialData);
        }
      } catch (error) {
        console.error("Failed to load contact information:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactData();
  }, []);

  const github = socialLinks.find(
    (link) => link.platform.toLowerCase() === "github"
  );

  const linkedin = socialLinks.find(
    (link) => link.platform.toLowerCase() === "linkedin"
  );

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            Get In Touch
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's Work Together
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Have a project idea, collaboration opportunity, or just want
            to connect? Feel free to reach out.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">

          {/* Email */}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                @
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Email
              </h3>

              <p className="mt-2 break-all text-sm text-gray-500 transition-colors group-hover:text-gray-400">
                {profile.email}
              </p>
            </a>
          )}

          {/* LinkedIn */}
          {linkedin && (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-lg font-bold text-blue-400">
                in
              </div>

              <h3 className="mt-4 font-semibold text-white">
                LinkedIn
              </h3>

              <p className="mt-2 text-sm text-gray-500 transition-colors group-hover:text-gray-400">
                Connect with me
              </p>
            </a>
          )}

          {/* GitHub */}
          {github && (
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-lg font-bold text-blue-400">
                GH
              </div>

              <h3 className="mt-4 font-semibold text-white">
                GitHub
              </h3>

              <p className="mt-2 text-sm text-gray-500 transition-colors group-hover:text-gray-400">
                See my code
              </p>
            </a>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <p className="mt-8 text-center text-sm text-gray-500">
            Loading contact information...
          </p>
        )}

      </div>
    </section>
  );
}
