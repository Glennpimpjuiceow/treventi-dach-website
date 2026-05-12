# Werkstatt-Video Scroll-Reveal-Animation – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Werkstatt-Sektion bekommt einen Sticky-Scroll-Clip-Path-Reveal-Effekt (Desktop ≥ 768 px) — auf Mobile bleibt das heutige statische Verhalten.

**Architecture:** `WerkstattVideo.tsx` wird zum schlanken Wrapper, der via Tailwind-Visibility-Switch (`hidden md:block` / `md:hidden`) entweder `WerkstattVideoScroll` (Desktop) oder `WerkstattVideoStatic` (Mobile) rendert. Beide Varianten teilen Header-Text, Video-Pfad und Poster-Pfad als Props.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19, `framer-motion` 12.38 (`useScroll` / `useTransform` / `useMotionTemplate`), Tailwind CSS 4, TypeScript 5, `lucide-react` Icons.

**Spec:** `docs/superpowers/specs/2026-05-12-werkstatt-scroll-animation-design.md`

**Testing-Hinweis:** Das Projekt hat **kein Test-Framework** (kein Jest/Vitest/Playwright in `package.json`). Verifikation erfolgt manuell im Browser via `npm run dev`. Jeder Task hat einen Verifikations-Step mit konkretem Erwartungswert.

---

## File Structure

**Created:**
- `src/components/werkstatt/WerkstattVideoStatic.tsx` — Mobile-Variante (heutiger Code, extrahiert).
- `src/components/werkstatt/WerkstattVideoScroll.tsx` — Desktop-Variante mit Sticky/Clip-Path.
- `src/components/werkstatt/types.ts` — Geteilte Props-Typen.

**Modified:**
- `src/components/WerkstattVideo.tsx` — Wird Wrapper-Komponente.

**Optional (User-Aktion):**
- `public/video/werkstatt-placeholder.mp4` — Test-Video. Falls nicht vorhanden, zeigt der Code Poster + „BALD · VIDEO"-Badge (Animation funktioniert trotzdem).

---

## Task 1: Komponenten-Ordner und Typen

**Files:**
- Create: `src/components/werkstatt/types.ts`

- [ ] **Step 1: Ordner anlegen**

```bash
mkdir -p src/components/werkstatt
```

- [ ] **Step 2: Geteilte Props-Typen schreiben**

`src/components/werkstatt/types.ts`:
```ts
export type WerkstattVariantProps = {
  videoSrc: string | undefined;
  posterSrc: string;
  eyebrow: string;
  headline: string;
  subline: string;
};
```

- [ ] **Step 3: Commit**

```bash
git add src/components/werkstatt/types.ts
git commit -m "feat(werkstatt): geteilte Props-Typen für Video-Varianten"
```

---

## Task 2: Static-Variante extrahieren

Aktuellen Code aus `WerkstattVideo.tsx` 1:1 in `WerkstattVideoStatic.tsx` verschieben, parametrisiert via Props.

**Files:**
- Create: `src/components/werkstatt/WerkstattVideoStatic.tsx`

- [ ] **Step 1: Datei mit komplettem Inhalt anlegen**

