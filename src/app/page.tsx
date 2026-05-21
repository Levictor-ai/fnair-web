import Hero from "@/components/Hero";
import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Activities from "@/components/Activities";
import MissionVision from "@/components/MissionVision";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-black font-sans selection:bg-blue-primary/20">
      <Hero />
      <About />
      <MissionVision />
      <CoreValues />
      <Activities />
      <Contact />
    </main>
  );
}
