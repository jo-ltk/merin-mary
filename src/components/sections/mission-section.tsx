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
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const clean = word.replace(/[—,.;:!?"]/g, "").toLowerCase();
  const isHighlight = highlightWords
    .map((w) => w.toLowerCase())
    .includes(clean);

  return (
    <motion.span
      style={{ opacity }}
      className={
        isHighlight ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]"
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
  return (
    <section className="mx-auto max-w-6xl px-8 pt-0 pb-32 md:px-28 md:pb-44">
      <motion.div {...fadeUp(0)} className="grid place-items-center">
        <video
          className="h-[520px] w-[520px] rounded-3xl object-cover md:h-[800px] md:w-[800px]"
          src={MISSION_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      <div className="mx-auto mt-16 max-w-5xl">
        <ScrollRevealWords
          text={`We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.`}
          highlightWords={["curiosity", "meets", "clarity"]}
          className="text-2xl font-medium tracking-[-1px] md:text-4xl lg:text-5xl"
        />

        <ScrollRevealWords
          text={`A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.`}
          className="mt-10 text-xl font-medium md:text-2xl lg:text-3xl"
        />
      </div>
    </section>
  );
}
