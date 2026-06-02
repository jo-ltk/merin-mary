import Hls from "hls.js";
import { motion } from "framer-motion";
import * as React from "react";

import { MindloopLogo } from "@/components/sections/logo";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CTA_HLS =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export function CTASection() {
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
    <section className="relative overflow-hidden border-t border-border/30 py-32 md:py-44">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 z-[1] bg-background/45" />

      <div className="relative z-10 mx-auto max-w-6xl px-8 text-center md:px-28">
        <motion.div {...fadeUp(0)} className="mx-auto grid place-items-center">
          <MindloopLogo
            className="h-10 w-10"
            outerClassName="h-10 w-10"
            innerClassName="h-5 w-5"
          />
        </motion.div>

        <motion.h2
          {...fadeUp(0.1)}
          className="mt-8 text-4xl font-medium tracking-[-1px] md:text-6xl"
        >
          Start Your{" "}
          <span className="font-serif italic font-normal">Journey</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Subscribe for depth-first ideas. Write to build a body of work that
          compounds.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className={cn(
            "mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row",
          )}
        >
          <Button className="rounded-lg px-8 py-3.5 text-sm font-semibold">
            Subscribe Now
          </Button>
          <Button
            variant="liquid"
            className="rounded-lg px-8 py-3.5 text-sm font-semibold ring-1 ring-white/5"
          >
            Start Writing
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

