# Spec — Prozess-Seite (`/prozess`)

**Datum:** 2026-05-12
**Branch:** feat/werkstatt-scroll-animation (oder neuer Feature-Branch `feat/prozess-page`)
**Status:** Draft — wartet auf Nutzer-Review

---

## 1. Ziel & Kontext

Auf der DACH-Hauptseite verweist die Komponente `BespokeSketch` (`src/components/BespokeSketch.tsx:396`) per CTA „MEHR ÜBER UNSEREN PROZESS" auf den Anker `#prozess`. Dieser Anker existiert aktuell nicht. Wir bauen eine eigene Unterseite unter der Route `/prozess`, die den Klick einlöst und den Treventi-Produktionsprozess erzählt — in der gleichen Designsprache wie die übrigen Unterseiten (`/ueber-uns`, `/spezialanfertigungen`, `/kollektion/modern`).

Die Referenz `treventigroup.com/production/` (Schwester-Brand, Kosovo) ist inhaltlich zu dünn (Headline + Marketing-Absatz + Bild-Galerie), um den DACH-Erwartungen an Architekten/Bauträger gerecht zu werden. Die DACH-Version erzählt deshalb eine echte, animierte Prozess-Story in 5 Schritten — bleibt aber stilistisch in der Treventi-Welt (Blueprint/Skizzen-Ästhetik, Karopapier, Cream + Ink + Red).

**Erfolgskriterien:**
- CTA aus `BespokeSketch` führt zur neuen Seite und der Nutzer versteht innerhalb von 15 Sekunden Scrollen, dass Treventi seine Türen vom Konzept bis zur Auslieferung selbst fertigt.
- Visuell konsistent mit `/ueber-uns` und `BespokeSketch` (gleiche Farben, Typo, Animations-Sprache).
- Performance: Page-Load < 2 s auf Desktop-Breitband, keine externen Videos/Assets, alle Animationen rein SVG + framer-motion.
- Mobile: Layout staked sauber, Animationen behalten Wirkung.

## 2. Route & Verknüpfung

- **Neue Route:** `src/app/prozess/page.tsx` (Next.js App Router, Client Component wegen framer-motion).
- **CTA-Update:** In `src/components/BespokeSketch.tsx:396` ändert sich `href="#prozess"` zu `href="/prozess"`.
- **Kein Footer-Update nötig:** Footer-Links bleiben unverändert (Sub-Seite wird über die Sektion erreicht, nicht über die globale Navigation).

## 3. Designsprache (geerbt vom restlichen Site)

| Token | Wert |
|---|---|
| Hintergrund | `#F7F3EE` |
| Ink (Text/Linien) | `#2C2725` |
| Red (Akzent) | `#EA0100` |
| Karopapier | `linear-gradient(...)` 32 × 32 px, Opacity 0.55 — wie in `BespokeSketch.tsx:40` |
| Easing | `[0.22, 1, 0.36, 1] as const` |
| Headline-Font | Serif (Cormorant, bereits in `layout.tsx`) |
| Mono-Font | `ui-monospace, SFMono-Regular, Menlo, monospace` für technische Labels |
| Section-Padding | `py-24 sm:py-28 md:py-32` (Großsektion), `py-16 sm:py-20` (Kleinsektion) |
| Container | `max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20` |

## 4. Seitenaufbau (Sektionen, von oben nach unten)

### 4.1 Top-Bar
- Logo links (`/treventi-logo-black.svg`, `h-6 sm:h-7`).
- „Zurück zur Startseite"-Link rechts mit `ArrowLeft`-Icon (Pattern aus `ueber-uns/page.tsx:72-90` übernehmen, gleiche Klassen).
- Wrapper: `max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-6 sm:pt-8`.

### 4.2 Hero
- Eyebrow: rote Linie + Mono-Caps „UNSER PROZESS".
- Headline (Mask-Reveal pro Zeile, wie `MaskLine` in `ueber-uns/page.tsx:13-27`):
  > Vom ersten Strich
  > bis zur fertigen Tür.
- Sub-Headline (Fade-Up, Delay 0.4 s):
  > In fünf Schritten entsteht in unserer eigenen Manufaktur in Prishtina jede Treventi-Tür — von Hand kontrolliert, in DACH ausgeliefert.
- Dezenter Down-Pfeil oder Scroll-Hint (optional, leise).
- Layout: zentriert, vertikal-padded, Karopapier-Pattern im Hintergrund.

