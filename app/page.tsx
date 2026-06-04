import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
// import VisionMissionSection from "@/components/VisionMissionSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      {/* <VisionMissionSection /> */}
      <ServicesSection />
      <HowWeWorkSection />
      <ProjectsSection />
    </div>
  );
}
