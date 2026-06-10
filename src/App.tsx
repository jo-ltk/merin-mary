import { MotionConfig } from "framer-motion";
import * as React from "react";

import { GlobalHeartRain } from "@/components/effects/heart-rain";
import { JourneyLine } from "@/components/journey/journey-line";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { Navbar } from "@/components/sections/navbar";
import { SearchChangedSection } from "@/components/sections/search-changed-section";
import { SolutionSection } from "@/components/sections/solution-section";

export default function App() {
  const journeyRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-dvh bg-background text-foreground">
      <div className="grain-overlay" aria-hidden />
      <GlobalHeartRain />
      <Navbar />
      <main>
        <HeroSection />
        <div ref={journeyRef} className="relative">
          <JourneyLine containerRef={journeyRef} />
          <div className="relative">
            <SearchChangedSection />
            <MissionSection />
            <SolutionSection />
          </div>
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  );
}
