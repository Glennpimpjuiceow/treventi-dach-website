"use client";

import { motion } from "framer-motion";
import AutoScroll from "embla-carousel-auto-scroll";
import { Compass, Building2, Layers, type LucideIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type PartnerType = "Architekturbüro" | "Bauträger" | "Projektentwickler";

const ICON_BY_TYPE: Record<PartnerType, LucideIcon> = {
  Architekturbüro: Compass,
  Bauträger: Building2,
  Projektentwickler: Layers,
};

const partners: Array<{ id: string; name: string; type: PartnerType }> = [
  { id: "p1", name: "Müller & Partner", type: "Architekturbüro" },
  { id: "p2", name: "Bauer Architekten BDA", type: "Architekturbüro" },
  { id: "p3", name: "Schmidt Bauträger", type: "Projektentwickler" },
  { id: "p4", name: "Lehmann Projekte", type: "Bauträger" },
  { id: "p5", name: "Wagner Architekten", type: "Architekturbüro" },
  { id: "p6", name: "Holzer & Söhne", type: "Bauträger" },
  { id: "p7", name: "Steinmeier Group", type: "Projektentwickler" },
  { id: "p8", name: "Becker Architekten", type: "Architekturbüro" },
  { id: "p9", name: "Hartmann Bau", type: "Bauträger" },
  { id: "p10", name: "Voss & Kollegen", type: "Architekturbüro" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function TrustBar() {
  return (
    <section
      id="vertrauen"
      className="relative w-full overflow-hidden bg-[#f7f3ee] py-20 text-[#2c2725] sm:py-24 md:py-28"
    >
      {/* Headline */}
      <div className="mx-auto mb-14 max-w-3xl px-5 text-center sm:mb-16 sm:px-8 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.49, ease }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#ea0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#ea0100]">
            Vertrauen
          </span>
          <span className="h-px w-8 bg-[#ea0100]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.56, ease, delay: 0.042 }}
          className="font-serif text-[1.7rem] font-medium leading-tight tracking-tight text-[#7a1020] sm:text-3xl md:text-[2.2rem]"
        >
          Vertraut von Profis
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.49, ease, delay: 0.126 }}
          className="mt-3 text-sm font-light leading-relaxed text-[#888888] sm:mt-4 sm:text-base"
        >
          Architekturbüros &amp; Bauträger in der DACH-Region
        </motion.p>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.63, ease, delay: 0.14 }}
        className="relative"
      >
        <Carousel
          opts={{ loop: true, align: "start", dragFree: true }}
          plugins={[
            AutoScroll({
              playOnInit: true,
              speed: 0.55,
              startDelay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: false,
            }),
          ]}
          className="mx-auto"
        >
          <CarouselContent className="ml-0 py-3">
            {partners.map((partner) => {
              const Icon = ICON_BY_TYPE[partner.type];
              return (
                <CarouselItem
                  key={partner.id}
                  className="basis-[210px] pl-0 sm:basis-[225px] md:basis-[220px] lg:basis-[235px]"
                >
                  <div className="trust-card-light group relative mx-2 flex h-[152px] flex-col items-start justify-between rounded-md border border-[#ea0100]/22 bg-white px-7 py-7 text-[#2c2725] sm:px-8 sm:py-7">
                    <Icon
                      className="h-[18px] w-[18px] text-[#ea0100] transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block text-[9px] font-medium uppercase tracking-[0.28em] text-[#888888] sm:text-[10px]">
                        {partner.type}
                      </span>
                      <span className="mt-1.5 block font-serif text-[15px] font-medium leading-snug tracking-tight text-[#2c2725] sm:text-base md:text-[17px]">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Edge fades — match light bg */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f7f3ee] via-[#f7f3ee]/95 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f7f3ee] via-[#f7f3ee]/95 to-transparent sm:w-32" />
      </motion.div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.49, ease, delay: 0.35 }}
        className="mx-auto mt-14 max-w-2xl px-5 text-center text-[11px] uppercase tracking-[0.22em] text-[#888888] sm:mt-16 sm:px-8 sm:text-xs"
      >
        Auswahl realisierter B2B-Projekte · Deutschland · Österreich · Schweiz
      </motion.p>
    </section>
  );
}
