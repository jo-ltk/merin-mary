import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/motion";

/* Pre-scattered offsets so the burst feels hand-placed, not random each render */
const BURST_HEARTS = [
  { x: -28, y: -56, scale: 0.75, rotate: -26, delay: 0, tone: "gold" },
  { x: 2, y: -72, scale: 1, rotate: 8, delay: 0.05, tone: "white" },
  { x: 30, y: -52, scale: 0.6, rotate: 30, delay: 0.1, tone: "gold" },
  { x: -14, y: -42, scale: 0.5, rotate: -12, delay: 0.16, tone: "white" },
  { x: 18, y: -38, scale: 0.45, rotate: 18, delay: 0.22, tone: "gold" },
] as const;

const GOLDEN_HEART =
  "fill-amber-100/90 text-amber-200 drop-shadow-[0_0_10px_rgba(255,236,179,0.55)]";
const WHITE_HEART =
  "fill-white/55 text-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]";

/** Soft golden-white hearts drifting behind the fullscreen photo. */
function GoldenLoveRain() {
  const drops = React.useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        x: Math.random() * 100,
        size: 9 + Math.random() * 14,
        duration: 5 + Math.random() * 4.5,
        delay: Math.random() * 3.5,
        drift: (Math.random() - 0.5) * 80,
        rotate: (Math.random() - 0.5) * 50,
        tone: i % 2 === 0 ? "gold" : "white",
        twinkle: 0.35 + Math.random() * 0.45,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {drops.map((d, i) => (
        <motion.span
          key={i}
          className="absolute top-0"
          style={{ left: `${d.x}%` }}
          initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: d.drift,
            rotate: d.rotate,
            opacity: [0, d.twinkle, d.twinkle, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            className={d.tone === "gold" ? GOLDEN_HEART : WHITE_HEART}
            style={{ width: d.size, height: d.size }}
          />
        </motion.span>
      ))}
    </div>
  );
}

export function MemoryCard({
  src,
  flipped,
  onTap,
  className = "",
}: {
  src: string;
  flipped: boolean;
  onTap: () => void;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  const handleTap = () => {
    if (!flipped) {
      // Tiny haptic tick where supported (Android); silently ignored elsewhere
      navigator.vibrate?.(12);
    }
    onTap();
  };

  return (
    <button
      type="button"
      data-no-heart-rain
      onClick={handleTap}
      aria-pressed={flipped}
      aria-label={flipped ? "Close the photo" : "Open the photo full screen"}
      className={`group relative block cursor-pointer select-none [-webkit-tap-highlight-color:transparent] [perspective:1000px] focus:outline-none ${className}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileTap={reduced ? undefined : { scale: 0.95 }}
        transition={
          reduced
            ? { duration: 0.3, ease: "easeOut" }
            : { type: "spring", stiffness: 200, damping: 18, mass: 0.8 }
        }
      >
        {/* Front — the photo as it sits in the fan */}
        <div className="photo-frame relative h-full w-full [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <img src={src} alt="" loading="eager" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
          {/* Soft sheen that drifts on touch/hover for a “collectible” feel */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full group-active:translate-x-full" />
          {/* Quiet invitation to flip */}
          <span className="absolute bottom-1.5 right-1.5 grid h-5 w-5 place-items-center rounded-full bg-background/50 backdrop-blur-sm">
            <Heart className="h-2.5 w-2.5 text-blush" />
          </span>
        </div>

        {/* Back — a plain card back, as if the photo was lifted out of it */}
        <div className="photo-frame absolute inset-0 [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_18%,hsl(var(--blush)/0.16),transparent_60%),linear-gradient(160deg,hsl(0_0%_9%),hsl(350_20%_7%))] p-1.5">
            <div className="grid h-full w-full place-items-center rounded-[0.6rem] border border-dashed border-blush/25">
              <Heart className="h-4 w-4 text-blush/50" />
            </div>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

/**
 * Fullscreen, centered photo reveal. The image flips into view like a card
 * being turned over in your hand.
 */
export function MemoryLightbox({
  src,
  caption,
  onClose,
}: {
  src: string | null;
  caption?: string | null;
  onClose: () => void;
}) {
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!src) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          data-no-heart-rain
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop — blurred page behind, warm glow, soft vignette */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-2xl" />
          <div className="blush-glow absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(var(--background)/0.7)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,236,179,0.08)_0%,transparent_55%)]" />

          {!reduced && <GoldenLoveRain />}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-background/60 text-foreground/80 backdrop-blur-sm [-webkit-tap-highlight-color:transparent]"
          >
            <X className="h-4 w-4" />
          </button>

          {/* The photo, flipping in from the card */}
          <div className="relative z-10 [perspective:1400px]">
            <motion.div
              key={src}
              className="photo-frame relative"
              initial={
                reduced
                  ? { opacity: 0 }
                  : { rotateY: -110, scale: 0.45, y: 48, opacity: 0 }
              }
              animate={
                reduced
                  ? { opacity: 1 }
                  : { rotateY: 0, scale: 1, y: 0, opacity: 1 }
              }
              exit={
                reduced
                  ? { opacity: 0 }
                  : {
                      rotateY: 75,
                      scale: 0.5,
                      y: 36,
                      opacity: 0,
                      transition: { duration: 0.3, ease: "easeIn" },
                    }
              }
              transition={
                reduced
                  ? { duration: 0.3 }
                  : { type: "spring", stiffness: 160, damping: 18, mass: 0.9 }
              }
            >
              <img
                src={src}
                alt=""
                draggable={false}
                style={{
                  display: "block",
                  width: "auto",
                  height: "auto",
                  maxWidth: "min(88vw, 42rem)",
                  maxHeight: caption ? "66dvh" : "78dvh",
                  objectFit: "contain",
                }}
              />

              {/* Heart burst as the photo lands */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0"
              >
                {BURST_HEARTS.map((h, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-0"
                    initial={{ opacity: 0, x: 0, y: 6, scale: 0.2, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: h.x * 1.6,
                      y: h.y * 1.4,
                      scale: h.scale * 1.3,
                      rotate: h.rotate,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.35 + h.delay,
                      ease: "easeOut",
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${h.tone === "gold" ? GOLDEN_HEART : WHITE_HEART}`}
                    />
                  </motion.span>
                ))}
              </span>
            </motion.div>

            {/* Handwritten note under the photo */}
            {caption && (
              <motion.p
                key={`${src}-caption`}
                className="mt-5 px-4 text-center font-script text-2xl leading-snug text-blush md:text-3xl"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              >
                {caption}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
