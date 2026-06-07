import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import StatsSection from "@/components/StatsSection";
import VisionMission from "@/components/VisionMission";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <HowWeWorkSection />
      <VisionMission  />
      <ProjectsSection />
      <ReviewsSection />
    </div>
  );
}