### 4.3 Intro / Manifest
- Schmale Sektion (`max-w-3xl`), zentriert, Fade-Up.
- 2 kurze Absätze:
  > „Jede Tür durchläuft fünf Stationen. Keine davon ist outsourced — alle finden in unserer eigenen Fabrik statt."
  > „Das ist nicht nur Romantik. Es ist der Grund, warum wir innerhalb von 48 Stunden Auskunft geben können, warum Maße bis auf den Millimeter passen, und warum jede Tür unsere finale Qualitätskontrolle persönlich passiert."

### 4.4 5 Prozess-Schritte (Kern der Seite)

Konfiguriert als Array `steps`:

```ts
type Step = {
  num: "01" | "02" | "03" | "04" | "05";
  eyebrow: string;       // Mono-Caps, kleiner Untertitel
  title: string;         // Serif, große Step-Headline
  body: string;          // 1 Absatz, max 2-3 Sätze
  bullets: string[];     // 2-3 stichpunktartige Highlights
  Sketch: React.FC<{ inView: boolean }>;  // animierte SVG-Komponente
};

const steps: Step[] = [
  {
    num: "01",
    eyebrow: "Beratung & Skizze",
    title: "Vom Gespräch zur Zeichnung.",
    body: "Ihre Vorstellung wird zur technischen Zeichnung — Maße, Holzart, Stil, Einbausituation. Wir prüfen die Machbarkeit und melden uns innerhalb von 48 Stunden mit einem ersten Konzept.",
    bullets: ["Persönliche Beratung", "Technische Zeichnung", "Rückmeldung in 48 h"],
    Sketch: SketchStep1, // Klemmbrett mit Türskizze, Stift, Maße fliegen ein
  },
  {
    num: "02",
    eyebrow: "Holz & Zuschnitt",
    title: "Material trifft Präzision.",
    body: "Sorgfältig ausgewähltes Massivholz aus europäischen Quellen wird auf den Millimeter zugeschnitten. CNC-gesteuert, von Meisterhand überwacht.",
    bullets: ["Europäisches Massivholz", "CNC-präziser Zuschnitt", "Millimetergenau"],
    Sketch: SketchStep2, // Holzbohle/-stamm mit Säge-Linie, Maße + "Eiche Massiv"-Label
  },
  {
    num: "03",
    eyebrow: "Konstruktion & Furnier",
    title: "Schicht für Schicht stabil.",
    body: "Stabile Kernkonstruktion, gefolgt vom Furnier nach Ihrer Wahl. Wir verleimen, pressen, kontrollieren — bis jede Schicht hält, was sie verspricht.",
    bullets: ["Stabile Kernschicht", "Edelfurnier nach Wahl", "Druck-verleimt"],
    Sketch: SketchStep3, // Tür-Querschnitt: Rahmen + Kern + 3 Furnier-Schichten, exploded layers
  },
  {
    num: "04",
    eyebrow: "Oberfläche",
    title: "Die letzte Verwandlung.",
    body: "Mehrlagiger Auftrag: Lack, Öl oder Beize — je nach gewünschter Optik. Zwischen jedem Auftrag wird geschliffen. Erst dann sieht das Holz aus wie es soll.",
    bullets: ["Lack, Öl oder Beize", "Mehrlagiger Auftrag", "Zwischenschliff"],
    Sketch: SketchStep4, // Tür-Profil mit drei stapelnden Lack-Schichten + Schleif-Marke
  },
  {
    num: "05",
    eyebrow: "Montage & Auslieferung",
    title: "Bereit für Ihren Raum.",
    body: "Beschläge montiert, Hängung geprüft, finale Qualitätskontrolle. Dann sicher verpackt und DACH-weit geliefert.",
    bullets: ["Beschläge & Hängung", "Finale Qualitätskontrolle", "DACH-weite Lieferung"],
    Sketch: SketchStep5, // Komplette Tür mit Beschlägen + Pfeil → DACH-Karte/LKW-Symbol
  },
];
```

