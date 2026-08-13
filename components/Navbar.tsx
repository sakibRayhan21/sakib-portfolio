import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-2xl font-bold text-white">
          Sakib<span className="text-blue-500">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#about"
            className="text-sm text-gray-300 hover:text-white"
          >
            About
          </Link>

          <Link
            href="#skills"
            className="text-sm text-gray-300 hover:text-white"
          >
            Skills
          </Link>

          <Link
            href="#projects"
            className="text-sm text-gray-300 hover:text-white"
          >
            Projects
          </Link>

          <Link
            href="#education"
            className="text-sm text-gray-300 hover:text-white"
          >
            Education
          </Link>

          <Link
            href="#contact"
            className="text-sm text-gray-300 hover:text-white"
          >
            Contact
          </Link>
        </div>

      </div>
    </nav>
  );
}
