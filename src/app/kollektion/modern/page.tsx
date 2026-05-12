"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const carousel = [
  {
    src: "/kollektion/modern/01.jpg",
    title: "Schwarz Matt — Eichenholz",
    sub: "Statement-Tür auf flächiger Holzwand. Reduziert. Kompromisslos.",
  },
  {
    src: "/kollektion/modern/02.jpg",
    title: "Walnuss — Schwarzer Rahmen",
    sub: "Warmes Echtholz, präzise eingefasst. Für Räume mit Charakter.",
  },
  {
    src: "/kollektion/modern/03.jpg",
    title: "Beton-Grau — Minimal",
    sub: "Ruhige Fläche, monochromer Rahmen. Ideal für Schlaf- und Rückzugsräume.",
  },
  {
    src: "/kollektion/modern/04.jpg",
    title: "Weiß — Horizontale Linien",
    sub: "Klare Akzente, helle Oberfläche. Perfekt für Bad und Galerie-Bereiche.",
  },
];

const features = [
  "Maße bis zum Millimeter individuell",
  "Echtholz-Furnier, Lack oder Matt-Oberflächen",
  "Verdeckte Beschläge & flächenbündige Optik",
];

const useCases = [
  { label: "Neubau", text: "Moderne Architektur, offene Grundrisse." },
  { label: "Penthouse & Loft", text: "Großzügige Räume, reduzierte Optik." },
  { label: "Hotel & Boutique", text: "Konsistente Wiederholung im Premium-Segment." },
  { label: "Architekten-Projekte", text: "Maßanfertigungen für individuelle Konzepte." },
];

