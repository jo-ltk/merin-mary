import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import * as React from "react";

import { fadeUp, useIsMobile, wordRevealOpacity } from "@/lib/motion";

const MISSION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";

function ScrollRevealWords({
  text,
  className,
  highlightWords = [],
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
}) {
  const isMobile = useIsMobile();
  const ref = React.useRef<HTMLParagraphElement | null>(null);
  const wordEls = React.useRef<(HTMLSpanElement | null)[]>([]);
  const words = React.useMemo(() => text.split(" "), [text]);
  const highlightSet = React.useMemo(
    () => new Set(highlightWords.map((w) => w.toLowerCase())),
    [highlightWords],
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile ? ["start 0.92", "end 0.45"] : ["start 0.9", "end 0.2"],
  });

  const applyWordOpacities = React.useCallback(
    (progress: number) => {
      const total = words.length;
      for (let i = 0; i < total; i++) {
        const el = wordEls.current[i];
        if (el) {
          el.style.opacity = String(wordRevealOpacity(progress, i, total));
        }
      }
    },
    [words.length],
  );

  useMotionValueEvent(scrollYProgress, "change", applyWordOpacities);

  React.useLayoutEffect(() => {
    applyWordOpacities(scrollYProgress.get());
  }, [applyWordOpacities, scrollYProgress]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[—,.;:!?"]/g, "").toLowerCase();
        const isHighlight = highlightSet.has(clean);
        return (
          <span
            key={`${word}-${i}`}
            ref={(el) => {
              wordEls.current[i] = el;
            }}
            style={{ opacity: 0.12 }}
            className={
              isHighlight
                ? "italic text-blush"
                : "text-[hsl(var(--hero-subtitle))]"
            }
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export function MissionSection() {
  const isMobile = useIsMobile();
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, (v) =>
    isMobile ? 0 : 50 - v * 100,
  );

  return (
    <section
      id="adventures"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32 pb-32 md:px-12 md:pt-44 md:pb-44"
    >
      <div className="text-center">
        <motion.span
          {...fadeUp(0, isMobile)}
          className="font-script text-2xl text-blush md:text-3xl"
        >
          chapter two
        </motion.span>
        <motion.h2
          {...fadeUp(0.1, isMobile)}
          className="mt-3 font-display text-5xl font-medium tracking-tight md:text-7xl"
        >
          The{" "}
          <span className="font-serif italic font-normal text-blush">
            Adventures
          </span>
        </motion.h2>
      </div>

      <motion.div
        ref={frameRef}
        {...fadeUp(0.15, isMobile)}
        className="mt-20 grid place-items-center"
      >
        <motion.div
          style={{ y: videoY }}
          className="photo-frame w-full max-w-[800px] -rotate-1"
        >
          <video
            className="aspect-square w-full object-cover"
            src={MISSION_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload={isMobile ? "metadata" : "auto"}
          />
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-24 max-w-4xl md:mt-32">
        <ScrollRevealWords
          text={`Travel Stories unlocked — new places, funny trip moments, noodles and a quick balance check afterwards, scooter trust unlocked, and nammal full comedy ayirunnu. Street Food Explorer mode. Professional Overthinker, still down for chaos. Some memories age well.`}
          highlightWords={["unlocked", "comedy", "memories"]}
          className="font-display text-3xl font-medium leading-snug tracking-tight md:text-5xl"
        />

        <ScrollRevealWords
          text={`Some mistakes stay with you. August 4th is one of mine. No excuses. Just something I wish I had done better. Communication had its glitches — distance grew — but appreciation stays. Things I learned: show up, remember the small dates, and never take the daily calls for granted.`}
          highlightWords={["August", "4th", "appreciation"]}
          className="mt-14 font-display text-2xl font-normal leading-snug md:text-3xl"
        />
      </div>
    </section>
  );
}
