import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ChapterHeading({
  eyebrow,
  title,
  lede,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "text-center" : "text-left")}>
      <motion.span
        {...fadeUp(0)}
        className="font-script text-2xl text-blush md:text-3xl"
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        {...fadeUp(0.1)}
        className="mt-3 font-display text-5xl font-medium tracking-tight md:text-7xl"
      >
        {title}
      </motion.h2>

      {lede ? (
        <motion.p
          {...fadeUp(0.2)}
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {lede}
        </motion.p>
      ) : null}
    </div>
  );
}
