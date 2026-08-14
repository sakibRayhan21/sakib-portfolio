export default function Education() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            Education
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Academic Journey
          </h2>
        </div>

        <div className="relative border-l border-gray-800 pl-8">

          <div className="relative pb-12">
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-black bg-blue-500" />

            <p className="text-sm font-medium text-blue-400">
              Current
            </p>

            <h3 className="mt-2 text-2xl font-semibold">
              Bachelor of Science in Computer Science & Engineering
            </h3>

            <p className="mt-2 text-gray-300">
              Khwaja Yunus Ali University
            </p>

            <p className="mt-4 max-w-3xl leading-7 text-gray-400">
              Studying computer science with a focus on programming,
              algorithms, software engineering, artificial intelligence,
              and modern computing technologies.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
