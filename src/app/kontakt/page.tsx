"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    telefon: "",
    unternehmen: "",
    projektart: "",
    nachricht: "",
    datenschutz: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#f7f3ee", color: "#1a1a1a" }}>

      {/* Minimal Header */}
      <header className="flex items-center justify-between px-5 py-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <a href="/" aria-label="Treventi Startseite">
          <img
            src="/treventi-logo-white.svg"
            alt="Treventi"
            className="h-6 w-auto sm:h-7"
            style={{ filter: "invert(1) sepia(1) saturate(3) hue-rotate(300deg) brightness(0.3)" }}
          />
        </a>
        <a
          href="/"
          className="text-[11px] uppercase tracking-[0.22em] transition-colors"
          style={{ color: "#7a1020" }}
        >
          ← Zurück
        </a>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left — Info */}
          <div className="lg:pt-4">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "#7a1020" }} />
              <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "#7a1020" }}>
                Kontakt
              </span>
            </div>

            <h1
              className="mb-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]"
              style={{ color: "#1a1a1a" }}
            >
              Lass uns<br />sprechen.
            </h1>

            <p className="mb-12 max-w-sm text-base leading-relaxed" style={{ color: "#5a5a5a" }}>
              Schildere uns dein Projekt — wir melden uns innerhalb von 24 Stunden
              mit einem konkreten Angebot zurück.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { label: "E-Mail", value: "info@treventi.com" },
                { label: "Telefon", value: "+49 000 000 000" },
                { label: "Standort", value: "Deutschland · Österreich · Schweiz" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.22em]" style={{ color: "#7a1020" }}>
                    {item.label}
                  </p>
                  <p className="text-sm" style={{ color: "#1a1a1a" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {sent ? (
              <div className="flex h-full min-h-[400px] flex-col items-start justify-center">
                <div className="mb-4 h-px w-12" style={{ background: "#7a1020" }} />
                <h2 className="mb-3 font-serif text-3xl font-medium" style={{ color: "#1a1a1a" }}>
                  Vielen Dank.
                </h2>
                <p style={{ color: "#5a5a5a" }}>
                  Wir melden uns innerhalb von 24 Stunden bei dir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Name *" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="E-Mail *" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                {/* Row: Telefon + Unternehmen */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Telefon" name="telefon" type="tel" value={form.telefon} onChange={handleChange} />
                  <Field label="Unternehmen / Firma" name="unternehmen" value={form.unternehmen} onChange={handleChange} />
                </div>

                {/* Projektart */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: "#7a1020" }}>
                    Projektart
                  </label>
                  <select
                    name="projektart"
                    value={form.projektart}
                    onChange={handleChange}
                    className="w-full border-b bg-transparent py-3 text-sm outline-none transition-colors"
                    style={{
                      borderColor: "#d4c9c0",
                      color: form.projektart ? "#1a1a1a" : "#9a9a9a",
                    }}
                  >
                    <option value="" disabled>Bitte wählen …</option>
                    <option value="neubau">Neubau</option>
                    <option value="renovierung">Renovierung</option>
                    <option value="gewerblich">Gewerbliches Objekt</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                {/* Nachricht */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: "#7a1020" }}>
                    Nachricht *
                  </label>
                  <textarea
                    name="nachricht"
                    value={form.nachricht}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Beschreibe dein Projekt kurz — Anzahl Türen, Stil, Zeitraum …"
                    className="w-full resize-none border-b bg-transparent py-3 text-sm outline-none placeholder:text-[#b0a8a0] transition-colors"
                    style={{ borderColor: "#d4c9c0", color: "#1a1a1a" }}
                  />
                </div>

                {/* Datenschutz */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="datenschutz"
                    checked={form.datenschutz}
                    onChange={handleChange}
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#7a1020]"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "#7a7a7a" }}>
                    Ich habe die{" "}
                    <a href="/datenschutz" className="underline underline-offset-2" style={{ color: "#7a1020" }}>
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zu.
                  </span>
                </label>

                {error && (
                  <p className="text-sm" style={{ color: "#7a1020" }}>
                    Etwas ist schiefgelaufen. Bitte versuche es erneut.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 py-4 text-[11px] uppercase tracking-[0.24em] text-white transition-all duration-300"
                  style={{ background: "#7a1020", paddingLeft: "2rem", paddingRight: "2rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#5c0c18")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#7a1020")}
                >
                  {loading ? "Wird gesendet …" : "Anfrage senden"}
                  <svg width="16" height="11" viewBox="0 0 18 12" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    <path d="M1 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: "#7a1020" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b bg-transparent py-3 text-sm outline-none placeholder:text-[#b0a8a0] transition-colors"
        style={{ borderColor: "#d4c9c0", color: "#1a1a1a" }}
      />
    </div>
  );
}
