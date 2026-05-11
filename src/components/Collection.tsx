"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    number: "01",
    title: "Innentüren Modern",
    sub: "12 Modelle verfügbar",
    image: "/doors/01-dust-grey-meta-retta.jpg",
    href: null,
  },
  {
    number: "02",
    title: "Innentüren Klassisch",
    sub: "9 Modelle verfügbar",
    image: "/doors/06-bakersfield-walnut.jpg",
    href: null,
  },
  {
    number: "03",
    title: "Glastüren",
    sub: "6 Modelle verfügbar",
    image: "/doors/11-eins-mit-der-natur-1.jpg",
    href: null,
  },
  {
    number: "04",
    title: "Schiebetüren",
    sub: "8 Modelle verfügbar",
    image: "/doors/02-strada-snow-white.jpg",
    href: null,
  },
  {
    number: "05",
    title: "Eingangstüren",
    sub: "5 Modelle verfügbar",
    image: "/doors/07-pamplona.jpg",
    href: null,
  },
  {
    number: "06",
    title: "Spezialanfertigungen",
    sub: "Auf Anfrage",
    image: "/doors/10-deggendreof-olive-green.jpg",
    href: "/spezialanfertigungen",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Collection() {
  const router = useRouter();
  return (
    <section
      id="kollektion"
      className="relative w-full overflow-hidden bg-[#F7F3EE] py-28 sm:py-32 md:py-36"
    >
      {/* Header */}
      <div className="mx-auto mb-16 max-w-4xl px-5 text-center sm:mb-20 sm:px-8 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#EA0100]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
            Unsere Kollektion
          </span>
          <span className="h-px w-8 bg-[#EA0100]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.06 }}
          className="font-serif text-[2rem] font-medium leading-[1.05] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem] lg:text-[3.4rem]"
        >
          Türen für jeden Anspruch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          className="mt-5 text-sm font-light leading-relaxed text-[#2C2725]/60 sm:mt-6 sm:text-base"
        >
          Sechs Linien &mdash; eine Philosophie.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 sm:gap-9 sm:px-8 md:px-12 lg:grid-cols-3 lg:gap-10 lg:px-16 xl:px-20">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.number}
            type="button"
            onClick={() => { if (cat.href) router.push(cat.href); }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease, delay: i * 0.15 }}
            className="group relative flex w-full flex-col overflow-hidden rounded-sm bg-white text-left shadow-[0_1px_2px_rgba(44,39,37,0.04),0_8px_24px_rgba(44,39,37,0.06)] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_4px_8px_rgba(44,39,37,0.06),0_24px_48px_rgba(44,39,37,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA0100]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F3EE]"
            aria-label={`Kategorie ${cat.number} – ${cat.title}`}
          >
            {/* Roter Akzent-Strich links — wächst beim Hover von 0 auf 100% Höhe */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 block h-full w-[3px] origin-top scale-y-0 bg-[#EA0100] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />

            {/* Image — aspect 3:2 mobile, 4:5 desktop */}
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#EFEAE3] sm:aspect-[4/5]">
              <div className="absolute inset-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.1]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Text-Bereich auf weißem Background */}
            <div className="relative flex flex-1 items-end justify-between gap-4 px-5 py-5 sm:px-8 sm:py-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
                  Kategorie {cat.number}
                </span>
                <h3 className="mt-2.5 font-serif text-[1.5rem] font-medium leading-tight tracking-tight text-[#2C2725] sm:text-[1.7rem] md:text-[1.85rem]">
                  {cat.title}
                </h3>
                <p className="mt-1.5 text-xs font-light text-[#888888] sm:text-sm">
                  {cat.sub}
                </p>
              </div>

              {/* Pfeil-Icon — bewegt sich diagonal nach oben rechts */}
              <span
                aria-hidden="true"
                className="flex flex-shrink-0 items-center justify-center text-[#2C2725] transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#EA0100]"
              >
                <ArrowUpRight
                  className="h-[26px] w-[26px] sm:h-7 sm:w-7"
                  strokeWidth={1.3}
                />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
