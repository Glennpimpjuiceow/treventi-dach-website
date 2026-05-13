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
    image: "/kollektion/categories/modern.jpg",
    href: "/kollektion/modern",
  },
  {
    number: "02",
    title: "Innentüren Klassisch",
    sub: "9 Modelle verfügbar",
    image: "/kollektion/categories/klassisch.jpg",
    href: null,
  },
  {
    number: "03",
    title: "Schiebetüren",
    sub: "8 Modelle verfügbar",
    image: "/kollektion/categories/schiebe.jpg",
    href: null,
  },
  {
    number: "04",
    title: "Spezialanfertigungen",
    sub: "Auf Anfrage",
    image: "/kollektion/categories/spezial.jpg",
    sketch: true,
    href: "/spezialanfertigungen",
  },
];

function DoorSketchPreview() {
  const ink = "#2C2725";
  const red = "#EA0100";
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#F7F3EE]">
      {/* Karopapier-Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(44,39,37,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,39,37,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Eckmarken */}
      {[
        "top-3 left-3",
        "top-3 right-3 rotate-90",
        "bottom-3 right-3 rotate-180",
        "bottom-3 left-3 -rotate-90",
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute h-3 w-3 ${pos}`}
        >
          <span className="absolute left-0 top-0 h-px w-3 bg-[#2C2725]/30" />
          <span className="absolute left-0 top-0 h-3 w-px bg-[#2C2725]/30" />
        </span>
      ))}

      {/* Tür-Skizze */}
      <svg
        viewBox="0 0 200 260"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-10 h-[78%] w-auto"
        fill="none"
        stroke={ink}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Skizze einer Tür"
      >
        {/* Boden-Linie */}
        <line x1="20" y1="240" x2="180" y2="240" stroke={ink} strokeOpacity="0.45" strokeWidth="0.8" />

        {/* Türrahmen außen */}
        <rect x="55" y="35" width="90" height="205" stroke={ink} strokeWidth="1.4" />
        {/* Türrahmen innen (Falz) */}
        <rect x="60" y="40" width="80" height="200" stroke={ink} strokeOpacity="0.5" strokeWidth="0.7" />
        {/* Türblatt */}
        <rect x="65" y="45" width="70" height="195" stroke={ink} strokeWidth="1.2" />

        {/* Paneel oben */}
        <rect x="73" y="58" width="54" height="70" stroke={ink} strokeOpacity="0.7" strokeWidth="0.9" />
        {/* Paneel unten */}
        <rect x="73" y="142" width="54" height="88" stroke={ink} strokeOpacity="0.7" strokeWidth="0.9" />

        {/* Türgriff — Rosette */}
        <circle cx="70" cy="142" r="2" stroke={ink} strokeWidth="1" />
        {/* Hebel */}
        <line x1="68" y1="142" x2="60" y2="142" stroke={ink} strokeWidth="1.4" />

        {/* Scharniere */}
        <rect x="131" y="68" width="3" height="12" stroke={ink} strokeOpacity="0.7" strokeWidth="0.8" />
        <rect x="131" y="200" width="3" height="12" stroke={ink} strokeOpacity="0.7" strokeWidth="0.8" />

        {/* Maßangabe horizontal (Breite) */}
        <line x1="55" y1="35" x2="55" y2="22" stroke={red} strokeOpacity="0.7" strokeWidth="0.7" />
        <line x1="145" y1="35" x2="145" y2="22" stroke={red} strokeOpacity="0.7" strokeWidth="0.7" />
        <line x1="55" y1="26" x2="145" y2="26" stroke={red} strokeWidth="0.9" />
        <polyline points="58,23 55,26 58,29" stroke={red} strokeWidth="0.9" fill="none" />
        <polyline points="142,23 145,26 142,29" stroke={red} strokeWidth="0.9" fill="none" />
        <rect x="85" y="20" width="30" height="12" fill="#F7F3EE" />
        <text
          x="100"
          y="29"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="7"
          fill={red}
          letterSpacing="0.06em"
          stroke="none"
        >
          860 mm
        </text>

        {/* Mini-Label unten */}
        <text
          x="55"
          y="252"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="5"
          fill={ink}
          fillOpacity="0.55"
          letterSpacing="0.18em"
          stroke="none"
        >
          TREVENTI · CUSTOM
        </text>
        <text
          x="145"
          y="252"
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="5"
          fill={ink}
          fillOpacity="0.55"
          letterSpacing="0.18em"
          stroke="none"
        >
          M 1:20
        </text>
      </svg>
    </div>
  );
}

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
          transition={{ duration: 0.49, ease }}
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
          transition={{ duration: 0.6, ease, delay: 0.042 }}
          className="font-serif text-[2rem] font-medium leading-[1.05] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem] lg:text-[3.4rem]"
        >
          Türen für jeden Anspruch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.49, ease, delay: 0.126 }}
          className="mt-5 text-sm font-light leading-relaxed text-[#2C2725]/60 sm:mt-6 sm:text-base"
        >
          Vier Linien &mdash; eine Philosophie.
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
            transition={{ duration: 0.6, ease, delay: i * 0.105 }}
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
              {cat.sketch ? (
                <div className="absolute inset-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                  <DoorSketchPreview />
                </div>
              ) : (
                <div className="absolute inset-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.1]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
              )}
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
