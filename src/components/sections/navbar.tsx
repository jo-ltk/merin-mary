import { Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { MindloopLogo } from "@/components/sections/logo";
import { cn } from "@/lib/utils";

const navLinks = ["Archive", "Travel", "Moments", "Thanks"] as const;

function Dot() {
  return <span className="text-muted-foreground/70">•</span>;
}

function SocialButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href="#"
      aria-label={label}
      className={cn(
        "liquid-glass grid h-10 w-10 place-items-center rounded-full",
        "ring-1 ring-white/5",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full px-8 py-4 md:px-28">
      <nav className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <MindloopLogo />
          <span className="text-base font-bold tracking-tight">Merin Mary</span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((label, idx) => (
            <div key={label} className="flex items-center gap-3">
              <a
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
              {idx !== navLinks.length - 1 ? <Dot /> : null}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SocialButton label="Instagram">
            <Instagram className="h-4 w-4 text-foreground" />
          </SocialButton>
          <SocialButton label="LinkedIn">
            <Linkedin className="h-4 w-4 text-foreground" />
          </SocialButton>
          <SocialButton label="Twitter">
            <Twitter className="h-4 w-4 text-foreground" />
          </SocialButton>
        </div>
      </nav>
    </header>
  );
}

