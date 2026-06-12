import { Navbar } from "../components/LandingPage/Navbar";
import { HeroSection } from "../components/LandingPage/HeroSection";
import { WorkflowSection } from "../components/LandingPage/WorkflowSection";
import { PlatformSection } from "../components/LandingPage/PlatformSection";
import { FAQSection } from "../components/LandingPage/FAQSection";
import { CTASection } from "../components/LandingPage/CTASection";
import { Footer } from "../components/LandingPage/Footer";

export default function Home() {
  return (
    <div className="landing-page min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Navbar />

      <HeroSection />

      <WorkflowSection />

      <PlatformSection />

      <FAQSection />

      <CTASection />

      <Footer />
    </div>
  );
}
