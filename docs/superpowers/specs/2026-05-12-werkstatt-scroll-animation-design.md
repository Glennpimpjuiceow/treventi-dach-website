# Werkstatt-Video: Sticky Scroll-Reveal-Animation

**Datum:** 2026-05-12
**Status:** Design genehmigt — bereit für Implementation-Plan
**Komponente:** `src/components/WerkstattVideo.tsx`
**Eingebunden in:** `src/app/page.tsx` (Sektion 6)

---

## 1. Ziel

Die bestehende Werkstatt-Video-Sektion auf der Treventi-Startseite bekommt einen Scroll-getriebenen Reveal-Effekt: Beim Hineinscrollen öffnet sich ein zentriertes Video-„Fenster" über einen Clip-Path von einem kleinen Mittel-Rechteck (~50 % Viewport-Größe) auf den kompletten Viewport. Das Sticky-Container „klebt" während des Effekts oben. Auf Mobile (< 768 px) bleibt die heutige Static-Darstellung (kein Sticky, kein Clip-Path).

Visueller Referenz-Code: vom Nutzer bereitgestelltes `SmoothScrollHero`-Snippet (`framer-motion` + `useScroll` + `useTransform` + `useMotionTemplate` mit Clip-Path).

## 2. Scope

**In Scope**
- Neue Komponente `WerkstattVideoScroll` (Desktop, ≥ 768 px) mit Sticky-Clip-Path-Animation.
- Refactor von `WerkstattVideo.tsx` zum Wrapper, der Desktop- und Mobile-Variante via Tailwind-Visibility-Switch zeigt.
- Mobile-Variante `WerkstattVideoStatic` übernimmt die heutige Implementierung 1:1.
- Test-Video als Platzhalter in `/public/videos/werkstatt-placeholder.mp4` (CC0/freie Quelle, später vom Nutzer ersetzt).
- Mute-Toggle + Auto-Play-bei-in-View in beiden Varianten beibehalten.

**Out of Scope**
- Echtes Werkstatt-Video produzieren (kommt später vom Nutzer).
- Weitere Sektionen der Startseite.
- Wechsel des Animations-Frameworks (bleibt `framer-motion`, wie restliche Seite).
- Globale Performance-Optimierungen außerhalb dieser Sektion.

## 3. Architektur

```
src/components/WerkstattVideo.tsx        Wrapper — entscheidet via Tailwind, welche Variante sichtbar ist.
src/components/werkstatt/
  WerkstattVideoStatic.tsx               Mobile (< md). Aktueller Code, leicht extrahiert.
  WerkstattVideoScroll.tsx               Desktop (≥ md). Sticky + Clip-Path-Reveal.
public/videos/
  werkstatt-placeholder.mp4              Test-Video (~5–10 MB, später ersetzt).
```

**Sichtbarkeits-Switch:** `hidden md:block` (Desktop) und `md:hidden` (Mobile) — kein JS-Mediaquery, SSR-sicher.

**Warum splitten:** Sticky-/Clip-Path-Logik plus Static-Logik in einer Datei wird unübersichtlich. Getrennte Dateien lassen sich isoliert lesen, ändern und testen. Wrapper bleibt schlank (~20 Zeilen), beide Varianten unter ~150 Zeilen.

**Wiederverwendung:** Konstanten (Poster-Pfad, Video-Src, Ease-Kurve) werden im Wrapper definiert und an beide Varianten via Props übergeben. So gibt es genau eine Quelle für Video-Pfad und Header-Text.

## 4. Animations-Mechanik (Desktop)

Wrapper-Höhe: `calc(900px + 100vh)` — d. h. die Sektion ist 100 vh + 900 px Scroll-Strecke hoch. Der Sticky-Inner-Container ist `h-screen`.

| Parameter | Wert | Begründung |
|---|---|---|
| `scrollHeight` | **900 px** | Reduziert vom Original-Snippet (1500 px) auf 60 %. Effekt bleibt spürbar, Scroll-Strecke erträglich. |
| Clip-Path Start (Top-Left) | `25% / 25%` | Rechteck nimmt mittige 50 % × 50 % ein. |
| Clip-Path Start (Bot-Right) | `75% / 75%` | — |
| Clip-Path Ende (Top-Left) | `0% / 0%` | Voller Viewport. |
| Clip-Path Ende (Bot-Right) | `100% / 100%` | — |
| Video-Scale (transform) | `1.10` → `1.00` | Sanfter Push (Ken-Burns-Light). Auf `<video>` via `transform: scale()` statt `backgroundSize` (Original-Snippet nutzt ein `<div>` mit Background-Image — wir haben hier ein `<video>`-Element). |
| Easing | linear (Scroll-Mapping) | `useTransform` mapped 1:1 auf `scrollY`. |

