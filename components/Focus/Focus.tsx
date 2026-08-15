
export default function Focus() {
  return (
    <section id="focus" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            What I Focus On
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Building Toward Cybersecurity
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
            I am currently strengthening my foundations through competitive
            programming and software development while gradually specializing
            in cybersecurity.
          </p>
        </div>

        {/* Focus Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Cybersecurity */}
          <div className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              🔐
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Cybersecurity
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              My long-term specialization, with a focus on understanding
              secure systems, vulnerabilities, networks, and defensive
              security practices.
            </p>
          </div>

          {/* Competitive Programming */}
          <div className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              ⚡
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Competitive Programming
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Regularly practicing algorithms, data structures, problem
              solving, and contest programming to strengthen my logical
              thinking.
            </p>
          </div>

          {/* Development */}
          <div className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              💻
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Software Development
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Building practical applications and improving my full-stack
              development skills while keeping security in mind.
            </p>
          </div>

          {/* Security-Oriented Development */}
          <div className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              🛡️
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Secure Development
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Exploring how security principles can be considered during
              application design, development, testing, and deployment.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
