import Hls from "hls.js";
import { motion } from "framer-motion";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { fadeUp, useIsMobile } from "@/lib/motion";

const CTA_HLS =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export function CTASection() {
  const isMobile = useIsMobile();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = CTA_HLS;
      return;
    }

    if (!Hls.isSupported()) return;

    const hls = new Hls({ enableWorker: true });
    hls.loadSource(CTA_HLS);
    hls.attachMedia(video);

    return () => {
      hls.destroy();
    };
  }, []);

  return (
    <section
      id="thanks"
      className="relative scroll-mt-24 overflow-hidden border-t border-border/30 py-36 md:py-52"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 z-[1] bg-background/60" />
      <div className="absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
        <motion.span
          {...fadeUp(0, isMobile)}
          className="font-script text-3xl text-blush md:text-4xl"
        >
          the last page
        </motion.span>

        <motion.h2
          {...fadeUp(0.1, isMobile)}
          className="mt-4 font-display text-6xl font-medium tracking-tight md:text-8xl"
        >
          Thanks,{" "}
          <span className="font-serif italic font-normal text-blush">
            Merin.
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.2, isMobile)}
          className="mx-auto mt-8 max-w-2xl font-display text-2xl leading-relaxed text-[hsl(var(--hero-subtitle))] md:text-3xl"
        >
          Maybe some stories don&apos;t need a perfect ending. Maybe they only
          need gratitude. Thanks for the adventures. Thanks for the laughs.
          Thanks for being part of my life story.
        </motion.p>

        <motion.p
          {...fadeUp(0.3, isMobile)}
          className="mt-8 font-script text-3xl text-blush md:text-4xl"
        >
          still one of my favorite humans
        </motion.p>

        <motion.div {...fadeUp(0.4, isMobile)} className="mt-12">
          <Button
            variant="liquid"
            className="rounded-full px-10 py-3.5 text-sm font-medium tracking-[0.15em] ring-1 ring-white/10"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            READ IT AGAIN
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
