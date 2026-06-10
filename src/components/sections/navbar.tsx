import { Heart } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Adventures", href: "#adventures" },
  { label: "Moments", href: "#moments" },
  { label: "Thanks", href: "#thanks" },
] as const;

function Dot() {
  return <span className="text-muted-foreground/50">·</span>;
}

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full px-6 py-5 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 to-transparent" />
      <nav className="relative flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-tight">
            Merin Mary
          </span>
          <span className="hidden font-script text-base text-blush/80 sm:inline">
            the archive
          </span>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link, idx) => (
            <div key={link.label} className="flex items-center gap-4">
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
              {idx !== navLinks.length - 1 ? <Dot /> : null}
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          aria-label="Shower the page with love"
          className={cn(
            "liquid-glass grid h-10 w-10 cursor-pointer place-items-center rounded-full",
            "ring-1 ring-white/5",
          )}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          <Heart className="h-4 w-4 text-blush" />
        </motion.button>
      </nav>
    </motion.header>
  );
}
