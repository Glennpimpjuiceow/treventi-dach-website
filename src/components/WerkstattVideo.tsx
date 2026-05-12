"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_SRC: string | undefined = undefined;
const POSTER_SRC = "/hero/treventi-DSC04385-COPY.jpg";

export default function WerkstattVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoErrored, setVideoErrored] = useState(false);

  const inView = useInView(containerRef, {
    margin: "-15% 0px -15% 0px",
    amount: 0.4,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!VIDEO_SRC || reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reducedMotion]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  const showVideo = VIDEO_SRC && !videoErrored;

  return (
    <section className="relative bg-[#F7F3EE] py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.49, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Einblick
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.07 }}
            className="mt-5 font-serif text-[2rem] font-medium leading-[1.04] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem] lg:text-[3.4rem]"
          >
            20 Sekunden in unserer Werkstatt.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.49, ease, delay: 0.14 }}
            className="mt-5 max-w-xl text-[14px] font-light leading-relaxed text-[#2C2725]/70 sm:text-base"
          >
            Ein Blick hinter die Türen unserer Manufaktur in Prishtina.
          </motion.p>
        </div>

        {/* Video-Frame */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 1.04, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.84, ease, delay: 0.21 }}
          className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-sm bg-[#0E0B0A] ring-1 ring-[#2C2725]/10 shadow-[0_24px_60px_-20px_rgba(44,39,37,0.35)] sm:mt-14"
        >
          {showVideo ? (
            <>
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                muted
                playsInline
                preload="metadata"
                loop
                className="h-full w-full object-cover"
                aria-label="Treventi Werkstatt — Produktionsprozess"
                onError={() => setVideoErrored(true)}
              />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
                aria-pressed={!muted}
                className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white/90 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA0100] sm:bottom-5 sm:right-5"
              >
                {muted ? <VolumeX size={16} strokeWidth={1.6} /> : <Volume2 size={16} strokeWidth={1.6} />}
              </button>
            </>
          ) : (
            <>
              <Image
                src={POSTER_SRC}
                alt="Treventi Werkstatt — Vorschau"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover brightness-[0.65]"
                priority={false}
              />
              <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.28em] text-white/70 sm:left-5 sm:top-5">
                Bald · Video
              </span>
              <div
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center"
              >
                <div className="grid h-16 w-16 place-items-center rounded-full bg-black/35 ring-2 ring-[#EA0100]/70 backdrop-blur-sm">
                  <Play size={22} strokeWidth={1.6} className="ml-1 text-white" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
