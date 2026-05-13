"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ImageTrail } from "@/components/ui/image-trail";

const ease = [0.22, 1, 0.36, 1] as const;

const TRAIL_IMAGES = [
  "/doors/01-dust-grey-meta-retta.jpg",
  "/doors/02-strada-snow-white.jpg",
  "/doors/05-oklahoma-oak.jpg",
  "/doors/06-bakersfield-walnut.jpg",
  "/doors/07-pamplona.jpg",
  "/doors/09-strada-dust-grey.jpg",
  "/doors/10-deggendreof-olive-green.jpg",
  "/doors/14-stabilitaet-geschmeidigkeit-0.jpg",
];

export default function Messebau() {
  const trailRef = useRef<HTMLDivElement>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setAutoPlay(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0E0B0A] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(234,1,0,0.08)_0%,_transparent_55%)]"
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-20 pb-6 text-center sm:px-8 sm:pt-28 sm:pb-10 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.49, ease }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#ea0100]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#ea0100] sm:text-[11px]">
            Messen &amp; Events
          </span>
          <span className="h-px w-8 bg-[#ea0100]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="font-serif text-[2rem] font-medium leading-[1.05] tracking-tight text-white sm:text-4xl md:text-[3rem] lg:text-[3.4rem]"
        >
          Treffen Sie uns auf der Messe.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/65 sm:mt-6 sm:text-base"
        >
          Treventi präsentiert sich regelmäßig auf den wichtigsten Fachmessen
          für Architektur und Innenausbau. Persönlich, mit echten Türen zum
          Anfassen.
        </motion.p>
      </div>

      {/* Interactive Trail Area — clickable to /messebau */}
      <Link
        href="/messebau"
        aria-label="Mehr über unsere Messeauftritte"
        className="group relative z-10 block"
      >
        <div
          ref={trailRef}
          className="relative mx-auto h-[440px] w-full max-w-7xl overflow-hidden sm:h-[540px] md:h-[620px]"
        >
          <ImageTrail
            containerRef={trailRef}
            autoPlay={autoPlay}
            interval={110}
            rotationRange={14}
          >
            {TRAIL_IMAGES.map((src) => (
              <div
                key={src}
                className="relative h-[170px] w-[130px] overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:h-[220px] sm:w-[170px] md:h-[260px] md:w-[200px]"
              >
                <Image
                  src={src}
                  alt="Treventi Tür"
                  fill
                  sizes="(max-width: 640px) 130px, (max-width: 1024px) 170px, 200px"
                  className="object-cover"
                />
              </div>
            ))}
          </ImageTrail>

          {/* Subtle hint, fades on hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="hidden text-[11px] uppercase tracking-[0.32em] text-white/30 transition-opacity duration-500 group-hover:opacity-0 sm:block">
              {autoPlay ? "Treventi auf Messen" : "Bewegen Sie die Maus"}
            </span>
          </div>
        </div>

        {/* CTA bottom */}
        <div className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-6 text-center sm:px-8 sm:pb-28 sm:pt-10 md:pb-32">
          <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors group-hover:text-[#ea0100] sm:text-[13px]">
            <span className="relative">
              Unsere Messeauftritte
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-white transition-colors group-hover:bg-[#ea0100]" />
            </span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </span>
        </div>
      </Link>
    </section>
  );
}
