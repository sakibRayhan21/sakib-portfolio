import Link from "next/link";
import { Profile } from "@/lib/portfolio-store";
import { ShieldIcon, ExternalLinkIcon } from "../Icons";

export default function Hero({ profile }: { profile?: Profile }) {
  const name = profile?.name || "Sakib Rayhan";
  const title = profile?.title || "Full-Stack Developer";
  const bio = profile?.bio || "I build modern web applications, solve programming problems, and explore the world of software engineering, AI, and full-stack development.";
  const resumeUrl = profile?.resumeUrl;

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6 text-xs font-semibold text-blue-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Available for new opportunities
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-white">
          {name}
        </h1>

        <h2 className="mt-4 text-2xl font-semibold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent sm:text-3xl">
          {title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
          {bio}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 hover:shadow-blue-500/40"
          >
            Explore Projects
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto rounded-xl border border-gray-800 bg-gray-950/80 px-6 py-3.5 font-medium text-gray-300 transition hover:border-gray-700 hover:text-white"
          >
            Get In Touch
          </a>

          {resumeUrl && resumeUrl !== "#" && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3.5 font-medium text-blue-400 transition hover:bg-blue-500/20"
            >
              Resume <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
