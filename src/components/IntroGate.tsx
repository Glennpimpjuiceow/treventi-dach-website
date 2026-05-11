"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import ParticleTextEffect from "@/components/ui/particle-text-effect";

// fly-in 0.9s + hold 1.5s + disperse 1s = 3.4s in Canvas
// + 0.5s exit-fade auf dem Container = 3.9s total
const FORM_MS = 750;
const HOLD_MS = 2000;
const DISPERSE_MS = 600;
const EXIT_FADE_MS = 450;
const fadeEase = [0.76, 0, 0.24, 1] as const;

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
            className="fixed inset-0 z-[100]"
            role="dialog"
            aria-label="Intro"
          >
            {/* Obere Hälfte — fährt nach oben raus */}
            <motion.div
              initial={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: EXIT_FADE_MS / 1000, ease: fadeEase }}
              className="absolute left-0 right-0 top-0 h-1/2 bg-[#7a1020]"
            />
            {/* Untere Hälfte — fährt nach unten raus */}
            <motion.div
              initial={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: EXIT_FADE_MS / 1000, ease: fadeEase }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#7a1020]"
            />
            {/* Content — blendet schnell aus, bevor Vorhänge fahren */}
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 overflow-hidden"
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
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
