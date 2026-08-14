export default function Skills() {
  return (
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
  );
}
