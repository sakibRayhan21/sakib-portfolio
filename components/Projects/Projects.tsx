export default function Projects() {
  return (
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
  );
}
