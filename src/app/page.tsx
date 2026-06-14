import About from "@/components/sections/About";
import ContactCTA from "@/components/sections/ContactCTA";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <ContactCTA />
    </>
  );
}
