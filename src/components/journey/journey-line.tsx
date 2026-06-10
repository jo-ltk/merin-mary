import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import * as React from "react";

/**
 * A winding line that "draws itself" as you scroll — the thread of the story.
 * Rendered behind the chapter sections; a small glowing heart travels the path.
 */
const PATH_D = [
  "M 500 10",
  "C 500 220, 860 280, 868 520",
  "C 876 760, 140 800, 132 1060",
  "C 124 1320, 872 1360, 866 1640",
  "C 860 1920, 128 1960, 134 2280",
  "C 140 2600, 864 2640, 856 2980",
  "C 848 3320, 180 3380, 480 3700",
  "C 560 3790, 500 3900, 500 3990",
].join(" ");

const SPARKLES = [
  { x: 868, y: 520 },
  { x: 132, y: 1060 },
  { x: 866, y: 1640 },
  { x: 134, y: 2280 },
  { x: 856, y: 2980 },
] as const;

export function JourneyLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const heartRef = React.useRef<SVGGElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.9"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.0001,
  });

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    const heart = heartRef.current;
    if (!path || !heart) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(Math.max(0, Math.min(1, v)) * length);
    heart.setAttribute("transform", `translate(${point.x}, ${point.y})`);
    heart.setAttribute("opacity", v > 0.005 && v < 0.995 ? "1" : "0");
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 4000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="journey-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--blush))" stopOpacity="0.55" />
          <stop offset="45%" stopColor="hsl(var(--foreground))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--blush))" stopOpacity="0.6" />
        </linearGradient>
        <filter id="journey-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Faint ghost of the full route */}
      <path
        d={PATH_D}
        stroke="hsl(var(--foreground) / 0.08)"
        strokeWidth="1"
        strokeDasharray="3 9"
        vectorEffect="non-scaling-stroke"
      />

      {/* Soft glow underneath the drawn line */}
      <motion.path
        d={PATH_D}
        stroke="hsl(var(--blush) / 0.35)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#journey-glow)"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: progress }}
      />

      {/* The line itself, drawn by scroll */}
      <motion.path
        ref={pathRef}
        d={PATH_D}
        stroke="url(#journey-stroke)"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: progress }}
      />

      {/* Sparkles resting on the bends */}
      {SPARKLES.map((s, i) => (
        <motion.circle
          key={`${s.x}-${s.y}`}
          cx={s.x}
          cy={s.y}
          r="2.5"
          fill="hsl(var(--blush) / 0.9)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.1 }}
        />
      ))}

      {/* Glowing heart travelling along the line */}
      <g ref={heartRef} opacity="0">
        <circle r="10" fill="hsl(var(--blush) / 0.25)" filter="url(#journey-glow)" />
        <circle r="3.5" fill="hsl(var(--blush))" />
        <circle r="6" fill="none" stroke="hsl(var(--blush) / 0.5)" strokeWidth="0.75" />
      </g>
    </svg>
  );
}
