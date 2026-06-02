import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

const SOLUTION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";

const features = [
  {
    title: "v1.0 — Bumble Match Created",
    description:
      "[Soft Launch] The swipe that started it all. v1.5 — Daily Calls Activated soon after.",
  },
  {
    title: "v2.0 — Travel Mode Unlocked",
    description:
      "[Memory Saved] Trips, hostels, curfew drama. v2.5 — Scooter Trust System Enabled.",
  },
  {
    title: "v3.0 — Communication Issues Detected",
    description:
      "[Archived] Missed cues, quieter days. Not dramatic — just honest patch notes.",
  },
  {
    title: "v3.5 — Birthday Update Failed",
    description:
      "[Rare Screenshot] August 4th. No excuses. v4.0 — Archive Mode Enabled. core memory unlocked.",
  },
] as const;

export function SolutionSection() {
  return (
    <section className="border-t border-border/30 py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-8 md:px-28">
        <motion.div {...fadeUp(0)} className="text-xs tracking-[3px] uppercase text-muted-foreground">
          PATCH NOTES
        </motion.div>

        <motion.h2
          {...fadeUp(0.1)}
          className="mt-6 text-4xl font-medium tracking-[-1px] md:text-6xl"
        >
          Funny{" "}
          <span className="font-serif italic font-normal">Moments</span>
        </motion.h2>

        <motion.div {...fadeUp(0.15)} className="mt-12">
          <video
            className="aspect-[3/1] w-full rounded-2xl object-cover"
            src={SOLUTION_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
          {features.map((f, idx) => (
            <motion.div key={f.title} {...fadeUp(0.2 + idx * 0.08)}>
              <div className="text-base font-semibold">{f.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

