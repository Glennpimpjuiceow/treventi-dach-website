# Treventi DACH — Workflow für Partner

Hi! Du wurdest als Admin-Collaborator zum Repo eingeladen.

**Repo:** https://github.com/Glennpimpjuiceow/treventi-dach-website
**Status:** Stand 10.05.2026 — Sektionen 1-5 fertig

---

## 1. Einmal-Setup (~10 Min)

### Was du brauchst
- **Node.js** (Version 20 oder höher) — https://nodejs.org
- **Git** — auf macOS bereits dabei, sonst https://git-scm.com
- **Code-Editor** (z.B. VS Code) — https://code.visualstudio.com
- **GitHub-Account** — du hast bereits einen ✅

### Repo klonen
Im Terminal:

```bash
cd ~/Documents     # oder wo immer du Projekte ablegst
git clone https://github.com/Glennpimpjuiceow/treventi-dach-website.git
cd treventi-dach-website
```

Beim ersten Klon fragt Git nach Login:
- **Username:** `jonastheo2009-ship-it`
- **Password:** ein **Personal Access Token** (NICHT dein GitHub-Passwort!)
  → Erstelle eines hier: https://github.com/settings/tokens/new
  → Scope: `repo` ankreuzen
  → Token kopieren und als Passwort eingeben
  → macOS speichert es automatisch im Schlüsselbund

### Dependencies installieren
```bash
npm install
```
Lädt alle externen Pakete (~2 Min).

### Website starten
```bash
npm run dev
```
→ http://localhost:3000

---

## 2. Täglicher Workflow

### Bevor du anfängst zu arbeiten
**Immer zuerst die neusten Änderungen ziehen:**
```bash
git pull
```

### Dann arbeiten
- Code editieren in VS Code
- Speichern → Browser auf localhost:3000 reloaded automatisch

### Wenn du fertig bist mit einem Stück Arbeit
```bash
git add .
git commit -m "kurze Beschreibung was du gemacht hast"
git push
```

**Beispiele für gute Commit-Messages:**
- `feat: Sektion 6 — USP/Vorteile hinzugefügt`
- `fix: Hero-Bild auf Mobile zu klein`
- `style: Farben in Trust Bar angepasst`

---

## 3. Was wo liegt

```
src/
├── app/
│   ├── page.tsx          # Homepage — bindet alle Sektionen ein
│   ├── layout.tsx        # Root Layout (Fonts, HTML-Lang)
│   └── globals.css       # Tailwind + CSS-Variablen
├── components/
│   ├── Hero.tsx                # Sektion 1
│   ├── IntroGate.tsx           # Particle-Intro
│   ├── TrustBar.tsx            # Sektion 2
│   ├── AboutTreventi.tsx       # Sektion 3
│   ├── Collection.tsx          # Sektion 4 (überarbeitet 10.05)
│   ├── BespokeSketch.tsx       # Sektion 5 (NEU 10.05)
│   └── MotionProvider.tsx
└── lib/
    └── utils.ts          # cn() Helper

public/
├── doors/                # 91 echte Treventi-Türfotos
├── hero/                 # Hero-Bilder
└── treventi-logo-*.svg
```

---

## 4. Brand-System

### Farben (in `src/app/globals.css`)
- Hintergrund Weinrot: `#7A1020`
- Akzent Knallrot: `#EA0100`
- Text auf hell: `#2C2725`
- Cremeweiß (heller Bereich): `#F7F3EE`

### Schriften
- **Cormorant Garamond** — alle Headlines (Serif)
- **Inter** — Body-Text und UI

⚠ **Wichtige Regel:** Maximal 3-4 Schriftarten auf der Website (aktuell 2). Diese Regel gilt für alle weiteren Sektionen.

### Animations-Pattern
Alle Sektionen nutzen **Framer Motion** mit `whileInView`. Konsistente Easing-Curve:
```ts
const ease = [0.22, 1, 0.36, 1] as const;
```

---

## 5. Was als nächstes ansteht

- [ ] Sektion 6 — USP / Vorteile
- [ ] Sektion 7 — Referenzen / Projekte
- [ ] Sektion 8 — Testimonials
- [ ] Sektion 9 — CTA Block
- [ ] Sektion 10 — Kontaktformular
- [ ] Sektion 11 — Footer

---

## 6. Kommunikation

- Glenn (Owner): jonastheo2009@gmail.com
- Bei Fragen zum Code: zuerst die Datei `START_HIER.md` und `CLAUDE.md` im Repo lesen

---

## 7. Häufige Fehler & Lösungen

**„npm install" schlägt fehl:**
→ Node.js-Version prüfen: `node -v` muss 20+ sein

**„git pull" zeigt Conflicts:**
→ Erst Glenn fragen welche Änderungen Vorrang haben

**Port 3000 belegt:**
→ Next.js sucht automatisch nächsten freien Port (3001 etc.)

**Bilder fehlen lokal:**
→ Prüfen ob `public/doors/` und `public/hero/` existieren — falls nicht, `git pull` nochmal
