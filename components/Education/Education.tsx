
export default function Education() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            Education
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Academic Journey
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-800 pl-8 sm:pl-10">

          {/* University */}
          <div className="relative pb-4">

            {/* Timeline Dot */}
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-black bg-blue-500 sm:-left-[49px]" />

            {/* Status */}
            <p className="text-sm font-medium text-blue-400">
              Current
            </p>

            {/* Degree */}
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              B.Sc in Computer Science & Engineering
            </h3>

            {/* University */}
            <p className="mt-3 text-lg font-medium text-gray-300">
              Khwaja Yunus Ali University
            </p>

            {/* Description */}
            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
              Studying computer science with a strong focus on programming,
              algorithms, software engineering, competitive programming, and
              cybersecurity-oriented development.
            </p>

            {/* Areas */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1.5 text-sm text-gray-400">
                Computer Science
              </span>

              <span className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1.5 text-sm text-gray-400">
                Algorithms
              </span>

              <span className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1.5 text-sm text-gray-400">
                Software Engineering
              </span>

              <span className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1.5 text-sm text-gray-400">
                Competitive Programming
              </span>

              <span className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1.5 text-sm text-gray-400">
                Cybersecurity
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
