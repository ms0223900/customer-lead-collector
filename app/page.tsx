import { AudienceSection } from "@/components/landing/AudienceSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { PromiseSection } from "@/components/landing/PromiseSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <HeroSection />
        <PainPointsSection />
        <PromiseSection />
        <AudienceSection />
        <ModulesSection />
        <WaitlistSection />
      </main>
      <footer className="border-t border-border bg-card py-8 text-center text-sm text-on-background-muted">
        © {new Date().getFullYear()} AI 課程 · Lead Collector
      </footer>
    </div>
  );
}