`src/components/werkstatt/WerkstattVideoStatic.tsx`:
```tsx
"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WerkstattVariantProps } from "./types";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WerkstattVideoStatic({
  videoSrc,
  posterSrc,
  eyebrow,
  headline,
  subline,
}: WerkstattVariantProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoErrored, setVideoErrored] = useState(false);

  const inView = useInView(containerRef, {
    margin: "-15% 0px -15% 0px",
    amount: 0.4,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!videoSrc || reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reducedMotion, videoSrc]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  const showVideo = videoSrc && !videoErrored;

  return (
    <section className="relative bg-[#F7F3EE] py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.49, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.07 }}
            className="mt-5 font-serif text-[2rem] font-medium leading-[1.04] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem] lg:text-[3.4rem]"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.49, ease, delay: 0.14 }}
            className="mt-5 max-w-xl text-[14px] font-light leading-relaxed text-[#2C2725]/70 sm:text-base"
          >
            {subline}
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 1.04, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.84, ease, delay: 0.21 }}
          className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-sm bg-[#0E0B0A] ring-1 ring-[#2C2725]/10 shadow-[0_24px_60px_-20px_rgba(44,39,37,0.35)] sm:mt-14"
        >
          {showVideo ? (
            <>
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                preload="metadata"
                loop
                className="h-full w-full object-cover"
                aria-label="Treventi Werkstatt — Produktionsprozess"
                onError={() => setVideoErrored(true)}
              />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
                aria-pressed={!muted}
                className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white/90 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA0100] sm:bottom-5 sm:right-5"
              >
                {muted ? <VolumeX size={16} strokeWidth={1.6} /> : <Volume2 size={16} strokeWidth={1.6} />}
              </button>
            </>
          ) : (
            <>
              <Image
                src={posterSrc}
                alt="Treventi Werkstatt — Vorschau"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover brightness-[0.65]"
                priority={false}
              />
              <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.28em] text-white/70 sm:left-5 sm:top-5">
                Bald · Video
              </span>
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-black/35 ring-2 ring-[#EA0100]/70 backdrop-blur-sm">
                  <Play size={22} strokeWidth={1.6} className="ml-1 text-white" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: Keine Fehler (oder nur Fehler in nicht-betroffenen Files; in `WerkstattVideoStatic.tsx` keine).

- [ ] **Step 3: Commit**

```bash
git add src/components/werkstatt/WerkstattVideoStatic.tsx
git commit -m "feat(werkstatt): WerkstattVideoStatic für Mobile extrahiert"
```

---

## Task 3: Wrapper umbauen + temporärer Test (nur Mobile-Pfad)

`WerkstattVideo.tsx` wird Wrapper. Vorerst rendert er IMMER `WerkstattVideoStatic` — der Desktop-Pfad kommt in Task 5. So testen wir, dass die Refaktorierung nichts kaputt gemacht hat, bevor wir Neues bauen.

**Files:**
- Modify: `src/components/WerkstattVideo.tsx` (komplett ersetzen)

- [ ] **Step 1: Datei komplett ersetzen**

`src/components/WerkstattVideo.tsx`:
```tsx
import WerkstattVideoStatic from "./werkstatt/WerkstattVideoStatic";
import type { WerkstattVariantProps } from "./werkstatt/types";

const config: WerkstattVariantProps = {
  videoSrc: undefined,
  posterSrc: "/hero/treventi-DSC04385-COPY.jpg",
  eyebrow: "Einblick",
  headline: "20 Sekunden in unserer Werkstatt.",
  subline: "Ein Blick hinter die Türen unserer Manufaktur in Prishtina.",
};

