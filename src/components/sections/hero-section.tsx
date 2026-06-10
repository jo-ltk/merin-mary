import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Heart } from "lucide-react";
import * as React from "react";

import { MemoryCard, MemoryLightbox } from "@/components/memory/memory-card";
import { titleReveal, useIsMobile } from "@/lib/motion";

/**
 * Swap these with your own photos: drop files into /public/images
 * and change `src` to "/images/your-photo.jpg".
 */
const PHOTOS = [
  {
    src: "/images/hero-1.png",
    caption: "the smile that stayed",
    className: "left-[3%] top-[14%] w-40 lg:left-[6%] lg:w-52",
    rotate: -7,
    depth: 34,
    delay: 0.65,
    float: 6.2,
  },
  {
    src: "/images/hero-2.png",
    caption: "a chapter I still reread",
    className: "right-[2%] top-[12%] w-44 lg:right-[5%] lg:w-60",
    rotate: 6,
    depth: 26,
    delay: 0.8,
    float: 7.4,
  },
  {
    src: "/images/hero-3.png",
    caption: "the memories are still here",
    className: "bottom-[16%] left-[8%] w-48 lg:left-[12%] lg:w-64",
    rotate: 5,
    depth: 20,
    delay: 0.95,
    float: 8.1,
  },
  {
    src: "/images/hero-4.png",
    caption: "hoping for one more conversation",
    className: "bottom-[14%] right-[7%] w-44 lg:right-[11%] lg:w-56",
    rotate: -5,
    depth: 30,
    delay: 1.1,
    float: 6.8,
  },
] as const;

type Photo = (typeof PHOTOS)[number];

function FloatingPhoto({
  photo,
  mouseX,
  mouseY,
  scrollProgress,
  flipped,
  onTap,
}: {
  photo: Photo;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  flipped: boolean;
  onTap: () => void;
}) {
  const px = useTransform(mouseX, (v) => v * photo.depth);
  const py = useTransform(mouseY, (v) => v * photo.depth);
  const drift = useTransform(scrollProgress, [0, 1], [0, photo.depth * 6]);
  const fade = useTransform(scrollProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div
      className={`absolute ${photo.className}`}
      style={{ y: drift, opacity: fade }}
    >
      <motion.div style={{ x: px, y: py }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: photo.rotate * 2.4, y: 36 }}
          animate={{ opacity: 1, scale: 1, rotate: photo.rotate, y: 0 }}
          transition={{
            duration: 1.3,
            delay: photo.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: photo.float,
              repeat: Infinity,
              ease: "easeInOut",
              delay: photo.delay,
            }}
            whileHover={{ scale: 1.04, transition: { duration: 0.4 } }}
          >
            <MemoryCard
              src={photo.src}
              flipped={flipped}
              onTap={onTap}
              className="aspect-[4/5] w-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const isMobile = useIsMobile();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 16 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 16 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const titleFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Tapping any card flips it open and shows the photo full screen, centered
  const [activeCard, setActiveCard] = React.useState<number | null>(null);
  const [hasExplored, setHasExplored] = React.useState(false);
  // Keeps the most recently opened card on top while it settles back into the fan
  const lastActiveCard = React.useRef<number | null>(null);

  const openCard = (i: number) => {
    lastActiveCard.current = i;
    setHasExplored(true);
    setActiveCard((cur) => (cur === i ? null : i));
  };

  const onMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-dvh overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="blush-glow absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />

      {/* Floating photo collage — desktop & tablet */}
      <div className="absolute inset-0 hidden md:block">
        {PHOTOS.map((photo, i) => (
          <FloatingPhoto
            key={photo.src}
            photo={photo}
            mouseX={mouseX}
            mouseY={mouseY}
            scrollProgress={scrollYProgress}
            flipped={activeCard === i}
            onTap={() => openCard(i)}
          />
        ))}
      </div>

      {/* Headline */}
      <motion.div
        style={{ y: titleY, opacity: titleFade }}
        className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center px-6 pt-24 text-center md:pt-28"
      >
        <motion.span
          {...titleReveal(0.15, isMobile)}
          className="font-script text-3xl text-blush md:text-4xl"
        >
          a love letter for
        </motion.span>

        <motion.h1
          {...titleReveal(0.35, isMobile)}
          className="mt-4 font-display text-7xl font-medium leading-[0.95] tracking-tight md:text-8xl lg:text-[9rem]"
        >
          Merin{" "}
          <span className="font-light italic text-blush">Mary</span>
        </motion.h1>

        <motion.div
          {...titleReveal(0.6, isMobile)}
          className="mt-8 flex items-center gap-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-xs"
        >
          <span className="h-px w-8 bg-border md:w-12" />
          every mile · every laugh · every memory
          <span className="h-px w-8 bg-border md:w-12" />
        </motion.div>

        {/* Mobile collage — a fan of tappable memory cards */}
        <motion.div
          {...titleReveal(0.8, isMobile)}
          className="mt-12 flex flex-col items-center md:hidden"
        >
          <div className="flex items-center justify-center">
            {PHOTOS.slice(0, 4).map((photo, i) => {
              const isActive = activeCard === i;

              return (
                <motion.div
                  key={photo.src}
                  className="-ml-8 first:ml-0"
                  style={{
                    zIndex: isActive ? 40 : lastActiveCard.current === i ? 30 : i,
                  }}
                  animate={{
                    rotate: isActive ? 0 : (i - 1.5) * 6,
                    y: isActive ? -10 : Math.abs(i - 1.5) * 8,
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <MemoryCard
                    src={photo.src}
                    flipped={isActive}
                    onTap={() => openCard(i)}
                    className="aspect-[4/5] w-28"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Invitation to explore — retires after the first discovery */}
          <motion.span
            aria-hidden
            className="mt-7 font-script text-xl text-blush/80"
            animate={
              hasExplored
                ? { opacity: 0 }
                : { opacity: [0.45, 1, 0.45] }
            }
            transition={
              hasExplored
                ? { duration: 0.5 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            tap a card to reveal a memory
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Fullscreen photo reveal */}
      <MemoryLightbox
        src={activeCard !== null ? PHOTOS[activeCard].src : null}
        caption={activeCard !== null ? PHOTOS[activeCard].caption : null}
        onClose={() => setActiveCard(null)}
      />

      {/* Scroll cue — CSS animations avoid extra JS-driven frames on mobile */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-fade-in flex-col items-center gap-3 [animation-delay:2s]">
        <div className="animate-pulse-soft">
          <Heart className="h-4 w-4 fill-blush text-blush" />
        </div>
        <div className="relative h-12 w-px overflow-hidden bg-border/40">
          <div className="absolute h-1/2 w-full animate-scroll-cue bg-blush" />
        </div>
      </div>
    </section>
  );
}
