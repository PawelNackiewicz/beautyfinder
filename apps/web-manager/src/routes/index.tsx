import { createFileRoute } from "@tanstack/react-router";
import {
  Header,
  HeroSection,
  SocialProofBar,
  FeaturesSection,
  BenefitsTimeline,
  TestimonialsSection,
  PricingSection,
  FAQSection,
  FinalCTA,
  Footer,
} from "@/features/landing";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SocialProofBar />
        <FeaturesSection />
        <BenefitsTimeline />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
