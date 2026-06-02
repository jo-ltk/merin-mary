import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

const platforms = [
  {
    name: "Travel Enthusiast",
    description:
      "[Travel Mode] She loves exploring new places. Travel first. Plan later. — travel mode activated",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&h=400&q=80",
    alt: "Mountain road — Favorite Moment",
  },
  {
    name: "Independent Soul",
    description:
      "[Core Memory] Very independent. Prefers freedom. Freedom always looked good on her.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=400&q=80",
    alt: "Open horizon — Main character energy",
  },
  {
    name: "Curfew Survivor",
    description:
      "[Chaos Detected] Hostel curfew at 9:30 PM? Never her vibe. Spontaneous adventures only.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&h=400&q=80",
    alt: "Night city lights — Rare Screenshot",
  },
] as const;

export function SearchChangedSection() {
  return (
    <section className="mx-auto max-w-6xl px-8 pt-52 pb-6 text-center md:px-28 md:pt-64 md:pb-9">
      <motion.h2
        {...fadeUp(0)}
        className="text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
      >
        How We{" "}
        <span className="font-serif italic font-normal">Met</span>
      </motion.h2>

      <motion.p
        {...fadeUp(0.1)}
        className="mx-auto mt-6 mb-24 max-w-2xl text-lg text-muted-foreground"
      >
        It started on Bumble — a match, a hello, and someone who turned out to
        be main character energy from day one. Soft launch energy, honestly.
      </motion.p>

      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        {platforms.map((p, idx) => (
          <motion.div
            key={p.name}
            {...fadeUp(0.15 + idx * 0.08)}
            className="liquid-glass rounded-2xl p-8 text-left ring-1 ring-white/5"
          >
            <div className="grid place-items-center">
              <img
                src={p.img}
                alt={p.alt}
                className="h-[200px] w-[200px] rounded-2xl object-cover opacity-90"
                loading="lazy"
              />
            </div>
            <div className="mt-6 text-base font-semibold">{p.name}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fadeUp(0.5)}
        className="mt-20 text-center text-sm text-muted-foreground"
      >
        Cubbon and slow Sundays. · Still one of the funniest people I met.
      </motion.p>
    </section>
  );
}

