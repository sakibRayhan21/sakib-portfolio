export default function About() {
  return (
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
  );
}
