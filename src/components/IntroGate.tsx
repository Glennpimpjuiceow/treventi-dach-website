"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import ParticleTextEffect from "@/components/ui/particle-text-effect";

// fly-in 1.5s + hold 1s + disperse 1s = 3.5s in Canvas
// + 0.5s exit-fade auf dem Container = 4.0s total
const FORM_MS = 1500;
const HOLD_MS = 1000;
const DISPERSE_MS = 1000;
const EXIT_FADE_MS = 500;
const fadeEase = [0.22, 1, 0.36, 1] as const;

type Phase = "pending" | "playing" | "done";

export default function IntroGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const safetyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    setPhase("playing");
    document.body.style.overflow = "hidden";

    safetyTimerRef.current = window.setTimeout(() => {
      setPhase("done");
    }, FORM_MS + HOLD_MS + DISPERSE_MS + 1500);

    return () => {
      if (safetyTimerRef.current) window.clearTimeout(safetyTimerRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  const handleComplete = useCallback(() => {
    if (safetyTimerRef.current) {
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
    setPhase("done");
  }, []);

  const handleSkip = useCallback(() => {
    if (safetyTimerRef.current) {
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
    setPhase("done");
  }, []);

  return (
    <>
      <AnimatePresence>
        {phase === "playing" && (
          <motion.div
            key="treventi-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_FADE_MS / 1000, ease: fadeEase }}
            className="fixed inset-0 z-[100] overflow-hidden bg-[#7a1020]"
            role="dialog"
            aria-label="Intro"
          >
            <ParticleTextEffect
              imageSrc="/treventi-logo-white.svg"
              imageAspect={193 / 38}
              formMs={FORM_MS}
              holdMs={HOLD_MS}
              disperseMs={DISPERSE_MS}
              onComplete={handleComplete}
            />

            <button
              type="button"
              onClick={handleSkip}
              className="group absolute bottom-6 right-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white sm:bottom-8 sm:right-8"
              aria-label="Intro überspringen"
            >
              <span>Weiter</span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
