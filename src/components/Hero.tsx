"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

const navItems = [
  { label: "Kollektion", href: "#kollektion" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "Kontakt", href: "#kontakt" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const lineReveal: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const menuItemVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.85, ease, delay: 0.25 + i * 0.08 },
  }),
  exit: (i: number) => ({
    y: "110%",
    transition: { duration: 0.4, ease, delay: i * 0.04 },
  }),
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
        animate="visible"
        transition={{ duration: 1.1, ease, delay }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.7]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#3a0810] text-foreground"
    >
      {/* Parallax Background — Layer 0 */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/hero/hero-treventi-door.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Weinrot-Tint, max ~50% am Top — Layer 10 */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-10 bg-[#7a1020]"
      />
      {/* Sanfte Vignette nur am unteren Rand für Bottom-Meta-Lesbarkeit — Layer 10 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#5c0c18]/50" />
      {/* Lokaler Schatten links unten für Headline-Lesbarkeit — Layer 10 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_25%_65%,_rgba(0,0,0,0.45)_0%,_transparent_55%)]" />

      {/* Header — Layer 30 */}
      <header className="relative z-30 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6 md:px-12 md:pt-8 lg:px-16 xl:px-20">
        <a href="/" aria-label="Treventi Startseite" className="block">
          <img
            src="/treventi-logo-white.svg"
            alt="Treventi"
            className="h-6 w-auto sm:h-7 md:h-8"
          />
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm tracking-wide text-foreground/70 lg:gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex h-8 w-8 flex-col items-center justify-center text-foreground md:hidden"
        >
          <motion.span
            className="absolute block h-px w-6 bg-current"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -4 }}
            transition={{ duration: 0.35, ease }}
          />
          <motion.span
            className="absolute block h-px w-6 bg-current"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 4 }}
            transition={{ duration: 0.35, ease }}
          />
        </button>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-50 bg-[#5c0c18] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptnavigation"
          >
            <nav className="relative flex h-full flex-col items-start justify-center px-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.15 }}
                className="mb-8 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-foreground/40" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                  Navigation
                </span>
              </motion.div>

              <ul className="space-y-2">
                {navItems.map((item, i) => (
                  <li key={item.href} className="overflow-hidden pb-[0.08em]">
                    <motion.a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="block font-serif text-5xl font-medium leading-none tracking-tight text-foreground transition-colors hover:text-foreground/60 sm:text-6xl"
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.6 }}
                className="absolute bottom-10 left-8 right-8 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/40"
              >
                <span>Treventi Group · Prishtina</span>
                <span>2026</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content — Layer 20 */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex min-h-[calc(100svh-88px)] w-full flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20"
      >
        <div className="max-w-3xl">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="mb-7 flex items-center gap-3 sm:mb-9"
          >
            <span className="h-px w-10 bg-accent sm:w-12" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/85 sm:text-xs">
              Made in Europe · Seit 2014
            </span>
          </motion.div>

          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
            <MaskLine delay={0.3}>Türen, die</MaskLine>
            <MaskLine delay={0.55}>Räume verändern.</MaskLine>
          </h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, ease, delay: 1.15 }}
            className="mt-7 max-w-xl text-base font-light leading-relaxed text-foreground/85 sm:mt-9 sm:text-lg lg:mt-10 lg:text-xl"
          >
            Premium Innentüren — direkt vom Hersteller. Inklusive Montage,
            DACH-weit ausgeliefert.
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, ease, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-5 sm:mt-12 lg:mt-14"
          >
            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#f7f3ee] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[#7a1020] shadow-[0_6px_22px_rgba(0,0,0,0.22)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:bg-white hover:shadow-[0_10px_32px_rgba(0,0,0,0.3)] sm:px-9 sm:py-[18px] sm:text-xs"
            >
              <span className="relative z-10">Anfrage stellen</span>
              <svg
                width="16"
                height="11"
                viewBox="0 0 18 12"
                fill="none"
                className="relative z-10 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M1 6h16M12 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </a>

            <a
              href="#kollektion"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-foreground/85 transition-colors hover:text-foreground sm:text-xs"
            >
              Kollektion ansehen
              <span className="block h-px w-6 bg-foreground/60 transition-all group-hover:w-10 group-hover:bg-foreground" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom hairline meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-4 left-5 right-5 z-20 hidden items-center justify-between text-[10px] uppercase tracking-[0.22em] text-foreground/55 sm:bottom-6 sm:left-8 sm:right-8 md:flex md:bottom-6 md:left-12 md:right-12 lg:left-16 lg:right-16 xl:left-20 xl:right-20"
      >
        <span className="flex items-center gap-3">
          <span className="block h-px w-8 bg-foreground/35" />
          Scroll
        </span>
        <span>Treventi Group · Prishtina</span>
      </motion.div>
    </section>
  );
}
