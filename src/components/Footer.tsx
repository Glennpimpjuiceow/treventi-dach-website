"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";

const navLinks = [
  { label: "Kollektion", href: "#kollektion" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "Kontakt", href: "/kontakt" },
];

const legalLinks = [
  { label: "Impressum", href: "#impressum" },
  { label: "AGB", href: "#agb" },
  { label: "Datenschutz", href: "#datenschutz" },
  { label: "Widerruf", href: "#widerruf" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V6.93a4.85 4.85 0 0 1-1.01-.24z" />
    </svg>
  );
}

function FooterAccordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile: klappbarer Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 md:hidden"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
          {title}
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="text-white/55"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      {/* Desktop: statischer Header */}
      <p className="mb-5 hidden text-[10px] uppercase tracking-[0.22em] text-white/40 md:block">
        {title}
      </p>

      {/* Mobile: animierter Collapse */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            className="overflow-hidden md:hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: immer sichtbar */}
      <div className="hidden md:block">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#7a1020] text-white">
      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img
              src="/treventi-logo-white.svg"
              alt="Treventi"
              className="mb-4 h-6 w-auto sm:h-7"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Premium Innentüren — direkt vom Hersteller. Inklusive Montage,
              DACH-weit ausgeliefert.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4 sm:mt-8">
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/60 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="text-white/60 transition-colors hover:text-white"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Accordion-Gruppe: auf Mobile mit einer dezenten Trennlinie oben, auf Desktop als reguläre Grid-Spalten */}
          <div className="border-t border-white/10 md:contents md:border-0">
            <FooterAccordion title="Navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Rechtliches">
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-[11px]">
            © {new Date().getFullYear()} Treventi Group sh.p.k.
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 sm:text-[11px]">
            Made in Europe · Seit 2014
          </span>
        </div>
      </div>
    </footer>
  );
}
