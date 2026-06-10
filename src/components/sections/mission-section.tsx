import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as React from "react";

import { fadeUp } from "@/lib/motion";

const MISSION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";

function RevealWord({
  word,
  index,
  total,
  scrollYProgress,
  highlightWords,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  highlightWords: string[];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const clean = word.replace(/[—,.;:!?"]/g, "").toLowerCase();
  const isHighlight = highlightWords
    .map((w) => w.toLowerCase())
    .includes(clean);

  return (
    <motion.span
      style={{ opacity }}
      className={
        isHighlight
          ? "italic text-blush"
          : "text-[hsl(var(--hero-subtitle))]"
      }
    >
      {word}{" "}
    </motion.span>
  );
}

function ScrollRevealWords({
  text,
  className,
  highlightWords = [],
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
}) {
  const ref = React.useRef<HTMLParagraphElement | null>(null);
  const words = React.useMemo(() => text.split(" "), [text]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <RevealWord
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
          highlightWords={highlightWords}
        />
      ))}
    </p>
  );
}

export function MissionSection() {
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="adventures"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32 pb-32 md:px-12 md:pt-44 md:pb-44"
    >
      <div className="text-center">
        <motion.span
          {...fadeUp(0)}
          className="font-script text-2xl text-blush md:text-3xl"
        >
          chapter two
        </motion.span>
        <motion.h2
          {...fadeUp(0.1)}
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
        {...fadeUp(0.15)}
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
            preload="auto"
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
