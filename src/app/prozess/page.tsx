"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, MapPin } from "lucide-react";
import { useRef } from "react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const ink = "#2C2725";
const red = "#EA0100";

const lineReveal = { hidden: { y: "100%" }, visible: { y: "0%" } };

function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        variants={lineReveal}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.75, ease, delay }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

const drawPath = (inView: boolean, delay: number, duration = 0.7) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
  transition: {
    pathLength: { duration, ease, delay },
    opacity: { duration: 0.16, delay },
  },
});

const fadeIn = (inView: boolean, delay: number) => ({
  initial: { opacity: 0 },
  animate: inView ? { opacity: 1 } : { opacity: 0 },
  transition: { duration: 0.4, ease, delay },
});

const steps = [
  {
    num: "01",
    title: "Entwurf & Beratung",
    text: "Jede Tür beginnt mit Ihrer Vision. Wir nehmen Maße, klären Materialien und Stil — persönlich und unverbindlich.",
  },
  {
    num: "02",
    title: "Materialwahl & Zuschnitt",
    text: "Massivhölzer und Furniere werden nach Maserung und Qualität selektiert. Präziser Zuschnitt auf den Millimeter.",
  },
  {
    num: "03",
    title: "CNC-Fertigung",
    text: "Computergesteuerte Fräsen formen Türblatt, Rahmen und Aussparungen für Beschläge — wiederholbar genau.",
  },
  {
    num: "04",
    title: "Oberflächenveredelung",
    text: "Schleifen, Beizen, Lackieren — in mehreren Schichten von Hand kontrolliert. Hier entsteht die Haptik.",
  },
  {
    num: "05",
    title: "Qualitätskontrolle",
    text: "Jede Tür durchläuft eine finale Sichtprüfung. Kanten, Oberflächen, Beschläge — nichts verlässt die Manufaktur ungeprüft.",
  },
  {
    num: "06",
    title: "Lieferung & Montage",
    text: "Direkt aus Prishtina nach DACH — verpackt, versichert, auf Wunsch mit Montage durch unsere Partner vor Ort.",
  },
];

const materials = [
  {
    title: "Massivholz",
    text: "Eiche, Nussbaum, Esche — sorgfältig getrocknet und nach Maserung sortiert.",
  },
  {
    title: "Furnier",
    text: "Hochwertige Echtholzfurniere auf stabiler Trägerplatte — leichter, formstabiler.",
  },
  {
    title: "Beschläge",
    text: "Premium-Bänder und Griffe von etablierten europäischen Herstellern.",
  },
];

export default function ProzessPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE]">
      <Hero />
      <SketchIntro />
      <ProcessTimeline />
      <Materials />
      <LocationBlock />
      <CTASection />
    </main>
  );
}

function Hero() {
  return (
    <section className="bg-[#7a1020] px-5 pb-16 pt-20 text-white sm:px-8 sm:pb-24 sm:pt-28 md:px-12 lg:px-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-white/55 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
        Zurück zur Startseite
      </Link>

      <div className="mt-10 flex items-center gap-3">
        <span className="h-px w-10 bg-[#EA0100]" />
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/65">
          Unser Prozess
        </span>
      </div>

      <h1 className="mt-5 font-serif text-[2.4rem] font-medium leading-[1.04] tracking-tight sm:text-5xl md:text-[3.5rem]">
        <MaskLine>Vom Strich</MaskLine>
        <MaskLine delay={0.12}>zur fertigen Tür.</MaskLine>
      </h1>

      <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/70 sm:text-base">
        Sechs Schritte. Jeder von Hand kontrolliert. Direkt aus unserer
        Manufaktur in Prishtina — ohne Zwischenhändler, ohne Kompromisse.
      </p>
    </section>
  );
}

function SketchIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative overflow-hidden bg-[#F7F3EE] py-20 sm:py-24 md:py-28">
      {/* Karopapier-Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(44,39,37,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,39,37,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#2C2725]/10" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <div ref={ref} className="mx-auto w-full max-w-3xl">
          <svg
            viewBox="0 0 800 360"
            className="block w-full"
            fill="none"
            stroke={ink}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Skizze einer Werkbank mit Türblatt"
          >
            {/* Boden */}
            <motion.line
              x1="40"
              y1="320"
              x2="760"
              y2="320"
              stroke={ink}
              strokeWidth="1"
              {...drawPath(inView, 0.05, 0.5)}
            />

            {/* Werkbank-Beine */}
            <motion.line
              x1="120"
              y1="320"
              x2="120"
              y2="240"
              stroke={ink}
              strokeWidth="1.6"
              {...drawPath(inView, 0.2, 0.4)}
            />
            <motion.line
              x1="680"
              y1="320"
              x2="680"
              y2="240"
              stroke={ink}
              strokeWidth="1.6"
              {...drawPath(inView, 0.27, 0.4)}
            />
            <motion.line
              x1="300"
              y1="320"
              x2="300"
              y2="240"
              stroke={ink}
              strokeWidth="1"
              strokeOpacity="0.5"
              {...drawPath(inView, 0.34, 0.36)}
            />
            <motion.line
              x1="500"
              y1="320"
              x2="500"
              y2="240"
              stroke={ink}
              strokeWidth="1"
              strokeOpacity="0.5"
              {...drawPath(inView, 0.41, 0.36)}
            />

            {/* Werkbank-Platte */}
            <motion.rect
              x="100"
              y="230"
              width="600"
              height="14"
              stroke={ink}
              strokeWidth="1.6"
              {...drawPath(inView, 0.5, 0.6)}
            />

            {/* Türblatt liegend */}
            <motion.rect
              x="180"
              y="170"
              width="440"
              height="58"
              stroke={ink}
              strokeWidth="1.6"
              {...drawPath(inView, 0.85, 0.7)}
            />

            {/* Paneele auf dem Türblatt */}
            <motion.rect
              x="210"
              y="184"
              width="170"
              height="32"
              stroke={ink}
              strokeWidth="1"
              strokeOpacity="0.55"
              {...drawPath(inView, 1.4, 0.4)}
            />
            <motion.rect
              x="420"
              y="184"
              width="170"
              height="32"
              stroke={ink}
              strokeWidth="1"
              strokeOpacity="0.55"
              {...drawPath(inView, 1.55, 0.4)}
            />

            {/* Hobel / Werkzeug auf der Bank */}
            <motion.path
              d="M 130 220 L 175 220 L 170 210 L 135 210 Z"
              stroke={ink}
              strokeWidth="1.4"
              {...drawPath(inView, 1.8, 0.4)}
            />
            <motion.line
              x1="150"
              y1="220"
              x2="150"
              y2="200"
              stroke={ink}
              strokeWidth="1.2"
              {...drawPath(inView, 2.0, 0.25)}
            />

            {/* Massangabe oben */}
            <motion.g {...fadeIn(inView, 2.1)}>
              <line
                x1="180"
                y1="170"
                x2="180"
                y2="140"
                stroke={red}
                strokeWidth="1"
                strokeOpacity="0.6"
              />
              <line
                x1="620"
                y1="170"
                x2="620"
                y2="140"
                stroke={red}
                strokeWidth="1"
                strokeOpacity="0.6"
              />
              <motion.line
                x1="180"
                y1="148"
                x2="620"
                y2="148"
                stroke={red}
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.6, ease, delay: 2.15 }}
              />
              <motion.g {...fadeIn(inView, 2.45)}>
                <rect x="365" y="134" width="70" height="22" fill="#F7F3EE" />
                <text
                  x="400"
                  y="150"
                  textAnchor="middle"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize="13"
                  fill={red}
                  letterSpacing="0.05em"
                >
                  2100 mm
                </text>
              </motion.g>
            </motion.g>

            {/* Labels */}
            <motion.g {...fadeIn(inView, 2.55)}>
              <text
                x="40"
                y="350"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontSize="10"
                fill={ink}
                fillOpacity="0.5"
                letterSpacing="0.18em"
              >
                TREVENTI · WERKBANK · PRISHTINA
              </text>
              <text
                x="760"
                y="350"
                textAnchor="end"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontSize="10"
                fill={ink}
                fillOpacity="0.5"
                letterSpacing="0.18em"
              >
                M 1:30
              </text>
            </motion.g>
          </svg>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-10 max-w-xl text-center text-[14px] font-light leading-relaxed text-[#2C2725]/70 sm:mt-12 sm:text-[15px]"
        >
          Was als technische Zeichnung beginnt, durchläuft sechs handwerkliche
          Stufen — bis es als fertige Tür Ihre Räume verbindet.
        </motion.p>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section className="bg-[#F7F3EE] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-14 text-center sm:mb-20">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#EA0100]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Sechs Stufen
            </span>
            <span className="h-px w-8 bg-[#EA0100]" />
          </div>
          <h2 className="font-serif text-[2rem] font-medium leading-[1.05] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem]">
            So entsteht Ihre Tür.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-[#2C2725]/60 sm:mt-6 sm:text-base">
            Jeder Schritt von uns kontrolliert — vom ersten Strich bis zur
            Montage.
          </p>
        </div>

        <ol className="relative space-y-12 sm:space-y-16">
          {/* Vertikale Linie */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-3 h-[calc(100%-1.5rem)] w-px bg-[#2C2725]/15 sm:left-[32px]"
          />

          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: { num: string; title: string; text: string };
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease, delay: index * 0.05 }}
      className="relative flex gap-6 sm:gap-8"
    >
      {/* Marker */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, ease, delay: index * 0.05 + 0.1 }}
          className="relative grid h-[54px] w-[54px] place-items-center rounded-full border border-[#EA0100]/30 bg-[#F7F3EE] sm:h-16 sm:w-16"
        >
          <span className="font-serif text-[15px] font-medium text-[#EA0100] sm:text-base">
            {step.num}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-3 sm:pt-4">
        <h3 className="font-serif text-[1.4rem] font-medium leading-tight tracking-tight text-[#2C2725] sm:text-[1.7rem]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-xl text-[14px] font-light leading-relaxed text-[#2C2725]/65 sm:mt-4 sm:text-[15px]">
          {step.text}
        </p>
      </div>
    </motion.li>
  );
}

