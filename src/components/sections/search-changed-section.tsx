import { motion } from "framer-motion";

import { ChapterHeading } from "@/components/sections/chapter-heading";
import { fadeUp, useIsMobile } from "@/lib/motion";

const platforms = [
  {
    name: "Travel Enthusiast",
    description:
      "[Travel Mode] She loves exploring new places. Travel first. Plan later. — travel mode activated",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=640&h=800&q=80",
    alt: "Mountain road — Favorite Moment",
    rotate: -2,
  },
  {
    name: "Independent Soul",
    description:
      "[Core Memory] Very independent. Prefers freedom. Freedom always looked good on her.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=640&h=800&q=80",
    alt: "Open horizon — Main character energy",
    rotate: 1.5,
  },
  {
    name: "Curfew Survivor",
    description:
      "[Chaos Detected] Hostel curfew at 9:30 PM? Never her vibe. Spontaneous adventures only.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=640&h=800&q=80",
    alt: "Night city lights — Rare Screenshot",
    rotate: -1,
  },
] as const;

export function SearchChangedSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="story"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-44 pb-10 md:px-12 md:pt-60"
    >
      <ChapterHeading
        eyebrow="chapter one"
        title={
          <>
            How We <span className="font-serif italic font-normal text-blush">Met</span>
          </>
        }
        lede="It started on Bumble — a match, a hello, and someone who turned out to be main character energy from day one. Soft launch energy, honestly."
      />

      <div className="mt-24 grid gap-14 md:grid-cols-3 md:gap-10">
        {platforms.map((p, idx) => (
          <motion.figure
            key={p.name}
            {...fadeUp(0.15 + idx * 0.1, isMobile)}
            className="group"
            style={{ rotate: p.rotate }}
          >
            <div className="photo-frame aspect-[4/5]">
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
            </div>
            <figcaption className="mt-6 px-1">
              <div className="font-display text-2xl font-medium tracking-tight">
                {p.name}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <motion.p
        {...fadeUp(0.5, isMobile)}
        className="mt-24 text-center font-script text-2xl text-blush/80 md:text-3xl"
      >
        Cubbon and slow Sundays — still one of the funniest people I met.
      </motion.p>
    </section>
  );
}
