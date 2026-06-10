import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const HEART_EMOJIS = ["💖", "💗", "💕", "❤️", "🤍", "💘", "✨"] as const;

const HEARTS_PER_BURST = 28;

type HeartDrop = {
  id: number;
  emoji: string;
  /** Horizontal start position as vw percentage */
  x: number;
  size: number;
  duration: number;
  delay: number;
  /** Horizontal sway distance in px */
  drift: number;
  rotate: number;
};

let nextId = 0;

function createBurst(): HeartDrop[] {
  return Array.from({ length: HEARTS_PER_BURST }, () => ({
    id: nextId++,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    x: Math.random() * 100,
    size: 14 + Math.random() * 22,
    duration: 3 + Math.random() * 2.5,
    delay: Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 120,
    rotate: (Math.random() - 0.5) * 60,
  }));
}

export function useHeartRain() {
  const [hearts, setHearts] = React.useState<HeartDrop[]>([]);

  const burst = React.useCallback(() => {
    setHearts((prev) => [...prev, ...createBurst()]);
  }, []);

  const remove = React.useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return { hearts, burst, remove };
}

/**
 * Mounts once at app level: rains hearts whenever any button or link
 * anywhere on the page is clicked.
 */
export function GlobalHeartRain() {
  const { hearts, burst, remove } = useHeartRain();

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a")) burst();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [burst]);

  return <HeartRain hearts={hearts} onHeartDone={remove} />;
}

export function HeartRain({
  hearts,
  onHeartDone,
}: {
  hearts: HeartDrop[];
  onHeartDone: (id: number) => void;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            initial={{ y: "-8vh", x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "108vh",
              x: heart.drift,
              opacity: [0, 1, 1, 0.9, 0],
              rotate: heart.rotate,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "linear",
            }}
            onAnimationComplete={() => onHeartDone(heart.id)}
            className="absolute top-0 select-none"
            style={{ left: `${heart.x}vw`, fontSize: heart.size }}
          >
            {heart.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
