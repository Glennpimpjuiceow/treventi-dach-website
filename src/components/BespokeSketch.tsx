"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const ink = "#2C2725";
const red = "#EA0100";

const drawPath = (inView: boolean, delay: number, duration = 0.72) => ({
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

export default function BespokeSketch() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const sketchInView = useInView(sketchRef, { once: true, amount: 0.1 });

  return (
    <section
      id="masgeschneidert"
      className="relative w-full overflow-hidden bg-[#F7F3EE] py-24 sm:py-28 md:py-32"
    >
      {/* Subtiles Karopapier-Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(44,39,37,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,39,37,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hairline oben/unten für Architekten-Vibe */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#2C2725]/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#2C2725]/10" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:gap-16 sm:px-8 md:grid-cols-12 md:gap-12 md:px-12 lg:gap-16 lg:px-16 xl:px-20">
        {/* Links — SVG Sketch */}
        <div className="md:col-span-7">
          <div ref={sketchRef} className="relative mx-auto w-full max-w-[560px]">
            {/* Eckmarken — Architekten-Blueprint Look */}
            <CornerMarks />

            <svg
              viewBox="0 0 600 760"
              className="block w-full"
              fill="none"
              stroke={ink}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Skizze einer maßgefertigten Tür"
            >
              {/* Boden-Linie */}
              <motion.line
                x1="40"
                y1="700"
                x2="560"
                y2="700"
                stroke={ink}
                strokeWidth="1"
                {...drawPath(sketchInView, 0.04, 0.56)}
              />

              {/* Türrahmen außen */}
              <motion.rect
                x="120"
                y="80"
                width="360"
                height="620"
                stroke={ink}
                strokeWidth="1.8"
                {...drawPath(sketchInView, 0.2, 0.81)}
              />

              {/* Türrahmen innen (Falz) */}
              <motion.rect
                x="135"
                y="95"
                width="330"
                height="605"
                stroke={ink}
                strokeWidth="1"
                strokeOpacity="0.5"
                {...drawPath(sketchInView, 0.48, 0.56)}
              />

              {/* Türblatt */}
              <motion.rect
                x="150"
                y="110"
                width="300"
                height="590"
                stroke={ink}
                strokeWidth="1.6"
                {...drawPath(sketchInView, 0.69, 0.77)}
              />

              {/* Paneel oben */}
              <motion.rect
                x="180"
                y="150"
                width="240"
                height="220"
                stroke={ink}
                strokeWidth="1.2"
                {...drawPath(sketchInView, 1.13, 0.48)}
              />

              {/* Paneel unten */}
              <motion.rect
                x="180"
                y="410"
                width="240"
                height="260"
                stroke={ink}
                strokeWidth="1.2"
                {...drawPath(sketchInView, 1.25, 0.48)}
              />

              {/* Türgriff — Rosette */}
              <motion.circle
                cx="170"
                cy="400"
                r="6"
                stroke={ink}
                strokeWidth="1.4"
                {...drawPath(sketchInView, 1.49, 0.28)}
              />
              {/* Türgriff — Hebel */}
              <motion.line
                x1="164"
                y1="400"
                x2="138"
                y2="400"
                stroke={ink}
                strokeWidth="1.8"
                {...drawPath(sketchInView, 1.57, 0.24)}
              />

              {/* Scharniere — oben & unten (rechte Seite) */}
              <motion.rect
                x="446"
                y="180"
                width="8"
                height="36"
                stroke={ink}
                strokeWidth="1.2"
                {...drawPath(sketchInView, 1.65, 0.2)}
              />
              <motion.rect
                x="446"
                y="568"
                width="8"
                height="36"
                stroke={ink}
                strokeWidth="1.2"
                {...drawPath(sketchInView, 1.73, 0.2)}
              />

              {/* === MASSANGABEN === */}

              {/* Horizontal: 860 mm — Breite (oben) */}
              <motion.g {...fadeIn(sketchInView, 1.89)}>
                {/* Hilfslinien hoch */}
                <line
                  x1="120"
                  y1="80"
                  x2="120"
                  y2="40"
                  stroke={red}
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                <line
                  x1="480"
                  y1="80"
                  x2="480"
                  y2="40"
                  stroke={red}
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                {/* Maßlinie */}
                <motion.line
                  x1="120"
                  y1="50"
                  x2="480"
                  y2="50"
                  stroke={red}
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  animate={sketchInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.56, ease, delay: 1.93 }}
                />
                {/* Pfeile */}
                <Tick x={120} y={50} dir="left" color={red} />
                <Tick x={480} y={50} dir="right" color={red} />
                {/* Label */}
                <motion.g {...fadeIn(sketchInView, 2.29)}>
                  <rect
                    x="270"
                    y="36"
                    width="60"
                    height="22"
                    fill="#F7F3EE"
                  />
                  <text
                    x="300"
                    y="52"
                    textAnchor="middle"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    fontSize="13"
                    fill={red}
                    letterSpacing="0.05em"
                  >
                    860 mm
                  </text>
                </motion.g>
              </motion.g>

              {/* Vertikal: 2100 mm — Höhe (rechts) */}
              <motion.g {...fadeIn(sketchInView, 2.05)}>
                <line
                  x1="480"
                  y1="80"
                  x2="540"
                  y2="80"
                  stroke={red}
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                <line
                  x1="480"
                  y1="700"
                  x2="540"
                  y2="700"
                  stroke={red}
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                <motion.line
                  x1="530"
                  y1="80"
                  x2="530"
                  y2="700"
                  stroke={red}
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  animate={sketchInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.72, ease, delay: 2.09 }}
                />
                <Tick x={530} y={80} dir="up" color={red} />
                <Tick x={530} y={700} dir="down" color={red} />
                <motion.g {...fadeIn(sketchInView, 2.54)}>
                  <rect
                    x="500"
                    y="378"
                    width="60"
                    height="22"
                    fill="#F7F3EE"
                  />
                  <text
                    x="530"
                    y="394"
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

              {/* Mini-Label "Treventi · Custom" unten */}
              <motion.g {...fadeIn(sketchInView, 2.42)}>
                <text
                  x="120"
                  y="730"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize="10"
                  fill={ink}
                  fillOpacity="0.55"
                  letterSpacing="0.18em"
                >
                  TREVENTI · CUSTOM · 01
                </text>
                <text
                  x="480"
                  y="730"
                  textAnchor="end"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize="10"
                  fill={ink}
                  fillOpacity="0.55"
                  letterSpacing="0.18em"
                >
                  M 1:20
                </text>
              </motion.g>
            </svg>
          </div>
        </div>

        {/* Rechts — Text */}
        <div className="md:col-span-5">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.49, ease, delay: 0.07 }}
            className="mb-6 flex items-center gap-3 sm:mb-8"
          >
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              Maßgeschneidert
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease, delay: 0.175 }}
            className="font-serif text-[2.2rem] font-medium leading-[1.05] tracking-tight text-[#2C2725] sm:text-[2.6rem] md:text-[2.9rem] lg:text-[3.2rem]"
          >
            Jede Tür beginnt
            <br />
            <span className="text-[#2C2725]/70">mit einer Skizze.</span>
          </motion.h2>

          {/* Sub-Text */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.56, ease, delay: 0.35 }}
            className="mt-7 max-w-md text-[15px] font-light leading-relaxed text-[#2C2725]/80 sm:mt-8 sm:text-base lg:text-[17px]"
          >
            Ihre Vision. Unsere Präzision. Vom ersten Strich bis zur fertigen
            Tür — alles individuell für Ihr Projekt gefertigt.
          </motion.p>

          {/* Bullets */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.42, ease, delay: 0.525 }}
            className="mt-8 space-y-3.5 sm:mt-10"
          >
            {[
              "Individuelle Maße bis zum Millimeter",
              "Auswahl an Hölzern und Oberflächen",
              "Persönliche Beratung",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.42, ease, delay: 0.595 + i * 0.07 }}
                className="flex items-start gap-3 text-[14px] font-light text-[#2C2725]/85 sm:text-[15px]"
              >
                <span className="mt-[3px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#EA0100]/40">
                  <Check
                    className="h-2.5 w-2.5 text-[#EA0100]"
                    strokeWidth={3}
                  />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.a
            href="#prozess"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.49, ease, delay: 0.875 }}
            className="group mt-10 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2725] transition-colors hover:text-[#EA0100] sm:mt-12 sm:text-[13px]"
          >
            <span className="relative">
              Mehr über unseren Prozess
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[#2C2725] transition-colors group-hover:bg-[#EA0100]" />
            </span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function Tick({
  x,
  y,
  dir,
  color,
}: {
  x: number;
  y: number;
  dir: "left" | "right" | "up" | "down";
  color: string;
}) {
  const len = 5;
  const points: Record<string, [number, number, number, number][]> = {
    left: [
      [x, y, x + len, y - len],
      [x, y, x + len, y + len],
    ],
    right: [
      [x, y, x - len, y - len],
      [x, y, x - len, y + len],
    ],
    up: [
      [x, y, x - len, y + len],
      [x, y, x + len, y + len],
    ],
    down: [
      [x, y, x - len, y - len],
      [x, y, x + len, y - len],
    ],
  };
  return (
    <g>
      {points[dir].map((p, i) => (
        <line
          key={i}
          x1={p[0]}
          y1={p[1]}
          x2={p[2]}
          y2={p[3]}
          stroke={color}
          strokeWidth="1.2"
        />
      ))}
    </g>
  );
}

function CornerMarks() {
  return (
    <>
      {[
        "top-0 left-0",
        "top-0 right-0 rotate-90",
        "bottom-0 right-0 rotate-180",
        "bottom-0 left-0 -rotate-90",
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute h-4 w-4 ${pos}`}
        >
          <span className="absolute left-0 top-0 h-px w-3 bg-[#2C2725]/30" />
          <span className="absolute left-0 top-0 h-3 w-px bg-[#2C2725]/30" />
        </span>
      ))}
    </>
  );
}