export default function ModernPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goto = (newIndex: number) => {
    const next = (newIndex + carousel.length) % carousel.length;
    setDirection(next > index || (index === carousel.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  };

  const current = carousel[index];

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
          href="/#kollektion"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#2C2725]/55 transition-colors hover:text-[#2C2725] sm:text-[11px]"
        >
          <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
          <span className="hidden sm:inline">Zurück zur Kollektion</span>
          <span className="sm:hidden">Zurück</span>
        </Link>
      </div>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14 md:px-12 md:pt-20 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Linke Hälfte — Text */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#EA0100]" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
                Kategorie 01
              </span>
            </motion.div>

            <h1 className="mt-5 overflow-hidden font-serif text-[2.6rem] font-medium leading-[1.02] tracking-tight text-[#2C2725] sm:text-[3.2rem] md:text-[3.4rem] lg:text-[4rem]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="block"
              >
                Innentüren
              </motion.span>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease, delay: 0.35 }}
                className="block text-[#2C2725]/65"
              >
                Modern.
              </motion.span>
            </h1>

            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-6 block h-[2px] w-20 origin-left bg-[#EA0100] sm:mt-8 sm:w-24"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.6 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-[#2C2725]/75 sm:mt-8 sm:text-base lg:text-[17px]"
            >
              Klare Linien, ruhige Flächen, reduzierte Form. Unsere modernen
              Innentüren fügen sich nahtlos in zeitgenössische Architektur ein —
              ohne sich aufzudrängen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10"
            >
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2725] transition-colors hover:text-[#EA0100] sm:text-[13px]"
              >
                <span className="relative">
                  Anfrage stellen
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-[#2C2725] transition-colors group-hover:bg-[#EA0100]" />
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </motion.div>
          </div>

          {/* Rechte Hälfte — Hero-Bild */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 1.04 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.25 }}
            className="relative md:col-span-7"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[0_4px_12px_rgba(44,39,37,0.06),0_20px_60px_rgba(44,39,37,0.12)] sm:aspect-[5/6] md:aspect-[4/5]">
              <Image
                src="/kollektion/modern/hero.jpg"
                alt="Moderne Innentür mit weißer Fläche und Holzrahmen in heller Diele"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.0 }}
              className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#2C2725]/55 sm:mt-5 sm:text-xs"
            >
              <span className="h-px w-8 bg-[#2C2725]/40" />
              <span>Modell · Lineare Akzente</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ERKLÄR-SEKTION */}
      <section className="relative mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8 md:mt-40 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Linke Spalte — Text */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#EA0100]" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
                Charakter
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="mt-5 font-serif text-[1.9rem] font-medium leading-[1.08] tracking-tight text-[#2C2725] sm:text-[2.3rem] md:text-[2.6rem]"
            >
              Architektur, die nicht
              <br />
              <span className="text-[#2C2725]/70">unterbricht.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mt-7 max-w-xl space-y-4 text-[14px] font-light leading-relaxed text-[#2C2725]/75 sm:text-[15px] lg:text-[17px]"
            >
              <p>
                Eine moderne Tür ist mehr als ein Übergang — sie ist Teil der
                Raumarchitektur. Reduzierte Profile, präzise Kanten,
                flächenbündige Übergänge: Jedes Detail ist darauf ausgelegt,
                den Raum ruhig wirken zu lassen.
              </p>
              <p className="text-[#2C2725]/60">
                Ob als matte Farbfläche, warmes Echtholz oder als Statement in
                Schwarz — die modernen Linien von Treventi setzen klare
                Akzente, ohne den Gesamtraum zu dominieren.
              </p>
            </motion.div>

            {/* Bullets */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: 0.35 }}
              className="mt-9 space-y-3.5 sm:mt-12"
            >
              {features.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease, delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3 text-[14px] font-light text-[#2C2725]/85 sm:text-[15px]"
                >
                  <span className="mt-[3px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#EA0100]/40">
                    <Check className="h-2.5 w-2.5 text-[#EA0100]" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Rechte Spalte — Einsatzbereiche */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="rounded-sm border border-[#2C2725]/10 bg-white px-7 py-8 shadow-[0_2px_4px_rgba(44,39,37,0.03),0_12px_32px_rgba(44,39,37,0.06)] sm:px-9 sm:py-10"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#EA0100]" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100]">
                  Einsatzbereiche
                </span>
              </div>
              <p className="mt-4 font-serif text-[1.3rem] font-medium leading-tight tracking-tight text-[#2C2725] sm:text-[1.5rem]">
                Wo unsere modernen Türen
                <br />
                ihre Stärke ausspielen.
              </p>

              <ul className="mt-7 space-y-5 sm:mt-8">
                {useCases.map((u, i) => (
                  <motion.li
                    key={u.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.07 }}
                    className="border-b border-[#2C2725]/10 pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#EA0100]">
                      {u.label}
                    </p>
                    <p className="mt-1.5 text-[13px] font-light leading-relaxed text-[#2C2725]/70 sm:text-sm">
                      {u.text}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KARUSSELL */}
      <section className="relative mt-24 overflow-hidden bg-[#2C2725] py-20 text-white sm:mt-32 sm:py-28 md:mt-40 md:py-32">
        <div className="mx-auto mb-12 max-w-7xl px-5 sm:mb-16 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Auswahl der Linie
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-5 max-w-3xl font-serif text-[1.9rem] font-medium leading-[1.08] tracking-tight sm:text-[2.4rem] md:text-[2.8rem]"
          >
            Vier Charaktere. Eine Sprache.
          </motion.h2>
        </div>

        {/* Slider */}
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-black/40 sm:aspect-[16/10] md:aspect-[16/9]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.55, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {/* Bottom-Overlay für Lesbarkeit */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
                  <motion.p
                    key={`title-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.1 }}
                    className="font-serif text-[1.3rem] font-medium leading-tight tracking-tight text-white sm:text-[1.7rem] md:text-[2rem]"
                  >
                    {current.title}
                  </motion.p>
                  <motion.p
                    key={`sub-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.18 }}
                    className="mt-2 max-w-md text-[13px] font-light leading-relaxed text-white/75 sm:text-sm"
                  >
                    {current.sub}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pfeil-Buttons */}
            <button
              type="button"
              onClick={() => goto(index - 1)}
              aria-label="Vorheriges Bild"
              className="group absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2C2725] shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-white active:scale-95 sm:left-6 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => goto(index + 1)}
              aria-label="Nächstes Bild"
              className="group absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2C2725] shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-white active:scale-95 sm:right-6 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {carousel.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Bild ${i + 1} anzeigen`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[#EA0100]" : "w-1.5 bg-white/30 hover:bg-white/55"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="mt-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
            {String(index + 1).padStart(2, "0")} <span className="mx-2 text-white/25">/</span> {String(carousel.length).padStart(2, "0")}
          </div>
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
          Interesse an dieser Linie?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mx-auto mt-5 max-w-md text-[14px] font-light leading-relaxed text-[#2C2725]/65 sm:text-base"
        >
          Wir beraten Sie persönlich zu Maßen, Oberflächen und Beschlägen —
          direkt vom Hersteller, ohne Zwischenhändler.
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
            Anfrage stellen
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
            Andere Kollektionen
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
