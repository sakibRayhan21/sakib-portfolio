import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            Hello, I'm
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Sakib Rayhan
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-300 sm:text-3xl">
            Full-Stack Developer
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            I build modern web applications, solve programming problems,
            and explore the world of software engineering, AI, and
            full-stack development.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              View My Projects
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-200 transition hover:border-gray-500 hover:text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
              About Me
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Who I Am
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-lg leading-8 text-gray-400">
                I am a Computer Science and Engineering student with a
                strong interest in software development, competitive
                programming, artificial intelligence, and modern web
                technologies.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                I enjoy turning ideas into practical software and
                continuously improving my problem-solving and engineering
                skills through projects and programming challenges.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
              <h3 className="text-xl font-semibold">
                What I Do
              </h3>

              <ul className="mt-6 space-y-4 text-gray-400">
                <li>? Full-Stack Web Development</li>
                <li>? Competitive Programming</li>
                <li>? AI & Machine Learning Exploration</li>
                <li>? Software Project Development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
              My Skills
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Technologies I Work With
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Programming */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500">
              <h3 className="text-xl font-semibold">
                Programming
              </h3>

              <div className="mt-5 space-y-3 text-gray-400">
                <p>C++</p>
                <p>JavaScript</p>
                <p>TypeScript</p>
                <p>Python</p>
              </div>
            </div>

            {/* Frontend */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500">
              <h3 className="text-xl font-semibold">
                Frontend
              </h3>

              <div className="mt-5 space-y-3 text-gray-400">
                <p>React</p>
                <p>Next.js</p>
                <p>Tailwind CSS</p>
                <p>HTML & CSS</p>
              </div>
            </div>

            {/* Backend */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500">
              <h3 className="text-xl font-semibold">
                Backend
              </h3>

              <div className="mt-5 space-y-3 text-gray-400">
                <p>Node.js</p>
                <p>REST APIs</p>
                <p>Authentication</p>
                <p>Server-side Development</p>
              </div>
            </div>

            {/* Database & Tools */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500">
              <h3 className="text-xl font-semibold">
                Database & Tools
              </h3>

              <div className="mt-5 space-y-3 text-gray-400">
                <p>PostgreSQL</p>
                <p>Prisma</p>
                <p>Git & GitHub</p>
                <p>VS Code</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
