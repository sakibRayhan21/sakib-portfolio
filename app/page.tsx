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

      {/* Projects Section */}
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
              My Work
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Featured Projects
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              A selection of projects that demonstrate my experience
              with software development, AI, and full-stack technologies.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* Project 1 */}
            <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

              <div className="flex h-48 items-center justify-center bg-gray-900">
                <span className="text-5xl">??</span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  Offline University Messenger
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  A communication platform designed to help university
                  students communicate when internet connectivity is
                  limited or unavailable.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Next.js
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Node.js
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    PostgreSQL
                  </span>
                </div>

                <div className="mt-6 flex gap-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-blue-400"
                  >
                    GitHub ?
                  </a>

                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-blue-400"
                  >
                    Live Demo ?
                  </a>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

              <div className="flex h-48 items-center justify-center bg-gray-900">
                <span className="text-5xl">??</span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  AI Medical Explainability
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  An AI research project focused on making medical
                  machine learning predictions more understandable
                  through explainable AI techniques.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Python
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Machine Learning
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    XAI
                  </span>
                </div>

                <div className="mt-6 flex gap-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-blue-400"
                  >
                    GitHub ?
                  </a>

                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-blue-400"
                  >
                    Research ?
                  </a>
                </div>
              </div>
            </article>

            {/* Project 3 */}
            <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

              <div className="flex h-48 items-center justify-center bg-gray-900">
                <span className="text-5xl">?</span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  Competitive Programming
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  A collection of algorithmic problem-solving solutions
                  covering data structures, algorithms, mathematics,
                  graphs, and optimization.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    C++
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Algorithms
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Data Structures
                  </span>
                </div>

                <div className="mt-6 flex gap-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-blue-400"
                  >
                    GitHub ?
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </main>
  );
}
