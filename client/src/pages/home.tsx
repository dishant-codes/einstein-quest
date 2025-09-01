import { useEffect } from "react";
import HeroSlider from "@/components/home/hero-slider";
import AboutSection from "@/components/home/about-section";
import EligibilitySection from "@/components/home/eligibility-section";
import ExamStagesSection from "@/components/home/exam-stages-section";
import ExamPreview from "@/components/home/exam-preview";
import AwardsSection from "@/components/home/awards-section";
import QuoteSection from "@/components/home/quote-section";

export default function Home() {
  useEffect(() => {
    document.title = "KBE - Kaun Banega Einstein | International Young Scientist Competition";
  }, []);

  return (
    <div data-testid="page-home">
      <HeroSlider />
      <AboutSection />
      <EligibilitySection />
      <ExamStagesSection />
      {/* <ExamPreview /> */}
      <AwardsSection />
      <QuoteSection />
    </div>
  );
}
