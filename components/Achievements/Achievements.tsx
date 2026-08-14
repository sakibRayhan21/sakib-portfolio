export default function Achievements() {
  return (
    <section id="achievements" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
            Achievements
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Highlights
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
            <div className="text-3xl">??</div>

            <h3 className="mt-5 text-xl font-semibold">
              Competitive Programming
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Active participation in competitive programming and
              algorithmic problem solving.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
            <div className="text-3xl">??</div>

            <h3 className="mt-5 text-xl font-semibold">
              Software Projects
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Building practical software projects to solve real-world
              problems.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
            <div className="text-3xl">??</div>

            <h3 className="mt-5 text-xl font-semibold">
              Research Interest
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Exploring artificial intelligence, machine learning,
              and explainable AI research.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