**Header-Verhalten:** Headline-Block (`Einblick` / `20 Sekunden in unserer Werkstatt.` / Untertitel) sitzt **vor** dem Sticky-Container im Dokumentfluss. Er scrollt normal nach oben weg, bevor der Effekt beginnt. Kein Fade, kein Stagger. → Klare Lesefolge: erst Kontext lesen, dann Effekt erleben.

**Sektions-Hintergrund:** Wrapper-Hintergrund bleibt `bg-[#F7F3EE]` (Site-Farbe), Sticky-Container hat `bg-black` als Fallback. Der Clip-Path-Bereich zeigt das Video; außerhalb des Clip-Paths sieht man den schwarzen Sticky-Hintergrund.

**Performance-Hinweise:**
- `will-change: clip-path, transform` auf dem Sticky-Container (bereits im Original).
- `prefers-reduced-motion`: bei aktivem Reduce-Motion zeigen wir den End-Zustand (full-screen, kein Scroll-Effekt) oder fallen auf die Static-Variante zurück. **Entscheidung:** Static-Variante als Fallback verwenden (einfacher, konsistenter mit Mobile).

## 5. Video-Verhalten

Identisch in beiden Varianten:

- `<video>` mit `playsInline`, `muted` (Default), `loop`, `preload="metadata"`.
- **Auto-Play / Pause:** `useInView` (framer-motion) triggert `play()` / `pause()`. Schwelle: 40 % sichtbar, Margin `-15% 0px -15% 0px` (wie heute).
- **Mute-Toggle:** Button unten-rechts (wie heute). Default `muted`. Klick toggled.
- **Fehler-Fallback:** Bei `onError` zurück auf Poster-Bild + „BALD · VIDEO"-Badge (heutige Logik bleibt).
- **Platzhalter-Video:** Wir setzen `VIDEO_SRC = "/videos/werkstatt-placeholder.mp4"` (Test-Video, CC0). Damit testet sich der Effekt mit echtem Video. Der Nutzer tauscht später nur die Datei in `/public/videos/` aus — kein Code-Change nötig.
- **Sicherheits-Fallback:** Falls `VIDEO_SRC` jemals auf `undefined` gesetzt wird **oder** das `<video>`-Element `onError` feuert, fällt die Komponente auf Poster-Bild + „BALD · VIDEO"-Badge zurück (heutige Fallback-Logik bleibt im Code).

## 6. Edge Cases & Risiken

| Risiko | Mitigation |
|---|---|
| iOS Safari Sticky-Bug bei `transform`-Parent | Wir setzen `transform` nicht auf einen Vorfahren des Sticky-Containers. Geprüft beim Implementieren. |
| Layout-Shift beim Laden des Test-Videos | `<video preload="metadata">` + festes Aspect-Ratio über Container. |
| User mit `prefers-reduced-motion` | Fallback auf Static-Variante (siehe Abschnitt 4). |
| Lange Scroll-Strecke nervt Nutzer | 900 px ist bereits 40 % weniger als Original. Falls in QA noch zu lang, leicht in `scrollHeight`-Konstante reduzierbar. |
| Test-Video zu groß / lädt langsam | Auf ≤ 8 MB komprimieren, `preload="metadata"` (Datei wird erst beim Play vollständig geladen). |
| SEO / Crawler sehen sticky-Container nicht | Header-Text steht im normalen DOM-Flow, ist für Crawler indexierbar. |

## 7. Testing

Manuell zu prüfen (kein Unit-Test-Setup für UI-Komponenten in diesem Projekt):

- **Desktop (≥ 768 px):**
  - Beim Scrollen wächst das Video-Fenster smooth von Mitte zu Vollbild.
  - Sticky-Verhalten: Container bleibt während der 900 px Scroll-Strecke oben.
  - Nach den 900 px scrollt die Seite normal weiter zur nächsten Sektion.
  - Video startet automatisch bei In-View, pausiert bei Out-of-View.
  - Mute-Toggle funktioniert.
- **Mobile (< 768 px):**
  - Statische Variante, kein Sticky, kein Clip-Path.
  - Identisches Verhalten wie heute.
- **Reduced Motion:**
  - System-Setting „Reduce Motion" aktiv → Static-Variante auch auf Desktop.
- **Browser-Smoke-Test:** Chrome, Safari (macOS + iOS), Firefox.

## 8. Offene Fragen

Keine — Design vollständig.

## 9. Bekannte Nicht-Ziele

- Kein Audio-Auto-Unmute beim Full-Screen-Zustand (bleibt muted, User entscheidet via Toggle).
- Kein Lazy-Loading des Video-Assets über IntersectionObserver — `preload="metadata"` reicht.
- Kein Skip-Button („Animation überspringen") — User kann normal scrollen.
