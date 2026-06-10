import { motion, useScroll } from "framer-motion";
import * as React from "react";

import { ChapterHeading } from "@/components/sections/chapter-heading";
import { fadeUp, useIsMobile } from "@/lib/motion";

const SOLUTION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";

const moments = [
  {
    version: "v1.0",
    title: "Bumble Match Created",
    description:
      "[Soft Launch] The swipe that started it all. v1.5 — Daily Calls Activated soon after.",
  },
  {
    version: "v2.0",
    title: "Travel Mode Unlocked",
    description:
      "[Memory Saved] Trips, hostels, curfew drama. v2.5 — Scooter Trust System Enabled.",
  },
  {
    version: "v3.0",
    title: "Communication Issues Detected",
    description:
      "[Archived] Missed cues, quieter days. Not dramatic — just honest patch notes.",
  },
  {
    version: "v3.5",
    title: "Birthday Update Failed",
    description:
      "[Rare Screenshot] August 4th. No excuses. v4.0 — Archive Mode Enabled. core memory unlocked.",
  },
] as const;

export function SolutionSection() {
  const isMobile = useIsMobile();
  const railRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.6"],
  });

  return (
    <section
      id="moments"
      className="scroll-mt-24 border-t border-border/30 py-32 md:py-44"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <ChapterHeading
          align="left"
          eyebrow="chapter three"
          title={
            <>
              Funny{" "}
              <span className="font-serif italic font-normal text-blush">
                Moments
              </span>
            </>
          }
          lede="Patch notes from a story still worth re-reading."
        />

        <motion.div {...fadeUp(0.15, isMobile)} className="mt-16">
          <div className="photo-frame rotate-[0.5deg]">
            <video
              className="aspect-[3/1] w-full object-cover"
              src={SOLUTION_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </motion.div>

        <div ref={railRef} className="relative mt-24 md:mt-32">
          {/* Timeline rail */}
          <div className="absolute inset-y-0 left-[7px] w-px bg-border/30 md:left-1/2" />
          <motion.div
            className="absolute left-[7px] top-0 w-px origin-top bg-gradient-to-b from-blush via-foreground/60 to-blush md:left-1/2"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />

          <div className="space-y-20 md:space-y-28">
            {moments.map((m, idx) => {
              const left = idx % 2 === 0;
              return (
                <motion.div
                  key={m.version}
                  {...fadeUp(0.1, isMobile)}
                  className="relative grid items-center gap-6 pl-10 md:grid-cols-2 md:gap-0 md:pl-0"
                >
                  {/* Node on the rail */}
                  <span className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <span className="absolute h-full w-full rounded-full bg-blush/20" />
                    <span className="h-[7px] w-[7px] rounded-full bg-blush" />
                  </span>

                  <div
                    className={
                      left
                        ? "md:col-start-1 md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    }
                  >
                    <span className="font-script text-2xl text-blush/90">
                      {m.version}
                    </span>
                    <h3 className="mt-1 font-display text-3xl font-medium tracking-tight md:text-4xl">
                      {m.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-sm leading-relaxed text-muted-foreground ${left ? "md:ml-auto" : ""}`}
                    >
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
