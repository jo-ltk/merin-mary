
import { motion, useScroll } from "framer-motion";
import * as React from "react";

import { ChapterHeading } from "@/components/sections/chapter-heading";
import { fadeUp, useIsMobile } from "@/lib/motion";

const SOLUTION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";

const moments = [
  {
    title: "Bumble Match",
    description:
      "Oru random swipe. Pinne chats, calls, and somehow talking every day became normal.",
  },
  {
    title: "Trips Together",
    description:
      "Puthiya places, hostel stays, food stops, scooter rides, and nammal full comedy ayirunnu.",
  },
  {
    title: "A Few Misunderstandings",
    description:
      "Kurach misunderstandings undayi, kurach silent days undayi. Athokke storyyude part alle.",
  },
  {
    title: "Birthday Memory",
    description:
      "August 4. Cheriya oru date mathram alla, marakkan pattatha oru memory.",
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
          eyebrow="our story"
          title={
            <>
              Funny{" "}
              <span className="font-serif italic font-normal text-blush">
                Moments
              </span>
            </>
          }
          lede="Chila memories time kazhinjalum marakkilla."
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
                  key={m.title}
                  {...fadeUp(0.1, isMobile)}
                  className="relative grid items-center gap-6 pl-10 md:grid-cols-2 md:gap-0 md:pl-0"
                >
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
                    <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                      {m.title}
                    </h3>

                    <p
                      className={`mt-3 max-w-md text-sm leading-relaxed text-muted-foreground ${
                        left ? "md:ml-auto" : ""
                      }`}
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
