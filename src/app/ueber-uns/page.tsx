"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

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

const milestones = [
  {
    year: "2014",
    title: "Gegründet in Prishtina",
    text: "Treventi entsteht — als Antwort auf das, was im Markt fehlt: kompromisslose Qualität, persönlich gefertigt.",
  },
  {
    year: "2016",
    title: "Eigene Produktion",
    text: "Vom reinen Händler zum Hersteller. Wir bauen eigene Produktionskapazitäten auf, um jeden Schritt selbst zu verantworten.",
  },
  {
    year: "2020",
    title: "DACH-Expansion",
    text: "Erste Großprojekte in Deutschland, Österreich und der Schweiz. Architekten und Bauträger werden zu langfristigen Partnern.",
  },
  {
    year: "Heute",
    title: "Premium für Profis",
    text: "Über 12 Jahre Manufaktur-Erfahrung — direkt vom Hersteller, ohne Zwischenhandel, in DACH-weiter Auslieferung.",
  },
];

const values = [
  {
    title: "Handwerk",
    text: "Jede Tür wird in unserer eigenen Manufaktur gefertigt — vom Holzeinkauf bis zur finalen Qualitätskontrolle.",
  },
  {
    title: "Direkt",
    text: "Kein Zwischenhandel, keine versteckten Aufschläge. Sie sprechen direkt mit dem Hersteller.",
  },
  {
    title: "Verlässlich",
    text: "Kurze Lieferzeiten, klare Kommunikation, persönliche Betreuung — vom ersten Gespräch bis zur Montage.",
  },
];

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE]">
      {/* TOP BAR */}
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8 md:px-12 lg:px-16 xl:px-20">
        <Link href="/" aria-label="Treventi Startseite" className="block">
          <img
            src="/treventi-logo-black.svg"
            alt="Treventi"
            className="h-6 w-auto sm:h-7"
          />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#2C2725]/55 transition-colors hover:text-[#2C2725] sm:text-[11px]"
        >
          <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
          <span className="hidden sm:inline">Zurück zur Startseite</span>
          <span className="sm:hidden">Zurück</span>
        </Link>
      </div>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 md:px-12 md:pb-32 md:pt-24 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[#EA0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
            Über Treventi
          </span>
        </motion.div>

        <h1 className="mt-6 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-tight text-[#2C2725] sm:text-[3.4rem] md:text-[4.5rem] lg:text-[5.5rem]">
          <MaskLine delay={0.2}>Lernen Sie</MaskLine>
          <MaskLine delay={0.35}>
            <span className="text-[#2C2725]/65">uns kennen.</span>
          </MaskLine>
        </h1>

        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mt-8 block h-[2px] w-24 origin-left bg-[#EA0100] sm:w-28"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.65 }}
          className="mt-8 max-w-2xl text-[15px] font-light leading-relaxed text-[#2C2725]/75 sm:mt-10 sm:text-base md:text-[17px] lg:text-lg"
        >
          Treventi Group GmbH — Ihr Tor zu hochwertigen Innentüren. Seit 2014
          fertigen wir in unserer eigenen Manufaktur in Prishtina Türen, die
          mehr sind als ein Übergang: Sie sind Teil der Architektur eines
          Raums.
        </motion.p>
      </section>

      {/* STORY-SEKTION mit Bild */}
      <section className="relative bg-[#7a1020] py-20 text-white sm:py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
            {/* Bild links */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease }}
              className="md:col-span-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm sm:aspect-[5/6]">
                <Image
                  src="/hero/treventi-23143242342342-1.jpg"
                  alt="Treventi Manufaktur — Handwerker bei der Qualitätskontrolle"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#5c0c18]/40" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease, delay: 0.4 }}
                className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55 sm:text-xs"
              >
                <span className="h-px w-8 bg-white/40" />
                <span>Manufaktur · Prishtina</span>
              </motion.div>
            </motion.div>

            {/* Text rechts */}
            <div className="md:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-10 bg-[#EA0100]" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 sm:text-xs">
                  Unsere Geschichte
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: 0.2 }}
                className="mt-5 font-serif text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-[2.6rem] md:text-[3.2rem]"
              >
                Vom Händler
                <br />
                <span className="text-white/70">zum Hersteller.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: 0.3 }}
                className="mt-7 max-w-xl space-y-5 text-[14px] font-light leading-relaxed text-white/85 sm:mt-9 sm:text-base lg:text-[17px]"
              >
                <p>
                  Als wir 2014 starteten, war uns klar: Reine Lieferketten-
                  verwaltung reicht nicht. Um wirklich kompromisslose
                  Qualität zu liefern, müssen wir jeden Schritt selbst
                  verantworten — vom Holzeinkauf bis zur letzten Schraube.
                </p>
                <p className="text-white/70">
                  Heute fertigen wir in einer eigenen Manufaktur in
                  Prishtina. Modernste Technologie trifft auf
                  handwerkliche Präzision. Ein eingespieltes Team, das mit
                  jedem Projekt mitwächst.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WERTE / PHILOSOPHIE */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 md:px-12 md:py-32 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#EA0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
            Was uns ausmacht
          </span>
          <span className="h-px w-8 bg-[#EA0100]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mx-auto mt-5 max-w-3xl text-center font-serif text-[2rem] font-medium leading-[1.08] tracking-tight text-[#2C2725] sm:text-[2.4rem] md:text-[2.9rem]"
        >
          Drei Prinzipien, eine Haltung.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-3 md:gap-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.1 }}
              className="border-t border-[#2C2725]/15 pt-7"
            >
              <span className="font-serif text-[2.4rem] font-medium leading-none tracking-tight text-[#EA0100]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-[1.5rem] font-medium leading-tight tracking-tight text-[#2C2725] sm:text-[1.7rem]">
                {v.title}
              </h3>
              <p className="mt-3 max-w-sm text-[14px] font-light leading-relaxed text-[#2C2725]/70 sm:text-[15px]">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MEILENSTEINE / TIMELINE */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 md:px-12 md:pb-32 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[#EA0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
            Meilensteine
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mt-5 max-w-2xl font-serif text-[2rem] font-medium leading-[1.08] tracking-tight text-[#2C2725] sm:text-[2.4rem] md:text-[2.9rem]"
        >
          Der Weg, der uns hier&shy;her gebracht hat.
        </motion.h2>

        <ol className="mt-14 space-y-10 sm:mt-16 sm:space-y-12">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.08 }}
              className="grid grid-cols-1 gap-3 border-b border-[#2C2725]/10 pb-10 last:border-0 last:pb-0 sm:grid-cols-12 sm:gap-8 sm:pb-12"
            >
              <div className="sm:col-span-3">
                <span className="font-serif text-[1.8rem] font-medium leading-none tracking-tight text-[#EA0100] sm:text-[2.2rem]">
                  {m.year}
                </span>
              </div>
              <div className="sm:col-span-9">
                <h3 className="font-serif text-[1.35rem] font-medium leading-tight tracking-tight text-[#2C2725] sm:text-[1.6rem]">
                  {m.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-[14px] font-light leading-relaxed text-[#2C2725]/70 sm:text-[15px] lg:text-[17px]">
                  {m.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* VIDEO-PLATZHALTER */}
      <section className="bg-[#2C2725] py-20 text-white sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Einblick in die Produktion
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-5 max-w-3xl font-serif text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-[2.4rem] md:text-[2.9rem]"
          >
            So entsteht eine Treventi-Tür.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mt-5 max-w-2xl text-[14px] font-light leading-relaxed text-white/70 sm:text-[15px] lg:text-[17px]"
          >
            Ein kurzer Film durch unsere Manufaktur — vom Holzeinkauf, über
            die Verarbeitung bis zur finalen Montage.
          </motion.p>

          {/* Video-Platzhalter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="relative mt-12 aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-[#1a1a1a] sm:mt-16"
          >
            {/* Subtiles Karopapier-Pattern als Platzhalter-Look */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Radial vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,1,0,0.10)_0%,_transparent_60%)]"
            />

            {/* Play-Button + Hinweis */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm sm:h-20 sm:w-20">
                <Play className="h-6 w-6 translate-x-[2px] text-white/80 sm:h-7 sm:w-7" strokeWidth={1.5} fill="currentColor" />
              </div>
              <p className="mt-6 font-serif text-[1.2rem] font-medium leading-tight tracking-tight text-white/85 sm:text-[1.4rem]">
                Video kommt in Kürze
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/40 sm:text-[12px]">
                Treventi · Manufaktur · Prishtina
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#EA0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
            Persönliche Beratung
          </span>
          <span className="h-px w-8 bg-[#EA0100]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mt-5 font-serif text-[1.8rem] font-medium leading-[1.08] tracking-tight text-[#2C2725] sm:text-[2.2rem] md:text-[2.6rem]"
        >
          Lust auf ein Gespräch?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mx-auto mt-5 max-w-md text-[14px] font-light leading-relaxed text-[#2C2725]/65 sm:text-base"
        >
          Wir freuen uns über Ihre Anfrage — egal ob konkretes Projekt oder
          erste Idee. Direkt vom Hersteller, ohne Umwege.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:mt-10"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2C2725] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#EA0100] sm:text-[12px]"
          >
            Kontakt aufnehmen
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </Link>

          <Link
            href="/#kollektion"
            className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#2C2725]/70 transition-colors hover:text-[#2C2725] sm:text-[12px]"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
              strokeWidth={1.6}
            />
            Kollektion ansehen
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