**Layout pro Step (Desktop ≥ md):**
- 12-Column Grid mit `gap-16`.
- **Alternierend**: Sketches Step 01/03/05 links (`col-span-6`), Text rechts (`col-span-6`); Sketches Step 02/04 rechts, Text links (umgekehrte Anordnung).
- Sketch sitzt in einem Container mit `aspect-square` oder festem Viewport (z.B. `aspect-[4/5]`), zentriert, mit Eckmarken (wiederverwenden: `CornerMarks` aus `BespokeSketch.tsx:465-485`).
- Text-Block: Step-Nummer (groß, serif, in Ink/40), Eyebrow (Mono-Caps, rot), Headline (Serif, ~`text-[2rem] md:text-[2.4rem]`), Body (`text-[15px] md:text-[17px] font-light`), Bullets (Check-Icon-Liste wie in BespokeSketch).

**Layout pro Step (Mobile < md):**
- Stack vertikal: Sketch oben (volle Breite, aspect-square), Text drunter.
- Step-Nummer und Eyebrow stehen oben über dem Sketch.

**Step-Trenner:**
- Zwischen den Steps eine dezente Trennlinie: `<div className="mx-auto h-px max-w-7xl bg-[#2C2725]/08" />` mit `mt-24 mb-24 sm:mt-28 sm:mb-28`.

**Animationen:**
- Sketch zeichnet sich per `pathLength`-Animation, wenn die Step-Sektion in den Viewport scrollt (`useInView` mit `{ once: true, amount: 0.25 }`).
- Sequenz pro Sketch: Basis-Linien zuerst (0–0.8 s), Detail-Linien gestaffelt (0.6–1.5 s), rote Maß-/Akzent-Labels zuletzt (1.4–2.4 s) — analog zur Sequenz in `BespokeSketch.tsx:67-317`.
- Text-Block: Eyebrow (Delay 0.1 s), Headline (Delay 0.2 s), Body (Delay 0.35 s), Bullets gestaffelt (Delay 0.5 s + i × 0.07 s).

### 4.5 Trust-Zahlen
- Sektion mit dunklem Akzent-Hintergrund (`bg-[#2C2725]` oder `bg-[#7a1020]`/burgundy, je nach Test) — bricht visuell die Cream-Folge und schafft Atmosphäre.
- 4 Zahlen nebeneinander (`grid-cols-2 md:grid-cols-4`):
  1. „12+" — „Jahre Manufaktur"
  2. „100 %" — „Eigene Produktion"
  3. „48 h" — „Rückmeldung"
  4. „DACH" — „Auslieferung"
- Zahlen-Style: serif, sehr groß (`text-[4rem] md:text-[5rem]`), Sub-Label Mono-Caps klein darunter.
- Animation: Zahlen fadet ein + leichtes Y-Slide bei `useInView`. Kein Count-Up — wirkt billig bei Werten wie „DACH". Statisches Reveal ist eleganter.

### 4.6 Final CTA
- Hintergrund wieder Cream `#F7F3EE`, mit Karopapier-Pattern.
- Zentrierte Headline (Serif, groß): „Ihre Tür beginnt mit einem Gespräch."
- Sub-Text (1 Satz): „Schreiben Sie uns Ihre Vorstellung — wir melden uns innerhalb von 48 Stunden."
- Zwei Buttons (horizontal auf Desktop, gestackt auf Mobile):
  - **Primary**: „Anfrage stellen" → `/kontakt` (Button-Style aus `spezialanfertigungen/page.tsx:101-109`, aber Farbe `#2C2725` statt `#7a1020`, damit es zur Cream-Sektion passt).
  - **Secondary**: „Kollektion ansehen" → `/#kollektion` (border-Style aus `spezialanfertigungen/page.tsx:111-117`).
- Animation: Headline Fade-Up, Buttons gestaffelt fadet ein.

### 4.7 Footer
- Bestehender `<Footer />` aus `src/components/Footer.tsx`. Keine Änderungen.

## 5. Komponenten-Struktur

```
src/app/prozess/
  page.tsx                  # Page-Container, Top-Bar, Hero, Intro, Steps-Section, Trust-Zahlen, CTA, Footer

src/components/prozess/
  ProzessStep.tsx           # generische Step-Komponente (nimmt num, eyebrow, title, body, bullets, Sketch + reversed?: boolean)
  TrustNumbers.tsx          # Trust-Zahlen-Sektion (4er-Grid)
  sketches/
    SketchStep1.tsx         # Klemmbrett + Skizze
    SketchStep2.tsx         # Holzbohle + Säge
    SketchStep3.tsx         # Tür-Querschnitt + Layers
    SketchStep4.tsx         # Oberflächen-Schichten
    SketchStep5.tsx         # Fertige Tür + Versand-Pfeil
```

