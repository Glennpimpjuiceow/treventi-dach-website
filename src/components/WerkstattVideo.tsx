"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC: string | undefined = "/video/marketing.mp4";

const SCROLL_HEIGHT = 1200;
const INITIAL_TOP = 10;
const INITIAL_BOTTOM = 70;
const INITIAL_LEFT = 14;
const INITIAL_RIGHT = 86;
const VIDEO_PLAY_THRESHOLD = 0.2;
const SNAP_TRIGGER_PROGRESS = 0.9;
const SNAP_DURATION_MS = 1500;

export default function WerkstattVideo() {
  const animationRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoErrored, setVideoErrored] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start start", "end end"],
  });

  const clipTop = useTransform(scrollYProgress, [0, 1], [INITIAL_TOP, 0]);
  const clipBottom = useTransform(scrollYProgress, [0, 1], [INITIAL_BOTTOM, 100]);
  const clipLeft = useTransform(scrollYProgress, [0, 1], [INITIAL_LEFT, 0]);
  const clipRight = useTransform(scrollYProgress, [0, 1], [INITIAL_RIGHT, 100]);
  const clipPath = useMotionTemplate`polygon(${clipLeft}% ${clipTop}%, ${clipRight}% ${clipTop}%, ${clipRight}% ${clipBottom}%, ${clipLeft}% ${clipBottom}%)`;

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.7, 1]);

  const snappedRef = useRef(false);
  const lastProgressRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (VIDEO_SRC && !reducedMotion) {
      const v = videoRef.current;
      if (v) {
        if (progress >= VIDEO_PLAY_THRESHOLD && progress <= 1) {
          if (v.paused) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    }

    const increasing = progress > lastProgressRef.current;
    lastProgressRef.current = progress;

    if (
      !reducedMotion &&
      progress >= SNAP_TRIGGER_PROGRESS &&
      increasing &&
      !snappedRef.current
    ) {
      snappedRef.current = true;
      setIsSnapping(true);
      window.setTimeout(() => setIsSnapping(false), SNAP_DURATION_MS);
    }
    if (progress < 0.8) snappedRef.current = false;
  });

  useEffect(() => {
    if (!isSnapping) return;
    const lockedY = window.scrollY;
    const prevent = (e: Event) => e.preventDefault();
    const lockScroll = () => {
      if (window.scrollY !== lockedY) window.scrollTo(0, lockedY);
    };
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("scroll", lockScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("scroll", lockScroll);
    };
  }, [isSnapping]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  const showVideo = VIDEO_SRC && !videoErrored;

  return (
    <section className="relative bg-[#F7F3EE]">
      {/* Header — eigene Section, normaler Flow, immer voll knallig */}
      <div className="mx-auto max-w-4xl px-5 pt-28 pb-6 text-center sm:px-8 sm:pt-32 sm:pb-8 md:pt-36 md:pb-10">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#EA0100]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
            Einblick
          </span>
          <span className="h-px w-8 bg-[#EA0100]" />
        </div>

        <h2 className="font-serif text-[2rem] font-medium leading-[1.05] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem] lg:text-[3.4rem]">
          20 Sekunden in unserer Werkstatt.
        </h2>

        <p className="mt-5 text-sm font-light leading-relaxed text-[#2C2725]/60 sm:mt-6 sm:text-base">
          Ein Blick hinter die Türen unserer Manufaktur in Prishtina.
        </p>
      </div>

      {/* Animation-Block — eigener Container für useScroll */}
      <div
        ref={animationRef}
        className="relative w-full"
        style={{ height: `calc(${SCROLL_HEIGHT}px + 100vh)` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-[#0E0B0A]"
            style={{
              clipPath,
              willChange: "clip-path",
            }}
          >
            {showVideo ? (
              <>
                <motion.video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  muted
                  playsInline
                  preload="auto"
                  loop
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    scale: videoScale,
                  }}
                  aria-label="Treventi Werkstatt — Produktionsprozess"
                  onError={() => setVideoErrored(true)}
                />
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
                  aria-pressed={!muted}
                  className="absolute bottom-6 right-6 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white/90 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA0100] sm:bottom-8 sm:right-8"
                >
                  {muted ? <VolumeX size={18} strokeWidth={1.6} /> : <Volume2 size={18} strokeWidth={1.6} />}
                </button>
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