function Materials() {
  return (
    <section className="border-y border-[#2C2725]/10 bg-[#EFEAE2] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
        <div className="mb-14 max-w-2xl sm:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Materialien
            </span>
          </div>
          <h2 className="font-serif text-[1.8rem] font-medium leading-[1.05] tracking-tight text-[#2C2725] sm:text-[2.4rem] md:text-[2.8rem]">
            Was wir verarbeiten.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {materials.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.56, ease, delay: i * 0.08 }}
              className="group relative rounded-sm bg-white px-6 py-7 transition-all duration-300 hover:shadow-[0_2px_4px_rgba(44,39,37,0.04),0_16px_40px_rgba(44,39,37,0.1)] sm:px-7 sm:py-8"
            >
              <span className="absolute left-0 top-0 h-px w-10 bg-[#EA0100] transition-all duration-500 group-hover:w-16" />
              <h3 className="mt-3 font-serif text-[1.3rem] font-medium tracking-tight text-[#2C2725] sm:text-[1.5rem]">
                {m.title}
              </h3>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-[#2C2725]/60 sm:text-[14px]">
                {m.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationBlock() {
  return (
    <section className="bg-[#F7F3EE] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.56, ease }}
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <MapPin className="h-4 w-4 text-[#EA0100]" strokeWidth={1.6} />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Manufaktur
            </span>
          </div>

          <h2 className="font-serif text-[1.8rem] font-medium leading-[1.1] tracking-tight text-[#2C2725] sm:text-[2.2rem] md:text-[2.5rem]">
            Gefertigt in Prishtina.
            <br />
            <span className="text-[#2C2725]/65">Geliefert nach DACH.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[14px] font-light leading-relaxed text-[#2C2725]/65 sm:text-[15px]">
            Unsere eigene Produktion im Kosovo ermöglicht es uns, jeden
            Schritt persönlich zu verantworten — und unsere Preise direkt vom
            Hersteller anzubieten, ohne Zwischenhandel.
          </p>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2C2725]/45 sm:text-[12px]">
            Rrafshi i Kosovës · 10000 Prishtina · Kosova
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-[#F7F3EE] pb-20 sm:pb-24 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.49, ease }}
        className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3 px-5 sm:flex-row sm:gap-4 sm:px-8"
      >
        <Link
          href="/kontakt"
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-[#2C2725]/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#2C2725]/80 transition-all duration-300 hover:border-[#2C2725] hover:text-[#2C2725] sm:w-auto sm:px-9"
        >
          Anfrage stellen
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.8}
          />
        </Link>

        <a
          href="mailto:info@treventi.com"
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-[#2C2725]/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#2C2725]/80 transition-all duration-300 hover:border-[#2C2725] hover:text-[#2C2725] sm:w-auto sm:px-9"
        >
          <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
          info@treventi.com
        </a>
      </motion.div>
    </section>
  );
}
