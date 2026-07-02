import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import StatsSection from "@/components/StatsSection";
import VisionMission from "@/components/VisionMission";
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
      {/* <VisionMission  /> */}
      <HomeProjectsSection />
      <Team/>
      <ReviewsSection />
    </div>
  );
}
