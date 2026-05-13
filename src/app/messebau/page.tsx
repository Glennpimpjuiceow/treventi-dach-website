import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Messen & Events | Treventi",
  description:
    "Treventi auf den wichtigsten Fachmessen für Innentüren, Architektur und Wohndesign in der DACH-Region.",
};

const GALLERY = [
  "/doors/page-25-0.jpg",
  "/doors/page-25-1.jpg",
  "/doors/page-25-2.jpg",
  "/doors/page-44-0.jpg",
  "/doors/page-44-3.jpg",
  "/doors/page-44-6.jpg",
];

export default function MessebauPage() {
  return (
    <main className="bg-[#f7f3ee] text-[#2c2725]">
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-[#0E0B0A] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(234,1,0,0.10)_0%,_transparent_55%)]"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32 md:py-40">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#ea0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ea0100] sm:text-[11px]">
              Messen &amp; Events
            </span>
            <span className="h-px w-8 bg-[#ea0100]" />
          </div>
          <h1 className="font-serif text-[2.2rem] font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]">
            Wir sind dort, wo geplant wird.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:text-base">
            Treventi zeigt seine Innentüren auf den führenden Fachmessen für
            Architektur, Innenausbau und Wohndesign. Persönlich erleben —
            anfassen, vergleichen, fragen.
          </p>
        </div>
      </section>

      {/* Intro Story */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#ea0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#888888] sm:text-[11px]">
            Warum Messen
          </span>
          <span className="h-px w-10 bg-[#ea0100]" />
        </div>
        <h2 className="font-serif text-[1.7rem] font-medium leading-tight tracking-tight text-[#2c2725] sm:text-[2.2rem] md:text-[2.6rem]">
          Eine Tür spürt man erst, wenn man sie anfasst.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#2c2725]/75 sm:text-base">
          Auf Messen können Architekten, Bauträger und Interessierte unsere
          Türen erleben wie sonst nirgends: das Gewicht in der Hand, die
          Maserung im Licht, der präzise Schlag beim Schließen. Wir nehmen uns
          Zeit für jedes Gespräch — und für jede Frage.
        </p>
      </section>

      {/* Branchen-Präsenz — neutral, ohne konkrete Termine (kommen vom Kunden noch) */}
      <section className="w-full bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#ea0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#888888] sm:text-[11px]">
              Branchen-Präsenz
            </span>
            <span className="h-px w-10 bg-[#ea0100]" />
          </div>
          <h2 className="font-serif text-[1.8rem] font-medium leading-tight tracking-tight text-[#2c2725] sm:text-[2.2rem] md:text-[2.6rem]">
            Etabliert in der Branche.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#2c2725]/75 sm:text-base">
            Treventi ist regelmäßig auf europäischen Branchenmessen vertreten —
            von Pristina bis Westeuropa. Die kommenden Termine geben wir auf
            Anfrage bekannt.
          </p>
          <Link
            href="/kontakt"
            className="group mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2c2725] transition-colors hover:text-[#ea0100] sm:text-[13px]"
          >
            <span className="relative">
              Termine erfragen
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#2c2725] transition-colors group-hover:bg-[#ea0100]" />
            </span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full bg-[#f7f3ee] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 sm:mb-16">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#ea0100]" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#888888] sm:text-[11px]">
                Eindrücke
              </span>
            </div>
            <h2 className="font-serif text-[1.8rem] font-medium leading-tight tracking-tight text-[#2c2725] sm:text-[2.2rem] md:text-[2.6rem]">
              Vom Stand.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {GALLERY.map((src, i) => (
              <div
                key={src}
                className={
                  i === 0
                    ? "relative col-span-2 aspect-[4/3] overflow-hidden rounded-sm sm:row-span-2 sm:aspect-square"
                    : "relative aspect-square overflow-hidden rounded-sm"
                }
              >
                <Image
                  src={src}
                  alt="Eindruck Treventi Messestand"
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-[11px] uppercase tracking-[0.22em] text-[#888888] sm:mt-12 sm:text-xs">
            Aktuelle Eindrücke folgen nach der nächsten Messe
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#7a1020] py-20 text-white sm:py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-serif text-[1.6rem] font-medium leading-tight tracking-tight sm:text-[2rem] md:text-[2.4rem]">
            Wir freuen uns auf Ihren Besuch.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white/75 sm:text-base">
            Vereinbaren Sie einen Termin am Treventi-Stand — wir reservieren
            Zeit für Sie.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-block border border-white px-8 py-3 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-[#7a1020] sm:text-[13px]"
          >
            Termin anfragen
          </Link>
          <div className="mt-6">
            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white sm:text-[12px]"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
