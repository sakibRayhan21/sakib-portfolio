import Link from "next/link";
import { Profile } from "@/lib/portfolio-store";
import { ExternalLinkIcon, CodeIcon, ShieldIcon } from "../Icons";

export default function Hero({ profile }: { profile?: Profile }) {
  const name = profile?.name || "Sakib Rayhan";
  const title = profile?.title || "Full-Stack Developer";
  const bio = profile?.bio || "I build modern web applications, solve programming problems, and explore the world of software engineering, AI, and full-stack development.";
  const resumeUrl = profile?.resumeUrl;
  const profileImage = profile?.profileImage || "/avatar.svg";

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Call to Action */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6 text-xs font-semibold text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for new opportunities
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-white">
              {name}
            </h1>

            <h2 className="mt-4 text-xl font-semibold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent sm:text-2xl md:text-3xl">
              {title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg mx-auto lg:mx-0">
              {bio}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3.5 text-center font-medium text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 hover:shadow-blue-500/40"
              >
                Explore Projects
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto rounded-xl border border-gray-800 bg-gray-950/80 px-6 py-3.5 text-center font-medium text-gray-300 transition hover:border-gray-700 hover:text-white"
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

          {/* Right Column: Square-shaped Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Vibrant Ambient Glow behind Square Photo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600/40 via-indigo-600/30 to-purple-600/30 opacity-70 blur-xl group-hover:opacity-100 transition duration-500" />

              {/* Square Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] aspect-square rounded-2xl border-2 border-gray-800 bg-gray-950 p-2 shadow-2xl transition duration-500 group-hover:border-blue-500/60">
                {/* Image Container */}
                <div className="relative w-full h-full aspect-square rounded-xl overflow-hidden bg-gray-900">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full aspect-square object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle inner gradient shadow at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                  {/* Corner Tech Pill Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs backdrop-blur-md bg-black/60 border border-gray-800/80 rounded-lg px-3 py-1.5 text-gray-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Online / Coding
                    </span>
                    <span className="font-mono text-[11px] text-blue-400">
                      CSE
                    </span>
                  </div>
                </div>

                {/* Decorative Square Corner Accents */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-sm pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-sm pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-sm pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-sm pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
