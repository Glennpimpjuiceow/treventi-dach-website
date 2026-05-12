"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

import Image from "next/image";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const lineReveal = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

function MaskLine({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease, delay }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

const facts = [
  { target: 12, suffix: "+", label: "Jahre Manufaktur" },
  { target: 100, suffix: "%", label: "Made in Europe" },
  { target: 0, suffix: "", label: "Zwischen­händler" },
];

function StatItem({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(target, 980, active);
  return (
    <div className="flex flex-col gap-2">
      <dt className="font-serif text-[1.5rem] font-medium leading-none tracking-tight text-white sm:text-[2.25rem] md:text-[2.6rem]">
        {count}{suffix}
      </dt>
      <dd className="text-[9px] uppercase leading-snug tracking-[0.16em] text-white/50 sm:text-[11px] sm:tracking-[0.24em]">
        {label}
      </dd>
    </div>
  );
}

function MiniFacts() {
  const ref = useRef<HTMLDListElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.dl
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
      className="mt-4 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-4 sm:mt-12 sm:gap-8 sm:pt-10"
    >
      {facts.map((f) => (
        <StatItem key={f.label} {...f} active={isInView} />
      ))}
    </motion.dl>
  );
}

export default function AboutTreventi() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      className="relative isolate w-full overflow-hidden bg-[#7a1020] py-8 text-white sm:py-28 md:py-36"
    >
      {/* Subtle radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(234,1,0,0.08)_0%,_transparent_55%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 sm:gap-12 sm:px-8 md:grid-cols-12 md:gap-16 md:px-12 lg:px-16 xl:px-20">
        {/* Image Column — fadet von links rein, Parallax beim Scrollen, Hover-Zoom + Glow */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.77, ease }}
          className="relative md:col-span-6 lg:col-span-6"
        >
          <div className="group relative aspect-[5/2] overflow-hidden rounded-sm transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_60px_rgba(234,1,0,0.38)] sm:aspect-[5/6] md:aspect-[4/5]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 will-change-transform"
            >
              <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
                <Image
                  src="/hero/treventi-23143242342342-1.jpg"
                  alt="Treventi Manufaktur — Handwerker bei der Qualitätskontrolle in Kosovo"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            {/* Subtler Knallrot-Border-Glow only on hover (sits inside the rounded box) */}
            <div className="pointer-events-none absolute inset-0 rounded-sm ring-0 ring-[#ea0100]/0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ring-1 group-hover:ring-[#ea0100]/35" />

            {/* Bottom gradient for tonal grounding */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#5c0c18]/40" />
          </div>

          {/* Caption hairline below image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.56, ease, delay: 0.28 }}
            className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55 sm:mt-6 sm:text-xs"
          >
            <span className="h-px w-8 bg-white/40" />
            <span>Manufaktur · Prishtina</span>
          </motion.div>
        </motion.div>

        {/* Text Column — Stagger von rechts */}
        <div className="flex flex-col justify-center md:col-span-6 lg:col-span-6">
          {/* Eyebrow — 0.1s */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.56, ease, delay: 0.07 }}
            className="mb-3 flex items-center gap-3 sm:mb-8"
          >
            <span className="h-px w-10 bg-[#ea0100] sm:w-12" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 sm:text-xs">
              Über Treventi
            </span>
          </motion.div>

          {/* Headline — 3 Zeilen, Stagger 0.2 / 0.4 / 0.6 */}
          <h2 className="font-serif text-[1.75rem] font-medium leading-[1.04] tracking-tight text-white sm:text-5xl md:text-[3.4rem] lg:text-[4rem]">
            <MaskLine delay={0.14}>Seit 2014.</MaskLine>
            <MaskLine delay={0.28}>Aus Kosovo.</MaskLine>
            <MaskLine delay={0.42}>
              <span className="text-white/65">Für Europa.</span>
            </MaskLine>
          </h2>

          {/* Pinselstrich — wächst von links nach rechts, 0.7s delay */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.63 }}
            className="mt-3 block h-[2px] w-24 origin-left bg-[#ea0100] sm:mt-8 sm:w-28"
          />

          {/* Body — gekürzt */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.56 }}
            className="mt-3 max-w-xl text-[14px] font-light leading-relaxed text-white/85 sm:mt-8 sm:text-base lg:text-[17px]"
          >
            <p>
              Premium-Innentüren aus eigener Manufaktur — für anspruchsvolle
              Bauprojekte in der DACH-Region. Direkt vom Hersteller, kein
              Zwischenhandel, keine Kompromisse.
            </p>
          </motion.div>

          {/* Link zur Über-uns-Seite — Stil wie "Mehr über unseren Prozess" */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease, delay: 0.7 }}
            className="mt-5 sm:mt-7"
          >
            <Link
              href="/ueber-uns"
              className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:text-[#ea0100] sm:text-[13px]"
            >
              <span className="relative">
                Mehr über uns
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-white transition-colors group-hover:bg-[#ea0100]" />
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
            </Link>
          </motion.div>

          {/* Mini Facts — Count-up Animation */}
          <MiniFacts />
        </div>
      </div>
    </section>
  );
}
