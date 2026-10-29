export default function Achievements() {
  const items = [
    {
      icon: "🏆",
      title: "Competitive Programming",
      desc: "Active participation in competitive programming contests and algorithmic problem solving across codeforces, leetcode, and university hackathons.",
    },
    {
      icon: "🚀",
      title: "Software Projects",
      desc: "Building practical web software and tools to solve campus communication bottlenecks and real-world developer problems.",
    },
    {
      icon: "🔬",
      title: "Research Interest",
      desc: "Exploring explainable artificial intelligence (XAI), biomedical machine learning applications, and intelligent systems.",
    },
  ];

  return (
    <section id="achievements" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Achievements
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl text-white">
            Highlights & Focus
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-800/80 bg-gray-950/70 p-7 transition duration-300 hover:border-blue-500/50 hover:-translate-y-1"
            >
              <div className="text-4xl">{item.icon}</div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
