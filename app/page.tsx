import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import StatsSection from "@/components/StatsSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* <AboutSection /> */}
      <ServicesSection />
      <StatsSection />
      <HowWeWorkSection />
      <ProjectsSection />
      <ReviewsSection />
    </div>
  );
}
