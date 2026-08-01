import { Hero } from "@/components/portfolio/hero/hero";
import { About } from "@/components/portfolio/about/about";
import { Skills } from "@/components/portfolio/skills/skills";
import { Experience } from "@/components/portfolio/experience/experience";
import { Projects } from "@/components/portfolio/projects/projects";
import { Education } from "@/components/portfolio/education/education";
import { Certifications } from "@/components/portfolio/certifications/certifications";
import { Contact } from "@/components/portfolio/contact/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}

