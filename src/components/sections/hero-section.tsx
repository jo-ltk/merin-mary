import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp } from "@/lib/motion";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";

const avatars = [
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&h=96&q=80",
];

export function HeroSection() {
  return (
    <section className="relative min-h-dvh overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-background/55" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col items-center justify-center px-8 pt-28 text-center md:px-28 md:pt-32">
        <motion.div
          {...fadeUp(0)}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {avatars.map((src) => (
              <img
                key={src}
                src={src}
                alt="Archived travel memory"
                className="h-8 w-8 rounded-full border-2 border-background object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Travel Mode · Memory Saved · Archived
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
        >
          PROJECT:{" "}
          <span className="font-serif italic font-normal">MERIN</span> MARY
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 max-w-3xl text-lg leading-relaxed text-[hsl(var(--hero-subtitle))]"
        >
          An interactive archive of adventures, travel stories, random chaos,
          missed moments, and one unforgettable human.
        </motion.p>

        <motion.form
          {...fadeUp(0.3)}
          onSubmit={(e) => e.preventDefault()}
          className="liquid-glass mt-10 flex w-full max-w-lg items-center gap-2 rounded-full p-2 ring-1 ring-white/5"
        >
          <Input
            type="email"
            placeholder="reply loading..."
            className="h-12 flex-1 rounded-full"
          />
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button className="h-12 rounded-full px-8 py-3 font-semibold tracking-[1px]">
              OPEN ARCHIVE
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

