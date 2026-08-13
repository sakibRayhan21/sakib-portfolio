export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <nav>
        <h1>Sakib Rayhan</h1>

        <div>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section>
        <p>Hello, I'm</p>

        <h2>Sakib Rayhan</h2>

        <h3>Computer Science & Engineering Student</h3>

        <p>
          I build software, solve programming problems, and explore
          full-stack development and AI.
        </p>

        <div>
          <a href="#projects">View My Projects</a>
          <a href="#contact">Contact Me</a>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <h2>About Me</h2>

        <p>
          I am a Computer Science & Engineering student interested in
          software development, competitive programming, AI, and
          full-stack application development.
        </p>
      </section>

      {/* Skills */}
      <section id="skills">
        <h2>Skills</h2>

        <div>
          <h3>Programming</h3>
          <p>C++ • JavaScript • TypeScript • Python</p>
        </div>

        <div>
          <h3>Frontend</h3>
          <p>React • Next.js • Tailwind CSS</p>
        </div>

        <div>
          <h3>Backend</h3>
          <p>Node.js • REST API</p>
        </div>

        <div>
          <h3>Database</h3>
          <p>PostgreSQL • Prisma</p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <h2>Projects</h2>

        <div>
          <h3>My Projects</h3>

          <p>
            Projects will be dynamically loaded from the database later.
          </p>
        </div>
      </section>

      {/* Education */}
      <section id="education">
        <h2>Education</h2>

        <div>
          <h3>B.Sc. in Computer Science & Engineering</h3>
          <p>Khwaja Yunus Ali University</p>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements">
        <h2>Achievements</h2>

        <p>
          Competitive programming, programming contests, projects,
          research, and other achievements will be added here.
        </p>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2>Contact Me</h2>

        <p>
          Have a project or opportunity? Feel free to get in touch.
        </p>

        <form>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
          />

          <input
            type="email"
            placeholder="Your Email"
            name="email"
          />

          <textarea
            placeholder="Your Message"
            name="message"
          />

          <button type="submit">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Sakib Rayhan. All rights reserved.</p>
      </footer>
    </main>
  );
}