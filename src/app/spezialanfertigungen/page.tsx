import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Projekt beschreiben",
    text: "Schildern Sie uns Ihre Vorstellung — Maße, Material, Stil, Einbausituation. Fotos oder Skizzen helfen uns, Ihre Idee zu verstehen.",
  },
  {
    num: "02",
    title: "Rückmeldung in 48h",
    text: "Unser Team meldet sich innerhalb von 48 Stunden mit einem ersten Konzept und einer unverbindlichen Einschätzung zum Aufwand.",
  },
  {
    num: "03",
    title: "Angebot & Produktion",
    text: "Nach Ihrer Freigabe beginnt die Fertigung in unserer Manufaktur in Prishtina — direkt, ohne Zwischenhändler.",
  },
];

export default function SpezialanfertigungenPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE]">
      {/* Hero */}
      <section className="bg-[#7a1020] px-5 pb-16 pt-20 text-white sm:px-8 sm:pb-24 sm:pt-28 md:px-12 lg:px-16">
        <Link
          href="/#kollektion"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
          Zurück zur Kollektion
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-10 bg-[#EA0100]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/65">
            Kategorie 06
          </span>
        </div>

        <h1 className="mt-5 font-serif text-[2.4rem] font-medium leading-[1.04] tracking-tight sm:text-5xl md:text-[3.5rem]">
          Spezial&shy;anfertigung&shy;en
        </h1>

        <p className="mt-5 max-w-lg text-[15px] font-light leading-relaxed text-white/70 sm:text-base">
          Jede außergewöhnliche Tür verdient eine individuelle Geschichte —
          von der ersten Skizze bis zur finalen Montage.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20 md:py-24">
        {/* Info card */}
        <div className="rounded-sm bg-white px-7 py-8 shadow-[0_2px_4px_rgba(44,39,37,0.04),0_12px_32px_rgba(44,39,37,0.08)] sm:px-10 sm:py-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#EA0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100]">
              So funktioniert es
            </span>
          </div>

          <h2 className="mt-5 font-serif text-[1.6rem] font-medium leading-tight tracking-tight text-[#2C2725] sm:text-[2rem]">
            Individuelle Fertigung
            <br />
            auf persönliche Anfrage
          </h2>

          <p className="mt-4 text-[14px] font-light leading-relaxed text-[#2C2725]/65 sm:text-[15px]">
            Da jede Spezialanfertigung einzigartig ist, können wir keine
            Standardpreise nennen. Schreiben Sie uns einfach eine kurze
            Beschreibung Ihres Projekts — wir erstellen Ihnen ein
            maßgeschneidertes Angebot.
          </p>

          {/* Steps */}
          <div className="mt-8 space-y-6 sm:mt-10">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-5">
                <span className="mt-0.5 flex-shrink-0 font-serif text-[1.1rem] font-medium text-[#EA0100]">
                  {s.num}
                </span>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#2C2725]">
                    {s.title}
                  </p>
                  <p className="mt-1.5 text-[13px] font-light leading-relaxed text-[#2C2725]/60 sm:text-[14px]">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-[#2C2725]/08 sm:my-10" />

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#7a1020] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#6a0e1c] sm:px-8"
            >
              Anfrage stellen
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.8}
              />
            </Link>

            <a
              href="mailto:info@treventi.com"
              className="group inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#2C2725]/15 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#2C2725]/75 transition-all duration-300 hover:border-[#7a1020]/40 hover:text-[#7a1020] sm:px-8"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              info@treventi.com
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-[11px] font-light text-[#2C2725]/40 sm:mt-10">
          Direkt vom Hersteller · Kein Zwischenhandel · Antwort innerhalb 48h
        </p>
      </section>
    </main>
  );
}
