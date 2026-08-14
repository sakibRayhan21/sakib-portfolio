export default function Hero() {
  return (
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
  );
}
