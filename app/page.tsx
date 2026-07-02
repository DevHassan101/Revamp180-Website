import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import StatsSection from "@/components/StatsSection";
import VisionMissionResponsive from "@/components/VisionMissionResponsive";
import HomeProjectsSection from "@/components/HomeProjectsSection";
import ReviewsSection from "@/components/ReviewsSection";
import Team from "@/components/Team";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <HowWeWorkSection />
      {/* Mounts only one variant: mobile (< 768px) or desktop — never both */}
      <VisionMissionResponsive />
      <HomeProjectsSection />
      <Team/>
      <ReviewsSection />
    </div>
  );
}