**Begründung Komponenten-Aufteilung:**
- `ProzessStep` wird 5× aufgerufen — einmal generisch halten statt 5× Code duplizieren. Spart Wartung.
- Jeder Sketch ist eine eigene Datei: SVGs werden lang (vermutlich 50–150 Zeilen pro Sketch), eigene Datei hält `page.tsx` lesbar. Jeder Sketch bekommt eine `inView`-Prop, damit die Animation der Step-Komponente an die Sketch-Komponente delegiert werden kann.
- `TrustNumbers` als eigene Komponente — saubere Trennung, könnte später wiederverwendet werden.

## 6. Wiederverwendete Utilities

- `drawPath(inView, delay, duration)`-Helper und `fadeIn(inView, delay)`-Helper aus `BespokeSketch.tsx:12-25`: in eine geteilte Datei extrahieren → `src/lib/sketch-anim.ts`. Spart Duplikation; BespokeSketch wird leicht angepasst, um aus der gemeinsamen Datei zu importieren.
- `Tick`-Komponente (`BespokeSketch.tsx:418-463`) und `CornerMarks` (`BespokeSketch.tsx:465-485`) ebenfalls in eine geteilte Datei verschieben → `src/components/sketch/SketchPrimitives.tsx`. Dann sowohl von BespokeSketch als auch von den Step-Sketches importierbar.

## 7. Daten-Fluss

- Steps werden als const-Array in `src/app/prozess/page.tsx` definiert (kein Backend, kein CMS). Inhalte sind Marketing-Texte, ändern sich selten.
- Sketches werden direkt importiert und im Array referenziert (`Sketch: SketchStep1`).
- Keine externen API-Calls, keine dynamischen Daten.

## 8. Fehler- & Edge-Cases

- **Reduced motion**: `useReducedMotion()`-Hook von framer-motion in `ProzessStep` und in jedem Sketch abfragen. Wenn aktiv: Sketches zeigen End-State direkt, kein `pathLength`-Drawing, Text-Reveals ersetzen mit kurzem `opacity`-Fade (max 0.2 s).
- **JS deaktiviert**: Sketches als statische SVGs sichtbar (End-State per CSS-Default), Text immer lesbar. Keine Anforderung an Animationen ohne JS.
- **Schmale Viewports**: Alternierende Anordnung greift nur ab `md`. Auf Mobile alle Steps in identischer Stack-Reihenfolge.
- **Sketch-Aspekt**: jede Sketch-Komponente nutzt `viewBox`, skaliert proportional. Container hat `aspect-square` oder definiertes Verhältnis, damit kein Layout-Shift.

## 9. Testing & Verifikation

Frontend, kein automatisiertes Testing-Setup im Projekt. Manuelle Checks:
- Dev-Server starten (`bun dev` oder `npm run dev`), `/prozess` aufrufen.
- Scroll-Verhalten prüfen: alle 5 Sketches animieren beim Eintritt in den Viewport, kein Re-Trigger.
- CTA-Check: Klick auf „MEHR ÜBER UNSEREN PROZESS" in `BespokeSketch` (auf `/`) führt zu `/prozess`.
- Buttons im Final-CTA leiten korrekt nach `/kontakt` und `/#kollektion`.
- Responsive: 375 px, 768 px, 1024 px, 1440 px durchklicken.
- `prefers-reduced-motion`-Flag setzen (DevTools → Rendering) und prüfen, dass keine störenden Animationen laufen.
- Lighthouse-Check für Performance/Accessibility.

## 10. Out of Scope

- Echte Produktionsfotos (wir bleiben pure Skizzen-Animation).
- `marketing.mp4`-Einbindung auf dieser Seite (kommt potenziell auf andere Sektion).
- CMS-Integration der Step-Inhalte.
- Mehrsprachigkeit (Seite bleibt deutsch).
- Higgsfield-generierte Videos/Bilder (wurden besprochen, sind aber nicht nötig).
- Automatisierte Tests (Projekt hat keine Test-Suite).

## 11. Offene Fragen

Keine — alle Punkte sind durch das Briefing geklärt. Falls beim Plan oder bei der Implementierung Detailfragen auftauchen, werden sie dort entschieden.
