"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

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
        transition={{ duration: 1.0, ease, delay }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
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
      className="relative isolate w-full overflow-hidden bg-[#7a1020] py-24 text-white sm:py-28 md:py-36"
    >
      {/* Subtle radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(234,1,0,0.08)_0%,_transparent_55%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:gap-12 sm:px-8 md:grid-cols-12 md:gap-16 md:px-12 lg:px-16 xl:px-20">
        {/* Image Column — fadet von links rein, Parallax beim Scrollen, Hover-Zoom + Glow */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease }}
          className="relative md:col-span-6 lg:col-span-6"
        >
          <div className="group relative aspect-[4/5] overflow-hidden rounded-sm transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_60px_rgba(234,1,0,0.38)] sm:aspect-[5/6] md:aspect-[4/5]">
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
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55 sm:mt-6 sm:text-xs"
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
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mb-6 flex items-center gap-3 sm:mb-8"
          >
            <span className="h-px w-10 bg-[#ea0100] sm:w-12" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 sm:text-xs">
              Über Treventi
            </span>
          </motion.div>

          {/* Headline — 3 Zeilen, Stagger 0.2 / 0.4 / 0.6 */}
          <h2 className="font-serif text-[2.25rem] font-medium leading-[1.04] tracking-tight text-white sm:text-5xl md:text-[3.4rem] lg:text-[4rem]">
            <MaskLine delay={0.2}>Seit 2014.</MaskLine>
            <MaskLine delay={0.4}>Aus Kosovo.</MaskLine>
            <MaskLine delay={0.6}>
              <span className="text-white/65">Für Europa.</span>
            </MaskLine>
          </h2>

          {/* Pinselstrich — wächst von links nach rechts, 0.7s delay */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease, delay: 0.9 }}
            className="mt-7 block h-[2px] w-24 origin-left bg-[#ea0100] sm:mt-8 sm:w-28"
          />

          {/* Body — 0.8s */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease, delay: 0.8 }}
            className="mt-7 max-w-xl space-y-5 text-[15px] font-light leading-relaxed text-white/85 sm:mt-8 sm:text-base lg:text-[17px]"
          >
            <p>
              In unserer eigenen Manufaktur fertigen wir Premium-Innentüren
              für anspruchsvolle Bauprojekte in Deutschland, Österreich und
              der Schweiz — vom Holzeinkauf über die Verarbeitung bis zur
              finalen Qualitätskontrolle.
            </p>
            <p className="text-white/70">
              Architekturbüros und Bauträger schätzen unsere kompromisslose
              Verarbeitung, kurze Lieferzeiten und die persönliche Betreuung
              — direkt vom Hersteller. Kein Zwischenhandel, keine versteckten
              Aufschläge, keine Kompromisse.
            </p>
          </motion.div>

          {/* Mini Facts — 1.0s */}
          <motion.dl
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease, delay: 1.0 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8 sm:mt-12 sm:gap-8 sm:pt-10"
          >
            {[
              { value: "12+", label: "Jahre Manufaktur" },
              { value: "100%", label: "Made in Europe" },
              { value: "0", label: "Zwischenhändler" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-serif text-[1.75rem] font-medium leading-none tracking-tight text-white sm:text-[2rem] md:text-[2.25rem]">
                  {item.value}
                </dt>
                <dd className="text-[10px] uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
                  {item.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
