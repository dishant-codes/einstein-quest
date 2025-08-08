import { useEffect } from "react";
import HeroSlider from "@/components/home/hero-slider";
import AboutSection from "@/components/home/about-section";
import ExamPreview from "@/components/home/exam-preview";
import AwardsSection from "@/components/home/awards-section";
import QuoteSection from "@/components/home/quote-section";

export default function Home() {
  useEffect(() => {
    document.title = "KBE - Kaun Banega Einstein | Young Scientist Competition";
  }, []);

  return (
    <div data-testid="page-home">
      <HeroSlider />
      <AboutSection />
      <ExamPreview />
      <AwardsSection />
      <QuoteSection />
    </div>
  );
}
