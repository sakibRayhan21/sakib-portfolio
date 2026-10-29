import Navbar from "../components/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Education from "../components/Education/Education";
import Achievements from "../components/Achievements/Achievements";
import Contact from "../components/Contact/Contact";
import { getPortfolioData } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  const firstName = data.profile?.name ? data.profile.name.split(" ")[0] : "Sakib";

  return (
    <main className="bg-black text-white min-h-screen selection:bg-blue-600 selection:text-white">
      <Navbar brandName={firstName} />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Skills initialSkills={data.skills} />
      <Projects initialProjects={data.projects} />
      <Education />
      <Achievements />
      <Contact profile={data.profile} />
    </main>
  );
}