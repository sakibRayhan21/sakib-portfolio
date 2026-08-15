
import Link from "next/link";


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-white"
            >
              Sakib<span className="text-blue-500">.</span>
            </Link>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Competitive Programmer, Cybersecurity Enthusiast,
              and Full-Stack Developer.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              href="#about"
              className="text-gray-400 transition hover:text-blue-400"
            >
              About
            </Link>

            <Link
              href="#skills"
              className="text-gray-400 transition hover:text-blue-400"
            >
              Skills
            </Link>

            <Link
              href="#projects"
              className="text-gray-400 transition hover:text-blue-400"
            >
              Projects
            </Link>

            <Link
              href="#education"
              className="text-gray-400 transition hover:text-blue-400"
            >
              Education
            </Link>

            <Link
              href="#focus"
              className="text-gray-400 transition hover:text-blue-400"
            >
              Focus
            </Link>

            <Link
              href="#contact"
              className="text-gray-400 transition hover:text-blue-400"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-gray-800 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} MD. Sakib Rayhan. All rights reserved.
          </p>

          <p>
            Built with Next.js & TypeScript
          </p>
        </div>

      </div>
    </footer>
  );
}

