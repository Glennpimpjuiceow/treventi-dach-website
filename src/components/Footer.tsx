"use client";

const navLinks = [
  { label: "Kollektion", href: "#kollektion" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "Kontakt", href: "/kontakt" },
];

const legalLinks = [
  { label: "Impressum", href: "#impressum" },
  { label: "AGB", href: "#agb" },
  { label: "Datenschutz", href: "#datenschutz" },
  { label: "Widerruf", href: "#widerruf" },
];

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

export default function Footer() {
  return (
    <footer className="bg-[#7a1020] text-white">
      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">

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
            <div className="mt-8 flex items-center gap-4">
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

          {/* Navigation */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/40">
              Navigation
            </p>
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
          </div>

          {/* Legal */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/40">
              Rechtliches
            </p>
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            © {new Date().getFullYear()} Treventi Group GmbH
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">
            Made in Europe · Seit 2014
          </span>
        </div>
      </div>
    </footer>
  );
}
