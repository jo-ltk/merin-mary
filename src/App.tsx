import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { Navbar } from "@/components/sections/navbar";
import { SearchChangedSection } from "@/components/sections/search-changed-section";
import { SolutionSection } from "@/components/sections/solution-section";

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <SearchChangedSection />
        <MissionSection />
        <SolutionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

