import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export const fadeUp = (delay: number, reduced = false) => ({
  initial: { opacity: 0, y: reduced ? 12 : 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: reduced ? "-40px" : "-100px" },
  transition: {
    duration: reduced ? 0.35 : 0.6,
    delay: reduced ? delay * 0.4 : delay,
    ease: "easeOut" as const,
  },
});

export const titleReveal = (delay: number, reduced = false) => ({
  initial: {
    opacity: 0,
    y: reduced ? 20 : 40,
    ...(reduced ? {} : { filter: "blur(10px)" }),
  },
  animate: {
    opacity: 1,
    y: 0,
    ...(reduced ? {} : { filter: "blur(0px)" }),
  },
  transition: {
    duration: reduced ? 0.65 : 1.2,
    delay: reduced ? delay * 0.45 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

/** Opacity for staggered word reveal driven by a single scroll progress value. */
export function wordRevealOpacity(
  progress: number,
  index: number,
  total: number,
): number {
  const start = index / total;
  const end = (index + 1) / total;
  if (progress <= start) return 0.12;
  if (progress >= end) return 1;
  return 0.12 + ((progress - start) / (end - start)) * 0.88;
}
