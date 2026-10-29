import { Profile } from "@/lib/portfolio-store";
import { CheckIcon } from "../Icons";

export default function About({ profile }: { profile?: Profile }) {
  const p1 = profile?.aboutP1 || "I am a Computer Science and Engineering student with a strong interest in software development, competitive programming, artificial intelligence, and modern web technologies.";
  const p2 = profile?.aboutP2 || "I enjoy turning ideas into practical software and continuously improving my problem-solving and engineering skills through projects and programming challenges.";
  const whatIDo = profile?.whatIDo && profile.whatIDo.length > 0 ? profile.whatIDo : [
    "Full-Stack Web Development",
    "Competitive Programming & Problem Solving",
    "AI & Machine Learning Exploration",
    "Scalable API & Database Engineering",
  ];

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            About Me
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl text-white">
            Who I Am
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-6">
            <p className="text-lg leading-8 text-gray-400">
              {p1}
            </p>
            <p className="text-lg leading-8 text-gray-400">
              {p2}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800/80 bg-gray-950/70 p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-blue-500" />
              What I Focus On
            </h3>

            <ul className="space-y-4">
              {whatIDo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <CheckIcon className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
