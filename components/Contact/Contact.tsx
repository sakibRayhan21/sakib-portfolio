export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">
          Get In Touch
        </p>

        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
          Let's Work Together
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Have a project idea, collaboration opportunity, or just want
          to connect? Feel free to reach out.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">

          <a
            href="mailto:your-email@example.com"
            className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500"
          >
            <div className="text-3xl">??</div>

            <h3 className="mt-4 font-semibold">
              Email
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Send me an email
            </p>
          </a>

          <a
            href="#"
            className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500"
          >
            <div className="text-3xl">??</div>

            <h3 className="mt-4 font-semibold">
              LinkedIn
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Connect with me
            </p>
          </a>

          <a
            href="#"
            className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-500"
          >
            <div className="text-3xl">??</div>

            <h3 className="mt-4 font-semibold">
              GitHub
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              See my code
            </p>
          </a>

        </div>
      </div>
    </section>
  );
}