export default function WerkstattVideo() {
  return (
    <>
      <div className="md:hidden">
        <WerkstattVideoStatic {...config} />
      </div>
      <div className="hidden md:block">
        <WerkstattVideoStatic {...config} />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Dev-Server starten**

Run: `npm run dev`
Expected: Server startet auf `http://localhost:3000` ohne Fehler.

- [ ] **Step 3: Browser-Verifikation**

Öffne `http://localhost:3000` und scrolle zur Werkstatt-Sektion.
- Erwartet: Sektion sieht **exakt aus wie vorher** (Header „Einblick / 20 Sekunden / Untertitel" + Video-Frame mit Poster + Play-Button + „BALD · VIDEO"-Badge).
- Resize-Test: Browser-Fenster auf < 768 px Breite ziehen — Sektion bleibt sichtbar (jetzt durch den Mobile-Pfad gerendert).
- Resize-Test: ≥ 768 px Breite — Sektion bleibt sichtbar (jetzt durch den Desktop-Pfad gerendert, aber zeigt aktuell auch Static-Variante).

Falls Fehler: TypeScript-Konsole prüfen, dann zurückgehen.

- [ ] **Step 4: Commit**

```bash
git add src/components/WerkstattVideo.tsx
git commit -m "refactor(werkstatt): WerkstattVideo zum Variant-Wrapper umgebaut"
```

---

## Task 4: WerkstattVideoScroll Grundgerüst (ohne Animation)

Wir legen die Desktop-Variante an — erstmal als statische Version mit Sticky-Container und Full-Screen-Video, aber **ohne** Scroll-Animation. So sehen wir, dass das Layout grundsätzlich steht.

**Files:**
- Create: `src/components/werkstatt/WerkstattVideoScroll.tsx`

- [ ] **Step 1: Datei anlegen**

`src/components/werkstatt/WerkstattVideoScroll.tsx`:
```tsx
"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WerkstattVariantProps } from "./types";

const ease = [0.22, 1, 0.36, 1] as const;
const SCROLL_HEIGHT = 900; // px Scroll-Strecke für die Reveal-Animation

export default function WerkstattVideoScroll({
  videoSrc,
  posterSrc,
  eyebrow,
  headline,
  subline,
}: WerkstattVariantProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoErrored, setVideoErrored] = useState(false);

  const inView = useInView(stickyRef, {
    margin: "-15% 0px -15% 0px",
    amount: 0.4,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!videoSrc || reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reducedMotion, videoSrc]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  const showVideo = videoSrc && !videoErrored;

  return (
    <section ref={sectionRef} className="relative bg-[#F7F3EE]">
      {/* Header-Block (oberhalb des Sticky-Containers) */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-28 md:pt-32 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.49, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#EA0100]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#EA0100] sm:text-[11px]">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.07 }}
            className="mt-5 font-serif text-[2rem] font-medium leading-[1.04] tracking-tight text-[#2C2725] sm:text-4xl md:text-[3rem] lg:text-[3.4rem]"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.49, ease, delay: 0.14 }}
            className="mt-5 max-w-xl text-[14px] font-light leading-relaxed text-[#2C2725]/70 sm:text-base"
          >
            {subline}
          </motion.p>
        </div>
      </div>

      {/* Sticky-Scroll-Container */}
      <div style={{ height: `calc(${SCROLL_HEIGHT}px + 100vh)` }} className="relative w-full">
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ willChange: "clip-path" }}
        >
          {showVideo ? (
            <>
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                preload="metadata"
                loop
                className="h-full w-full object-cover"
                aria-label="Treventi Werkstatt — Produktionsprozess"
                onError={() => setVideoErrored(true)}
              />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
                aria-pressed={!muted}
                className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white/90 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA0100]"
              >
                {muted ? <VolumeX size={18} strokeWidth={1.6} /> : <Volume2 size={18} strokeWidth={1.6} />}
              </button>
            </>
          ) : (
            <>
              <Image
                src={posterSrc}
                alt="Treventi Werkstatt — Vorschau"
                fill
                sizes="100vw"
                className="object-cover brightness-[0.65]"
                priority={false}
              />
              <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.28em] text-white/70">
                Bald · Video
              </span>
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-black/35 ring-2 ring-[#EA0100]/70 backdrop-blur-sm">
                  <Play size={26} strokeWidth={1.6} className="ml-1 text-white" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: Keine Fehler in der neuen Datei.

- [ ] **Step 3: Commit**

```bash
git add src/components/werkstatt/WerkstattVideoScroll.tsx
git commit -m "feat(werkstatt): WerkstattVideoScroll Grundgerüst (ohne Animation)"
```

---

## Task 5: Wrapper auf Desktop-Variante umschalten + Browser-Test

**Files:**
- Modify: `src/components/WerkstattVideo.tsx`

- [ ] **Step 1: Wrapper aktualisieren**

`src/components/WerkstattVideo.tsx`:
```tsx
import WerkstattVideoStatic from "./werkstatt/WerkstattVideoStatic";
import WerkstattVideoScroll from "./werkstatt/WerkstattVideoScroll";
import type { WerkstattVariantProps } from "./werkstatt/types";

const config: WerkstattVariantProps = {
  videoSrc: undefined,
  posterSrc: "/hero/treventi-DSC04385-COPY.jpg",
  eyebrow: "Einblick",
  headline: "20 Sekunden in unserer Werkstatt.",
  subline: "Ein Blick hinter die Türen unserer Manufaktur in Prishtina.",
};

export default function WerkstattVideo() {
  return (
    <>
      <div className="md:hidden">
        <WerkstattVideoStatic {...config} />
      </div>
      <div className="hidden md:block">
        <WerkstattVideoScroll {...config} />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Browser-Verifikation (Dev-Server läuft noch)**

Öffne `http://localhost:3000` in Desktop-Breite (≥ 768 px).
- Erwartet: Header-Block sichtbar. Beim Weiterscrollen erscheint Sticky-Container in Full-Screen-Größe (schwarz mit Poster-Bild + Play-Button mittig). Beim Weiterscrollen bleibt der Container 100 vh hoch sticky, bis 900 px Scroll-Strecke vorbei sind, dann scrollt die Seite normal weiter zur nächsten Sektion.
- Noch **keine Clip-Path-Animation** — das Video-Fenster ist von Anfang an full-screen. Nur der Sticky-Effekt soll bereits funktionieren.

Mobile-Test: Browser-Fenster < 768 px ziehen — die heutige Static-Variante muss erscheinen (Video im Container, nicht full-screen).

- [ ] **Step 3: Commit**

```bash
git add src/components/WerkstattVideo.tsx
git commit -m "feat(werkstatt): Desktop-Pfad aktiviert (Sticky ohne Clip-Path-Animation)"
```

---

## Task 6: Clip-Path-Animation hinzufügen

Jetzt der Kern: Beim Scrollen wird der Clip-Path von einem zentrierten Rechteck (25%/75%) auf den vollen Viewport (0%/100%) animiert.

**Files:**
- Modify: `src/components/werkstatt/WerkstattVideoScroll.tsx`

- [ ] **Step 1: Imports und Hooks erweitern**

Ersetze in `src/components/werkstatt/WerkstattVideoScroll.tsx` den Import-Block ganz oben:

```tsx
"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WerkstattVariantProps } from "./types";
```

- [ ] **Step 2: Scroll-Hooks im Component-Body einfügen**

Direkt **nach** der Zeile `const reducedMotion = useReducedMotion();` und **vor** dem ersten `useEffect`, füge ein:

```tsx
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const clipStart = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 1], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
```

- [ ] **Step 3: Sticky-Container in motion.div umwandeln + clipPath anwenden**

Ersetze in derselben Datei das `<div ref={stickyRef} ...>` (öffnender Tag) durch ein `<motion.div>`:

**Vorher:**
```tsx
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ willChange: "clip-path" }}
        >
```

**Nachher:**
```tsx
        <motion.div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ clipPath, willChange: "clip-path" }}
        >
```

Und das **schließende** `</div>` (das zum Sticky-Container gehört, direkt vor dem schließenden `</div>` des Wrappers) durch `</motion.div>` ersetzen.

- [ ] **Step 4: Browser-Verifikation**

Dev-Server neu laden (`http://localhost:3000`), zur Werkstatt-Sektion scrollen.
- Erwartet: Wenn der Sektions-Anfang oben am Viewport andockt, erscheint das Video-Fenster als **kleines zentriertes Rechteck (~50 % Breite/Höhe)**. Beim Weiterscrollen wächst es smooth bis full-screen. Bei Scroll-Ende der Sektion (vor nächster Sektion) ist es voll geöffnet.
- Rückscroll-Test: Beim Hochscrollen zieht sich das Fenster wieder zusammen.

Falls das Fenster nicht wächst sondern statisch bleibt: prüfen, dass `sectionRef` am `<section>` und nicht woanders hängt.

- [ ] **Step 5: Commit**

```bash
git add src/components/werkstatt/WerkstattVideoScroll.tsx
git commit -m "feat(werkstatt): Clip-Path-Reveal-Animation beim Scrollen"
```

---

## Task 7: Video-Scale-Push (Ken-Burns-Light)

Sanfter Zoom-Out auf dem Video-/Poster-Element während des Effekts: scale 1.10 → 1.00.

**Files:**
- Modify: `src/components/werkstatt/WerkstattVideoScroll.tsx`

- [ ] **Step 1: scale-Transform hinzufügen**

Direkt **nach** der `clipPath`-Zeile (siehe Task 6, Step 2) ergänze:

```tsx
  const innerScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
```

- [ ] **Step 2: Inneren Wrapper um Video/Poster legen**

In der JSX im `<motion.div ref={stickyRef}>` aktuell direkt `{showVideo ? <>...</> : <>...</>}`. Wickle den gesamten Inhalt in ein `<motion.div>` mit `scale`-Style:

**Vorher:**
```tsx
        <motion.div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ clipPath, willChange: "clip-path" }}
        >
          {showVideo ? (
            <>
              <video ... />
              <button ... />
            </>
          ) : (
            <>
              <Image ... />
              <span ... />
              <div ... />
            </>
          )}
        </motion.div>
```

**Nachher:**
```tsx
        <motion.div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ clipPath, willChange: "clip-path" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: innerScale, willChange: "transform" }}
          >
            {showVideo ? (
              <>
                <video ... />
                <button ... />
              </>
            ) : (
              <>
                <Image ... />
                <span ... />
                <div ... />
              </>
            )}
          </motion.div>
        </motion.div>
```

**Wichtig:** Die `<button>` (Mute-Toggle) und der `<span>` („Bald · Video") sollen **nicht** mitskalieren — ziehe diese beiden Elemente **vor** den `</motion.div>` (Inner-Scale) raus und setze sie direkt in den äußeren Sticky-`motion.div`. Konkret die Struktur:

```tsx
        <motion.div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ clipPath, willChange: "clip-path" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: innerScale, willChange: "transform" }}
          >
            {showVideo ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                preload="metadata"
                loop
                className="h-full w-full object-cover"
                aria-label="Treventi Werkstatt — Produktionsprozess"
                onError={() => setVideoErrored(true)}
              />
            ) : (
              <>
                <Image
                  src={posterSrc}
                  alt="Treventi Werkstatt — Vorschau"
                  fill
                  sizes="100vw"
                  className="object-cover brightness-[0.65]"
                  priority={false}
                />
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-black/35 ring-2 ring-[#EA0100]/70 backdrop-blur-sm">
                    <Play size={26} strokeWidth={1.6} className="ml-1 text-white" />
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* UI-Overlays — nicht mitskaliert */}
          {showVideo ? (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
              aria-pressed={!muted}
              className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white/90 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA0100]"
            >
              {muted ? <VolumeX size={18} strokeWidth={1.6} /> : <Volume2 size={18} strokeWidth={1.6} />}
            </button>
          ) : (
            <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.28em] text-white/70">
              Bald · Video
            </span>
          )}
        </motion.div>
```

- [ ] **Step 2: Browser-Verifikation**

`http://localhost:3000` neu laden, scrollen.
- Erwartet: Während sich das Clip-Path-Fenster öffnet, zoomt das Bild dahinter sanft heraus (von 110 % auf 100 %). Mute-Button bleibt unten-rechts statisch positioniert (skaliert NICHT mit).

- [ ] **Step 3: Commit**

```bash
git add src/components/werkstatt/WerkstattVideoScroll.tsx
git commit -m "feat(werkstatt): Ken-Burns-Light Scale-Push während Reveal"
```

---

## Task 8: Reduced-Motion-Fallback

User mit `prefers-reduced-motion: reduce` bekommen die Static-Variante auch auf Desktop.

**Files:**
- Modify: `src/components/WerkstattVideo.tsx`

- [ ] **Step 1: useReducedMotion-Check in den Wrapper holen**

Wrapper muss Client-Component werden, weil wir den Hook brauchen.

`src/components/WerkstattVideo.tsx`:
```tsx
"use client";

import { useReducedMotion } from "framer-motion";
import WerkstattVideoStatic from "./werkstatt/WerkstattVideoStatic";
import WerkstattVideoScroll from "./werkstatt/WerkstattVideoScroll";
import type { WerkstattVariantProps } from "./werkstatt/types";

const config: WerkstattVariantProps = {
  videoSrc: undefined,
  posterSrc: "/hero/treventi-DSC04385-COPY.jpg",
  eyebrow: "Einblick",
  headline: "20 Sekunden in unserer Werkstatt.",
  subline: "Ein Blick hinter die Türen unserer Manufaktur in Prishtina.",
};

export default function WerkstattVideo() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className="md:hidden">
        <WerkstattVideoStatic {...config} />
      </div>
      <div className="hidden md:block">
        {reducedMotion ? (
          <WerkstattVideoStatic {...config} />
        ) : (
          <WerkstattVideoScroll {...config} />
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Browser-Verifikation Reduced-Motion**

In macOS: **System-Einstellungen → Bedienungshilfen → Anzeige → „Bewegung reduzieren"** aktivieren. Browser-Reload.
- Erwartet: Werkstatt-Sektion zeigt jetzt **die Static-Variante** (Video im Container, kein Sticky, kein Clip-Path). Header bleibt identisch.

Reduced-Motion wieder deaktivieren — Effekt muss zurückkommen.

(Chrome DevTools-Alternative: DevTools → Rendering-Panel → „Emulate CSS media feature prefers-reduced-motion: reduce".)

- [ ] **Step 3: Commit**

```bash
git add src/components/WerkstattVideo.tsx
git commit -m "feat(werkstatt): Reduced-Motion-Fallback auf Static-Variante"
```

---

## Task 9: Test-Video einbinden (mit Fallback wenn nicht vorhanden)

Wir aktivieren den `videoSrc`-Pfad. Wenn die Datei `public/video/werkstatt-placeholder.mp4` existiert, läuft das Video. Wenn nicht, greift der `onError`-Fallback automatisch und zeigt Poster + Badge (wie bisher).

**Files:**
- Modify: `src/components/WerkstattVideo.tsx`

- [ ] **Step 1: videoSrc setzen**

In `src/components/WerkstattVideo.tsx` die `config`-Konstante ändern:

```tsx
const config: WerkstattVariantProps = {
  videoSrc: "/video/werkstatt-placeholder.mp4",
  posterSrc: "/hero/treventi-DSC04385-COPY.jpg",
  eyebrow: "Einblick",
  headline: "20 Sekunden in unserer Werkstatt.",
  subline: "Ein Blick hinter die Türen unserer Manufaktur in Prishtina.",
};
```

- [ ] **Step 2: Hinweis an den Nutzer**

**Aktion außerhalb des Codes:** Eine kurze MP4-Datei (z. B. 10–20 Sek. Werkstatt-Footage, möglichst ≤ 8 MB, H.264) unter folgendem Pfad ablegen:

```
/Users/j.tengl/Desktop/treventi-dach-website/public/video/werkstatt-placeholder.mp4
```

Falls noch keine Datei vorliegt: ist OK. Der Code zeigt dann automatisch wieder Poster + „Bald · Video"-Badge (durch `onError`-Handler), die Animation läuft trotzdem.

- [ ] **Step 3: Browser-Verifikation**

`http://localhost:3000` neu laden.
- **Mit Test-Video vorhanden:** Während des Reveal-Effekts läuft das Video autoplay (gemutet) im Loop. Beim Scrollen aus dem View pausiert es. Mute-Button toggled Ton.
- **Ohne Test-Video:** Nach kurzem Lade-Versuch (Network-Tab zeigt 404 für `werkstatt-placeholder.mp4`) greift der Fallback und es erscheinen Poster + Badge + Play-Button (wie zuvor).

- [ ] **Step 4: Commit**

```bash
git add src/components/WerkstattVideo.tsx
git commit -m "feat(werkstatt): Test-Video-Pfad aktiviert (mit Poster-Fallback bei Fehler)"
```

---

## Task 10: Final-QA & Build-Check

**Files:**
- (nur Verifikation)

- [ ] **Step 1: Production-Build prüfen**

Dev-Server stoppen (`Ctrl+C`), dann:

Run: `npm run build`
Expected: Build läuft durch, keine TypeScript-Fehler, keine ESLint-Errors. Falls Warnings auftauchen, lesen — bei betroffener Komponente fixen.

- [ ] **Step 2: Production-Preview testen**

Run: `npm start`
Expected: Server startet auf `http://localhost:3000`.

Browser-Smoke-Test in Production-Build:
- Desktop (Chrome, Safari): Reveal-Effekt smooth, kein Jank.
- Mobile (Chrome-DevTools-Emulation < 768 px): Static-Variante, identisch zu vorher.
- Reduced-Motion: Static-Variante auch auf Desktop.

- [ ] **Step 3: Final-Commit (falls noch ungetrackte Änderungen)**

```bash
git status
```

Falls alles bereits committed: fertig. Falls noch was offen: einzeln committen mit klarer Message.

---

## Self-Review-Notizen (für den Worker)

- Bei Problemen mit Sticky in iOS Safari: prüfen, ob ein Vorfahr-Element `transform`, `filter` oder `perspective` gesetzt hat — das bricht `position: sticky`. Bei Bedarf in der Sektion entfernen.
- `useScroll({ target, offset: ["start start", "end end"] })` heißt: Animation startet, wenn der Sektions-Start am Viewport-Start andockt, und endet, wenn das Sektions-Ende am Viewport-Ende andockt. Bei einer Sektions-Höhe von `100vh + 900px` ergibt das eine Animation, die über genau die 900 px Scroll-Strecke läuft, während der Sticky-Container oben festklebt.
- Falls die Clip-Path-Animation zu schnell wirkt: `SCROLL_HEIGHT` in `WerkstattVideoScroll.tsx` erhöhen (z. B. auf 1200). Falls zu lang: reduzieren (z. B. auf 700).
- Falls in Chrome DevTools „Layout Shift" zur Werkstatt-Sektion auftaucht: Poster-Bild-Aspect-Ratio prüfen.
