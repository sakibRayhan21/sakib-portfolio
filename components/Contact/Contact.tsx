import { Profile } from "@/lib/portfolio-store";
import { MailIcon, LinkedinIcon, GithubIcon } from "../Icons";

export default function Contact({ profile }: { profile?: Profile }) {
  const email = profile?.email || "sakib.rayhan.dev@example.com";
  const githubUrl = profile?.githubUrl || "https://github.com/sakibRayhan21";
  const linkedinUrl = profile?.linkedinUrl || "https://linkedin.com/in/sakibrayhan";

  return (
    <section id="contact" className="px-6 py-24 border-t border-gray-900 bg-black/40">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
          Get In Touch
        </p>

        <h2 className="mt-3 text-4xl font-bold sm:text-5xl text-white">
          Let's Work Together
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-8 text-gray-400">
          Have a project idea, software challenge, collaboration opportunity, or just want to connect? Reach out anytime.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="group rounded-2xl border border-gray-800/80 bg-gray-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
              <MailIcon className="w-6 h-6" />
            </div>

            <h3 className="mt-5 font-bold text-white text-lg">
              Email
            </h3>

            <p className="mt-2 text-xs text-gray-400 truncate px-2" title={email}>
              {email}
            </p>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-800/80 bg-gray-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
              <LinkedinIcon className="w-6 h-6" />
            </div>

            <h3 className="mt-5 font-bold text-white text-lg">
              LinkedIn
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Connect professionally
            </p>
          </a>

          {/* GitHub */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-800/80 bg-gray-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
              <GithubIcon className="w-6 h-6" />
            </div>

            <h3 className="mt-5 font-bold text-white text-lg">
              GitHub
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Explore repositories
            </p>
          </a>
        </div>

        <div className="mt-16 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} {profile?.name || "Sakib Rayhan"}. Built with Next.js, Tailwind CSS & Prisma.
        </div>
      </div>
    </section>
  );
}
