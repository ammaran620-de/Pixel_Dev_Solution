# PIXEL-DEV SOLUTION — MASTER BUILD SPECIFICATION

**Version 2.0 — Full site rebuild prompt**

---

## PART 0 — HOW TO USE THIS DOCUMENT

**ATTENTION AI ASSISTANT / DEVELOPER:** This document supersedes the previous README as the source of truth for the Pixel-Dev Solution codebase. It defines the design system, information architecture, motion system, and a section-by-section specification for every page.

Read Part 1 and Part 2 before writing any code. When building any individual section, read that section's block in Part 3 in full — each block gives you **Theme → Content → Layout → Animation → Why this wins**, in that order. Part 4 through Part 8 are global rules that apply to everything you build.

**Non-negotiable rules:**

1. Never invent a client name, testimonial, logo, or metric. If a section needs proof and no real proof exists, build the empty state defined in this spec instead.
2. Never ship a section whose content you cannot trace to `content/projects.js` or `content/site.js`.
3. Every animation must be gated behind `prefers-reduced-motion` and must not be required for content to be readable.
4. Build mobile-first. Every section spec includes its mobile collapse.

**Stack:** Next.js App Router 16+, React 19, Tailwind CSS v4, `motion` (framer-motion), `animejs` v4, `lenis`. No GSAP. No three.js.

---

## PART 1 — DESIGN SYSTEM

### 1.1 Positioning (this drives every visual decision)

Pixel-Dev Solution builds computer vision systems that make automated decisions on production lines and in warehouses. One sentence, one business. Web platform work exists but is a supporting service, never a co-equal pillar.

The visual world this draws from: anodized aluminium sensor housings, machine-guard yellow, registration and crop marks on print film, phosphor-green readouts on industrial HMI panels, the specific look of a bounding box drawn over a frame. Not startup SaaS. Not agency portfolio. **A well-built instrument.**

### 1.2 Colour tokens

Defined in `app/globals.css` inside the Tailwind v4 `@theme` block.

```css
@theme {
  /* Surfaces */
  --color-paper:        #F2F1EC;  /* coated stock, slightly grey — main background */
  --color-paper-sunk:   #EAE9E2;  /* recessed panels, table stripes, input fields */
  --color-ink:          #0E1613;  /* near-black with a green cast — primary text */
  --color-slate:        #18211D;  /* inverted section surface, video letterbox */

  /* Signal — reserved for PASS states and interaction only */
  --color-signal:       #1B6B4A;  /* on light: links, active states, pass ticks */
  --color-signal-lit:   #2FD68A;  /* on dark only: phosphor readouts, live indicators */

  /* Attention — reserved for CTA and DETECT states only */
  --color-amber:        #E0922F;  /* beacon amber — primary CTA, defect highlight */

  /* Failure — error states only, never decorative */
  --color-alert:        #C4562F;

  /* Structure */
  --color-muted:        #6E736C;  /* secondary text */
  --color-line:         #E3E2DC;  /* hairline dividers */
  --color-line-strong:  #C9C9C1;  /* card borders, input borders */
}
```

**Colour discipline is the whole trick here.** Green currently appears on links, accents, and highlights simultaneously, which means nothing reads as important. The new rule:

| Colour | Allowed uses | Forbidden |
|---|---|---|
| `signal` | links, active filter pill, pass/verified marks, focus rings | headings, backgrounds, decoration |
| `signal-lit` | only on `slate`/`ink` surfaces — live dots, readouts, drawn bounding boxes | anything on `paper` |
| `amber` | primary CTA button, defect-detected states in demos, one hero accent | body text, borders, more than 2 elements per viewport |
| `alert` | form errors, failure states | anything else |

Contrast floor: 4.5:1 for body text, 3:1 for large text and UI borders. `muted` on `paper` passes; `muted` on `paper-sunk` does not — use `ink` at 70% opacity there instead.

Dark sections (`slate`) are used **only** where video plays. Video against a dark letterbox reads as a monitor feed; against off-white it reads as a stock clip. This is the single highest-leverage colour decision on the site.

### 1.3 Typography

Keep the existing families. They are correct and distinctive.

- **Bricolage Grotesque** — headings, metrics, numerals. Weights 600 and 800. Tracking tightened: `-0.03em` at display sizes, `-0.02em` at h3.
- **Public Sans** — body, UI, forms. Weights 400 and 500.
- **Geist Mono** — the `.mono-tag` class, technical metadata, code, measurements. Weight 400 only.

```css
.h1     { font: 800 clamp(2.6rem, 6vw, 4.6rem)/0.98 var(--font-bricolage); letter-spacing: -0.03em; }
.h2     { font: 700 clamp(1.9rem, 3.6vw, 2.9rem)/1.06 var(--font-bricolage); letter-spacing: -0.025em; }
.h3     { font: 600 clamp(1.15rem, 2vw, 1.45rem)/1.2 var(--font-bricolage); letter-spacing: -0.015em; }
.metric { font: 800 clamp(3rem, 8vw, 6rem)/0.88 var(--font-bricolage); letter-spacing: -0.045em; font-variant-numeric: tabular-nums; }
.body   { font: 400 1.0625rem/1.62 var(--font-public-sans); }
.mono-tag { font: 400 0.6875rem/1 var(--font-geist-mono); letter-spacing: 0.04em; }
```

**Typographic restraint rules:**
- Sentence case everywhere. No all-caps labels — they read as template chrome.
- Never accent a single word of a headline in a different colour or weight.
- No eyebrow label above every heading. An eyebrow is allowed only when it carries real information (a project's industry and year, a step number in an actual sequence).
- Meta strings are separated by a thin vertical rule element, not middle dots.
- No `→` appended to button text. The button says what happens.
- `tabular-nums` on every number that animates or sits in a column.

### 1.4 Spacing, structure and shape

```
Section rhythm:   96px mobile / 140px desktop vertical padding
Container:        .max-w-layout — 1040px, centred, 24px gutter (raised from 1000px)
Reading width:    .max-w-content — 66ch
Grid:             12 columns, 24px gutter desktop / 4 columns, 16px mobile
Radius scale:     0px structural, 2px cards, 4px inputs & buttons, 999px pills only
Border:           1px solid var(--color-line-strong) on cards, var(--color-line) on dividers
Shadow:           none. Depth comes from borders and surface tone, never from blur.
```

The zero-shadow rule matters. Soft grey drop shadows under identical rounded cards is the most common generated-UI signature. Your depth model is **paper stock**: things sit on the surface or are recessed into it.

### 1.5 Icons

SF Symbols cannot be used — Apple licenses it for Apple platforms only, and shipping it on the web is a licence violation. Build the visual quality you want instead:

- **Domain icons drawn in-house** (12 total): defect, dimension, count, read/OCR, track, verify, zone, speed, camera, edge-device, model, alert. Draw them on a 24px grid, 1.5px stroke, square caps, no filled shapes, 90° and 45° angles only. They should look like they were drawn in the same CAD file as the rest of the site.
- **Lucide React** for generic UI only (chevron, close, external, copy, menu). Configure globally at `strokeWidth={1.5}` so it matches the drawn set.
- No emoji anywhere in the interface.

### 1.6 Motion tokens

```js
// lib/motion.js
export const EASE = {
  out:   [0.16, 1, 0.30, 1],    // standard reveal — snappy premium ease-out
  inOut: [0.65, 0, 0.35, 1],    // state changes, layout shifts
  snap:  [0.34, 1.56, 0.64, 1], // brackets, targeting locks — slight overshoot
};

export const DUR = { fast: 0.22, base: 0.5, slow: 0.8, scan: 1.4 };
export const STAGGER = { tight: 0.035, base: 0.07, loose: 0.11 };
```

Anime.js uses **milliseconds**; `motion` uses **seconds**. Multiply by 1000 when crossing over. `duration: 2` in anime.js is a 2ms animation, not 2 seconds — this is the most common bug when mixing the two.

---

## PART 2 — ARCHITECTURE & INFORMATION FLOW

### 2.1 The visitor journey this site must serve

A plant manager or ops director arrives with a specific pain. The site must answer four questions in order, and the architecture exists to answer them:

1. **What is this company?** → Hero. 5 seconds.
2. **Do they handle *my* problem?** → Problems grid. 15 seconds.
3. **Can they actually do it?** → Featured case study, metrics, engineering depth. 90 seconds.
4. **What does it cost, how long, how do I start?** → Engagement model + booking. 30 seconds.

Any section that does not advance one of these four questions gets cut.

### 2.2 Route map

```
/                     Home
/work                 Case study index (filterable)
/work/[slug]          Case study detail
/services             Capabilities in depth — CV primary, web platforms as a subsection
/about                Who builds it, how we work, where we are
/contact              Booking, WhatsApp, email, hours
/careers              → 301 redirect to /contact  (no open roles; do not 404)
/not-found            Custom 404
```

Removed from the previous structure: standalone founder profile pages, the AI Architect job post, and the separate "web platforms" top-level entry.

**On founders:** do not delete the people entirely. For a small studio selling line-critical systems, "who will actually build this" is a top-three buyer question, and an anonymous vendor is a disqualifier. Keep it on `/about` as *"Who you'd be working with"* — name, photo, one line on what they've shipped. Cut the paragraph bios. That is the reframe: not a team page, a competence signal.

### 2.3 Data layer changes

`content/projects.js` — add these fields to the existing schema:

```js
{
  // ...existing fields...
  problemType: "Surface defect",      // NEW — drives the /work filter and the Problems grid
  clientType: "Tier-2 automotive supplier",  // NEW — anonymised client descriptor
  region: "Punjab, PK",               // NEW
  throughput: "240 units/min",        // NEW — line speed the system runs at
  deployment: "Edge (Jetson Orin NX)",// NEW — where the model runs
  clipCaption: "Solder bridge detection at line speed", // NEW — 3-6 words, shown under clip
  outcomes: [                          // NEW — replaces reliance on a single metric
    { label: "Recall on target defect class", value: "99.8%" },
    { label: "False positive rate",           value: "0.4%" },
    { label: "Inference latency",             value: "11 ms" },
  ],
  quote: null,  // stays null until a real, written-permission client quote exists
}
```

`content/site.js` — add:

```js
engagement: {
  pilot:    { label: "Pilot", duration: "2 weeks", price: "from $X",  scope: "..." },
  build:    { label: "Build", duration: "6–10 weeks", price: "from $X", scope: "..." },
  support:  { label: "Support", duration: "monthly", price: "from $X", scope: "..." },
},
problemTypes: [ /* the six problem types, with icon key, title, one-line description */ ],
```

`content/agent-kb.js` — NEW. The grounding corpus for the assistant. Generated from `projects.js` and `site.js`, plus a hand-written FAQ array. Nothing else.

---

## PART 3 — SECTION-BY-SECTION SPECIFICATION

---

### GLOBAL — G1. Navigation

**THEME.** A machine's status bar, not a marketing header. It should feel fixed, thin, and instrument-like. It carries the one action that matters at all times.

**CONTENT.**
- Logo mark + wordmark, links to `/`.
- A visible **Home** item (you asked for this — it goes first in the list, even though the logo also links home; redundancy here is a usability gain, not a flaw).
- Links: Home · Work · Services · About
- Persistent primary CTA: **Book a scoping call**
- Mobile: logo + CTA + hamburger. Menu opens as a full-height panel, not a dropdown.

**LAYOUT.**
```
┌────────────────────────────────────────────────────────────────┐
│ [◧] PIXEL-DEV     Home  Work  Services  About   [Book a call]  │  56px
└────────────────────────────────────────────────────────────────┘
   ↑ 1px bottom border appears only after 40px scroll
```
Height 56px, sticky, `backdrop-blur(8px)` with `paper` at 82% opacity. Border-bottom fades in on scroll rather than being always present.

**ANIMATION.**
- Border and background opacity interpolate with `useScroll` from `motion` between 0 and 40px scroll. No layout shift.
- Active route indicator: a 1px `signal` underline that slides between items using `layoutId` on a `motion.span`. This is the good kind of motion — it shows what changed.
- Mobile panel: clip-path wipe from the top edge, `DUR.base`, `EASE.inOut`. Nav items stagger in at `STAGGER.tight`.
- Nav must not hide on scroll-down. Hiding chrome on a site whose job is conversion costs more than it gains.

**WHY THIS WINS.** The previous nav buried contact at the footer. A persistent CTA in a 56px bar costs nothing visually and removes the "how do I reach them" failure identified in the audit. The sliding underline gives the site one small piece of state-aware motion that no template has.

---

### GLOBAL — G2. Status strip (the marquee)

**THEME.** An instrument readout, not a client logo billboard. This is the element you asked to shrink — the fix is not only smaller, it's *repurposed*.

**CONTENT.** Not logos. Rotating live-feeling system facts, each a short mono string:

```
6 problem classes in production   ·   sub-15ms edge inference   ·   99.8% recall on
target defect classes   ·   deployed on Jetson, x86, and PLC-integrated rigs   ·
2-week paid pilot, accuracy target or no continuation
```

**LAYOUT.** Height 36px (down from whatever it is now). Background `ink`. Text `signal-lit` at 11px mono. Sits directly beneath the nav on `/` only — not sitewide. 32px gap between items, separated by a 1px vertical rule, not a middle dot.

**ANIMATION.**
- CSS `translateX` on a duplicated track, 40s linear, infinite. Duplicate the content array exactly once and translate `-50%` for a seamless loop.
- `animation-play-state: paused` on hover and on focus-within.
- `prefers-reduced-motion`: strip becomes a static, non-scrolling single line showing the first item only.
- A 24px `ink`-to-transparent gradient mask on both edges so items enter and leave rather than being clipped.

**WHY THIS WINS.** A logo marquee with no logos is a credibility hole; a stats marquee at 36px is a credibility *signal* and takes a third of the vertical space. It also gives the page a dark band immediately under the nav, which frames the hero below it.

---

### GLOBAL — G3. The cursor

**THEME.** A camera reticle acquiring a target. This replaces the native `crosshair`, which is an unstyleable thin OS cross that currently reads as unfinished rather than technical.

**CONTENT.** Two layers:
- **Dot** — 4px `ink` square, follows the pointer with near-zero lag.
- **Reticle** — 22px square outline, 1px `ink` at 40% opacity, follows with spring lag.

**LAYOUT / BEHAVIOUR.** `position: fixed`, `pointer-events: none`, `z-index: 9999`. Native cursor hidden via `cursor: none` on `body` at `min-width: 1024px` only.

States:
| Context | Reticle |
|---|---|
| Default | 22px square outline |
| Over link / button | 38px, four L-shaped corner ticks separate out, colour → `signal` |
| Over a video clip | 46px, corner ticks + a mono readout appears beside it showing the clip caption |
| Over text input | collapses to a 2×20px vertical bar |
| Mouse down | scales to 0.85, `DUR.fast` |

**ANIMATION.** Use `motion`'s `useSpring` on `useMotionValue` x/y. Dot: `{ stiffness: 1000, damping: 50 }`. Reticle: `{ stiffness: 320, damping: 28, mass: 0.6 }`. The lag differential between the two layers is what makes it feel like an instrument tracking rather than a decoration following.

Corner ticks use `EASE.snap` so they visibly *lock* on rather than fade in.

**Disable entirely** when: viewport < 1024px, `prefers-reduced-motion: reduce`, or any touch input event has been detected. Restore native cursor in all three cases.

**WHY THIS WINS.** Same concept you already committed to, executed properly. It reuses the `Bracket` visual language so the cursor and the cards speak the same dialect. And because it only appears on desktop, it costs mobile nothing.

---

### GLOBAL — G4. The assistant

**THEME.** A sensor coming online, not a character. No 3D avatar, no mascot. A buyer evaluating a vendor for a line-critical system reads a cartoon assistant as unserious, and a WebGL character costs 500KB+ that your video clips need more.

**CONTENT.**
- Trigger: a 48px bracket-framed button, bottom-right. Inside it, a slowly pulsing reticle. Label on hover: *"Ask about our work"*.
- On open, the assistant opens with a typed line: **"I can answer questions about Pixel-Dev's projects, capabilities, and how we work. What are you trying to solve?"**
- Four suggested prompts as tappable chips:
  - "Can you detect defects at 300 units per minute?"
  - "What does a pilot cost and how long does it take?"
  - "Do your models run on edge hardware or a server?"
  - "Show me a project like mine"
- Grounded strictly on `content/agent-kb.js`. System prompt instructs: answer only from the provided corpus; if the answer isn't there, say so and offer the booking link. **It must never invent a capability, a client, or a number.**
- Every answer that references a project renders a small inline card linking to that case study.

**LAYOUT.** Panel 380×540px desktop, anchored bottom-right, 2px radius, 1px `line-strong` border, `paper` background, no shadow — a 1px `ink` outline at 8% opacity gives separation instead. Full-screen sheet on mobile.

**ANIMATION.**
- Trigger reticle: 3s pulse loop, opacity 0.4 → 1.0, `EASE.inOut`. Stops on hover.
- Open: panel scales from 0.94 with origin at bottom-right, `DUR.base`, `EASE.out`. The trigger's bracket corners fly out to become the panel's corner marks — this is the one piece of showy motion the site gets, and it's user-triggered so it earns its place.
- Streaming replies render token by token; a 2px `signal` caret blinks at the end while generating.
- Close: reverse, `DUR.fast`.

**VOICE (phase 2, not launch).** You asked for an ElevenLabs voice that speaks on click. Build it as an opt-in speaker toggle *inside* the panel, off by default, with the preference stored in `localStorage`. Three reasons it can't be the default: browsers block un-gestured autoplay so the effect will silently fail for most visitors; most B2B visitors are on a work machine with sound off; and per-reply TTS cost scales directly with traffic. Ship text, watch usage, then add voice to the replies people actually read.

**WHY THIS WINS.** It answers question 2 of the visitor journey ("do they handle my problem?") on demand, in the visitor's own words, without them reading six case studies. Grounding it in your real data means it can never oversell — which for this buyer is a feature.

---

### GLOBAL — G5. Footer

**THEME.** A specification plate on the back of a machine. Dense, factual, complete.

**CONTENT.** Four columns: the one-line company description + logo; navigation; contact block pulled from `site.js` (email, WhatsApp, hours, location); and an engagement line ("2-week paid pilot available") with the booking CTA. Bottom bar: copyright, and a real last-updated date.

**LAYOUT.** `slate` background, `paper` text. 4 columns desktop, stacked mobile. Hairline `signal` top border, 1px.

**ANIMATION.** None, beyond link hover underlines. The footer is the one place on the site with zero motion — restraint at the end of the page is a quality signal.

**WHY THIS WINS.** Contact information appearing three times (nav, section CTA, footer) is not repetition, it's coverage. Visitors decide at unpredictable scroll depths.

---

## HOME PAGE

---

### H1. Hero

**THEME.** The most characteristic thing in your world, shown rather than described: a frame being analysed. The hero *is* a demonstration of the product.

**CONTENT.**
- Headline: **"We build vision systems that make the call on the line."**
  (One sentence, active voice, names the business. No accented word, no colour split.)
- Subline, max 20 words: "Defect detection, counting, verification, and OCR for manufacturing and logistics. Deployed on edge hardware, running at line speed."
- Two actions: **Book a scoping call** (amber, primary) and **See the work** (outline, secondary).
- To the right: a live inference visual — see below.

**LAYOUT.**
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  We build vision systems     │  ┌────────────────────────────┐   │
│  that make the call          │  │ ⌐            ¬             │   │
│  on the line.                │  │      [frame + boxes]       │   │
│                              │  │ ∟            ┘  ● 99.4%    │   │
│  Defect detection, counting, │  └────────────────────────────┘   │
│  verification, and OCR…      │   detecting solder bridges        │
│                              │                                   │
│  [Book a scoping call] [See the work]                            │
└──────────────────────────────────────────────────────────────────┘
   7 columns text  |  5 columns visual
```
Desktop: asymmetric 7/5 split, text left, visual right, vertically centred, `min-height: 84vh` (not 100vh — a visible slice of the next section tells the visitor there's more). Mobile: visual moves *above* the headline at 4:3 and the text stacks beneath.

**The visual.** An SVG overlay composited over your best 6-second clip on a `slate` letterbox. Layers: corner registration marks → a bounding box that draws itself around a defect region → a confidence label counting to its final value → a `signal-lit` pass tick. It loops every 8 seconds with a 2s hold.

**ANIMATION.** This is the site's one orchestrated page-load moment. Everything else is quiet by comparison.

Anime.js timeline, fires once on mount:
```js
import { createTimeline, stagger, animate, svg, text, utils } from 'animejs';

const { chars } = text.split(headlineRef.current, { chars: true });

createTimeline({ defaults: { ease: 'outExpo' } })
  .add(chars, {
    opacity: [0, 1], y: [14, 0], filter: ['blur(7px)', 'blur(0px)'],
    duration: 620, delay: stagger(16),
  })
  .add(sublineRef.current, { opacity: [0, 1], y: [10, 0], duration: 500 }, '-=300')
  .add(ctaRefs, { opacity: [0, 1], y: [8, 0], duration: 420, delay: stagger(60) }, '-=350')
  .add(cornerMarks, { opacity: [0, 1], scale: [0.4, 1], duration: 360,
                      delay: stagger(50), ease: 'outBack' }, '-=500')
  .add(svg.createDrawable(boxPath), { draw: ['0 0', '0 1'], duration: 700 }, '-=200')
  .add(confidenceLabel, { opacity: [0, 1], duration: 300 }, '-=150');
```

Rules for this timeline: total runtime under 1.6s; headline text present in the DOM and fully readable before JS executes (animate *from* visible state, never *to* it); entire timeline skipped under `prefers-reduced-motion`, replaced with a static composed frame.

**WHY THIS WINS.** Right now a visitor reads two abstract nouns and has to imagine what you do. Here they watch it happen. The SVG draw-on is genuinely differentiating — nobody in your competitive set has their actual product as their hero animation — and it costs about 4KB of anime.js modules. The 84vh height and the dark visual panel also solve the "what is below" problem that full-height heroes create.

---

### H2. Problems we solve

**THEME.** A parts catalogue. The visitor scans for their own problem and finds it named in their language.

**CONTENT.** Six cards. Each: drawn domain icon, problem title in the buyer's vocabulary, one line of plain description, and a mono line showing a real constraint you've handled.

| Title | Description | Constraint line |
|---|---|---|
| Surface defect detection | Scratches, bridges, voids, and contamination on moving parts. | down to 0.2 mm at 240 units/min |
| Assembly verification | Confirm every component is present, seated, and correct. | 14-point check in 40 ms |
| Label and code reading | OCR and barcode capture on curved, scuffed, or low-contrast surfaces. | 99.6% read rate, no re-scan |
| Counting and dimensioning | Parcel, pallet, and part counts with volumetric measurement. | ±3 mm on moving cartons |
| Zone and safety monitoring | Detect people and equipment entering restricted areas. | sub-100 ms alert to PLC |
| Line speed inspection | Full-rate inspection without slowing the line. | 0 line-rate reduction |

Below the grid, one line: *"Not on this list? The problems we take are the ones with a measurable pass/fail. [Ask the assistant]"* — which opens the agent panel.

**LAYOUT.** 3×2 grid desktop, 2×3 tablet, 1 column mobile. Cards: `paper` on `paper`, separated by 1px `line` dividers rather than boxed borders — a grid of cells in a table, not six floating cards. This deliberately avoids the identical-rounded-card look. 32px internal padding. Icon top-left at 24px, title, description, mono constraint line pinned to the bottom edge of each cell.

**ANIMATION.** Restrained on purpose — six things animating at once is noise.
- Cells fade+rise 12px, `stagger(0.045)` in row-major order, `whileInView` with `{ once: true, margin: "-80px" }`.
- Hover: the cell's background lifts to `paper-sunk`, the icon's stroke animates to `signal` over `DUR.fast`, and `Bracket` corner ticks appear at the cell's four corners. No scale, no lift, no shadow.
- Icons are SVG with `createDrawable` paths — on first reveal only, each icon draws itself in over 400ms. This happens once and is worth it: twelve hand-drawn icons that assemble themselves is a moment of craft.

**WHY THIS WINS.** This is the section that fixes the biggest failure in the audit. "Computer Vision" is abstract; "Assembly verification — 14-point check in 40 ms" lets a buyer recognise their own factory in one glance. The constraint lines do double duty as proof of depth, because only someone who has actually shipped this knows to mention re-scan rates and PLC latency.

---

### H3. Measured results

**THEME.** An instrument panel. Four numbers, no adjectives.

**CONTENT.** Four metrics, each with an exact label and a source qualifier so it reads as measured rather than claimed:

```
99.8%          0.4%             11 ms          8 weeks
recall on      false positive   inference      average scope
target defect  rate, same       deployment     to deployed
classes        deployment       Jetson Orin    system
```
Beneath, in mono: *"Figures from deployed systems. Per-project numbers are on each case study."*

**LAYOUT.** 4-column grid on a `paper-sunk` band, full-bleed, with 1px `line-strong` vertical rules between columns. 2×2 on mobile. `.metric` class for the numbers, `.body` at 0.9rem `muted` for labels. Numbers left-aligned within their column, not centred — centred metric rows are the default treatment and read as a template.

**ANIMATION.**
- `MetricCounter` rebuilt on anime.js for eased counting:
```js
animate({ v: 0 }, {
  v: target, duration: 1500, ease: 'outExpo',
  onRender: ({ targets }) => utils.set(el, { innerHTML: format(targets[0].v) }),
});
```
- Counters fire on `whileInView`, staggered 90ms apart so they finish in sequence, not simultaneously. Simultaneous counting reads as a gimmick; sequential reads as a system reporting.
- The vertical rules draw downward from 0 height as each column enters, `DUR.slow`.
- Reduced motion: final values rendered immediately, rules static.

**WHY THIS WINS.** Adding the qualifier line and the false-positive rate is what separates this from every agency stats bar. Anyone can claim 99.8% recall; publishing your false-positive rate next to it is a signal that you know a high-recall model with a bad FP rate is worthless on a real line. Technical buyers read that instantly.

---

### H4. Featured case study

**THEME.** A monitor feed with an engineering report beside it. The darkest, most confident section on the page.

**CONTENT.** Pulls `projects.find(p => p.featured)`. Renders: `clipCaption` as a mono overlay, `name`, `clientType` + `region` + `year` as a meta line, `line` as the summary, the three `outcomes` as a compact stat row, `stack` as mono chips, and a link through to the full study.

**LAYOUT.**
```
┌──────────────────────────────────────────────────────────────────┐  slate bg
│                                                                  │
│  ┌──────────────────────────┐   Magic QC Inspector               │
│  │                          │   Tier-2 automotive │ Punjab │ 2024│
│  │       [clip, 16:9]       │                                    │
│  │  ● detecting bridges     │   Real-time micro-defect detection │
│  └──────────────────────────┘   on high-speed circuit board…     │
│                                                                  │
│   99.8%        0.4%        11 ms                                 │
│   recall       false pos   latency        [Read the full study]  │
│                                                                  │
│  PyTorch │ TensorRT │ YOLOv8 │ C++ │ Modbus                      │
└──────────────────────────────────────────────────────────────────┘
```
Full-bleed `slate` section. Clip occupies 6 columns, text 5, 1 column gutter. Mobile: clip full-width on top, everything stacks. On `slate`, use `signal-lit` for the live dot and stat values, `paper` for body.

**ANIMATION.**
- Clip: `preload="none"`, poster always present, plays only when ≥50% in view via IntersectionObserver, pauses when out. Never more than two videos playing sitewide at once — enforce this with a small global registry in `lib/clipRegistry.js`.
- On enter: the clip's poster is revealed by a `clip-path` inset wipe from the left, `DUR.scan`, `EASE.out` — the frame appears to be scanned in. Video begins on wipe completion.
- A 1px `signal-lit` scanline sweeps top-to-bottom across the clip once on entry, then never again. One pass, not a loop. A looping scanline reads as decoration; a single pass reads as an event.
- Text column staggers in at `STAGGER.base` after the wipe starts, offset -0.3s.
- Stack chips fade in last, `stagger(0.03)`.

**WHY THIS WINS.** Dark background plus letterboxed video makes your strongest asset look like a monitor feed instead of a stock loop. `clientType` without a client name is credible *and* NDA-safe — "Tier-2 automotive supplier, Punjab" carries more weight than a logo you can't show. Three outcomes instead of one hero metric shows engineering maturity.

---

### H5. How an engagement runs

**THEME.** A process card on a workshop wall. This is the one place numbered markers are legitimate, because the content genuinely is a sequence.

**CONTENT.** Four steps, each with duration and a named deliverable — because "what do I actually get" is the unasked question:

| # | Step | Duration | You receive |
|---|---|---|---|
| 01 | Scope | 1 week | Written spec with a measurable accuracy target |
| 02 | Pilot | 2 weeks | Trained model on your footage + accuracy report |
| 03 | Build | 4–8 weeks | Deployed system on your hardware, integrated to PLC/MES |
| 04 | Hand over | 1 week | Documentation, retraining pipeline, 30-day support |

Below: *"If the pilot doesn't hit the agreed accuracy target, you don't continue to build."*

**LAYOUT.** Horizontal 4-column on desktop with a continuous 1px `line-strong` rule running through all four at icon height, and a `signal` dot on the rule at each step — a real timeline, not four cards. Vertical on mobile with the rule running down the left. Step numbers in mono at 11px, not as large display numerals.

**ANIMATION.**
- The connecting rule draws left-to-right using `svg.createDrawable`, `DUR.slow`, as the section enters.
- Each step's dot scales in with `EASE.snap` as the drawing rule reaches its x-position — synchronised, not independently staggered. This is the detail that makes it feel engineered.
- Step content fades in 120ms behind its own dot.
- Reduced motion: rule and dots render complete, content fades only.

**WHY THIS WINS.** Naming deliverables and durations removes the two biggest silent objections ("how long" and "what do I actually get"). The final line is the strongest sentence on the entire site — it moves risk from the buyer to you, and it converts better than any testimonial could.

---

### H6. Engagement and pricing

**THEME.** A price list on a workshop counter. Plain, unembarrassed, specific.

**CONTENT.** Three tiers from `site.engagement`: Pilot, Build, Support. Each with duration, starting price, and 3–4 bullet scope lines. Below: *"Fixed scope, fixed price. We quote after the scoping week, not before."*

**LAYOUT.** Three columns, equal width, separated by vertical `line-strong` rules — again cells, not cards. The middle tier (Build) sits on `paper-sunk` to mark it as the common path, with a small mono tag reading "most projects". No badge, no ribbon, no scale-up.

**ANIMATION.** Minimal by design. Columns fade+rise, `stagger(0.06)`. Hover on a column: background shifts to `paper-sunk`, 1px `signal` top border draws in left-to-right over `DUR.fast`. Nothing else.

**WHY THIS WINS.** Almost no CV studio publishes any pricing, which means every visitor assumes it's unaffordable and leaves. A starting figure plus "we quote after scoping" is honest, filters unqualified leads, and reads as confidence. This section will do more for conversion than any animation on the page.

---

### H7. Credibility

**THEME.** Evidence, not endorsement.

**CONTENT.** **Do not generate AI testimonials, even as placeholders.** Publishing invented quotes attributed to people who don't exist is fabricated endorsement — it's illegal to publish in most markets, and if one prospect ever asks to speak to that reference you lose the deal and the reputation. The plan to swap them later doesn't help, because the damage happens on the day someone checks.

Build these instead, all of which are true today:

1. **Deployment facts.** "Systems running in N facilities across M sites." Only if true.
2. **Engineering artefacts.** Publish a redacted scoping document and an acceptance-criteria checklist as downloadable PDFs. Buyers of technical work trust process artefacts more than praise.
3. **The pilot guarantee**, repeated from H5 with the terms spelled out.
4. **Anonymised outcome strip.** Three lines in the "Tier-2 automotive supplier, Punjab — 8 weeks — 99.8% recall" format.
5. **An honest note.** One short paragraph: *"We're a small studio. You'll work directly with the engineers who build your system — the same two people, start to finish."* Small is a feature for this buyer; own it.

When you get a real quote, get it in writing with explicit permission to publish, and give it a full-width section of its own.

**LAYOUT.** Two columns: artefact downloads left (as file rows with format and size in mono), outcome strip and honest note right. `paper` background, generous whitespace — this section should feel unhurried.

**ANIMATION.** Fade only, `stagger(0.05)`. No motion on the honest note at all. Sincerity and animation don't mix.

**WHY THIS WINS.** It's the only version of this section that survives contact with a diligent buyer. And downloadable artefacts are a lead-gen asset a testimonial never is.

---

### H8. Closing call to action

**THEME.** The reticle locking on. The page's visual language resolves here.

**CONTENT.**
- "Tell us what's coming off your line wrong."
- One line: "20-minute scoping call. Bring a video clip or a few photos of the defect if you have them — we'll tell you on the call whether it's solvable and roughly what it costs."
- Primary: **Book a scoping call**. Secondary: WhatsApp link from `site.js`.
- Below, in mono: hours and location.

**LAYOUT.** `ink` background, full-bleed, centred, 180px vertical padding. This is the only centred-text section on the site, which is what makes it read as an arrival rather than a default.

**ANIMATION.** `Bracket` corner ticks converge onto the headline block as the section enters — four L-marks travelling inward from beyond the viewport edges, `EASE.snap`, `DUR.slow`, arriving in unison. Then the CTA button's amber fill wipes in from the left. Nothing after that; the page ends still.

**WHY THIS WINS.** Asking for a clip rather than a meeting lowers the commitment and gets you a qualified lead with real data attached. The converging brackets pay off the visual metaphor the hero opened with — the page starts with a system acquiring a target and ends with it locked.

---

## /WORK — Case study index

**THEME.** A specimen archive. Dense, scannable, filterable.

**CONTENT.** Page header: "Systems we've built" plus a one-line frame and a live count. Filter row. Grid of project cards showing clip, name, `problemType`, `clientType`, `year`, `duration`, and the single headline outcome. Empty state for filters with no results: *"No projects in this category yet. [Ask the assistant] whether we've handled something similar."*

**LAYOUT.** Filters as a horizontal pill row, scrollable on mobile with `hide-scrollbar`. **Filter by `problemType` first, `industry` second** — a buyer arrives with a problem, not an industry. Two filter groups on one row, separated by a vertical rule. Grid: 2 columns desktop, 1 mobile, 32px gutter. Cards are 4:3 clip on top, metadata block below, 1px `line-strong` border, 2px radius.

**ANIMATION.**
- Keep the existing `AnimatePresence` + `motion.div layout` reshuffle — it's the right tool and it works. Set `layout` transition to `DUR.base` / `EASE.inOut`.
- Active pill: `signal` background, white text, transitioned via a shared `layoutId` background element so the active state *slides* between pills.
- Card hover: `Bracket active={isHovered}`, clip begins playing, `clipCaption` fades up over the clip bottom-left. Clip pauses and resets on mouse-out.
- Only the hovered card plays. Enforce single-playback here; a grid of six autoplaying clips will destroy the page on mobile data.
- Filter change updates the URL via `useSearchParams` — keep this, it makes filtered views shareable.

**WHY THIS WINS.** Filtering by problem type routes the visitor to relevant proof in one click. The sliding pill background and the clip-on-hover are motion that responds to action, which is the kind that earns its cost.

---

## /WORK/[SLUG] — Case study detail

**THEME.** An engineering report, typeset well. This page's job is to survive being read by a sceptical technical evaluator.

**CONTENT & ORDER.** This order matters — it mirrors how an engineer evaluates:

1. **Header** — name, `clientType` │ `region` │ `year` │ `duration`, one-line summary.
2. **Hero clip** on `slate`, full-bleed, with `clipCaption`.
3. **Outcomes** — the three `outcomes` as a metric row.
4. **The problem** — `problem`, at `.max-w-content`.
5. **The constraint** — `constraint`, in a recessed `paper-sunk` block with a left `amber` rule. This is the most-read block on the page; constraints are what separate real engineering from a demo.
6. **What we built** — `built`, plus a small architecture diagram (inline SVG, drawn in your icon language: camera → edge device → model → PLC).
7. **Screenshots** — from the `screenshots` array, each with its caption.
8. **Stack and deployment** — `stack` chips, `deployment`, `throughput`, `confidence` rendered as a small labelled bar.
9. **Quote** — rendered only if `quote !== null`. No placeholder.
10. **Next project** + persistent CTA.

**LAYOUT.** Single column at `.max-w-content` for prose, breaking full-bleed for the clip, screenshots, and metric rows. A sticky right-rail on desktop ≥1280px showing project metadata and a "Discuss a similar system" button that stays visible through the whole read.

**ANIMATION.**
- Reading progress: a 2px `signal` bar at the top of the viewport, width driven by `useScroll` `scrollYProgress`. It's functional, not decorative.
- Sections use the standard `Reveal` at `STAGGER.base`. Deliberately uniform — an editorial page should not surprise you as you read.
- Architecture diagram: paths draw in sequence with `createDrawable` when it enters, 900ms total, showing data flowing camera → edge → PLC.
- Screenshots: `clip-path` reveal from bottom, `DUR.base`.
- Confidence bar: fills from 0 to `confidence` on enter, `EASE.out`.

**WHY THIS WINS.** Leading with constraints and publishing the failure-adjacent numbers is what a competent engineer looks for. The sticky rail means the CTA is never more than an eye-flick away during a three-minute read.

---

## /SERVICES

**THEME.** A capability sheet. Deep, technical, unglamorous.

**CONTENT.** Ordered by what you want to sell:

1. **Computer vision** — the six problem types from H2, each expanded into: what it is, typical accuracy range, typical hardware, typical timeline, and a link to a matching case study.
2. **Deployment and integration** — edge vs server, PLC/Modbus/OPC-UA integration, MES hooks, on-prem constraints, offline operation.
3. **Model lifecycle** — data collection, labelling, retraining pipeline, drift monitoring. Most competitors skip this; including it signals you've operated a system after launch, not just shipped one.
4. **Web platforms** — a single subsection, honestly framed: *"Dashboards, review queues, and reporting interfaces for the vision systems we build. We take these as part of a vision project, not on their own."* This is the demotion that fixes your positioning problem.

**LAYOUT.** Left sticky in-page nav (desktop ≥1024px) tracking the four sections. Content at `.max-w-content`. Each capability is a cell with a hairline top border, not a card.

**ANIMATION.** Sticky nav active item marked by a `signal` dot that slides via `layoutId` as sections enter. Content: standard `Reveal`, nothing more. This is a reference page; restraint is correct.

**WHY THIS WINS.** Framing web platforms as an attachment rather than an offering is the single change that makes you read as a specialist. The lifecycle section is your quiet differentiator.

---

## /ABOUT

**THEME.** Two people and a workbench.

**CONTENT.**
- One paragraph on what the studio is and what it refuses. Naming what you don't take builds more trust than a capability list.
- **Who you'd be working with** — from `site.founders`. Name, photo, role, and one line each on what they've shipped. Cut the paragraph bios. Frame it as competence, not biography.
- **How we work** — 4–5 short principles, each one sentence. Real ones: "We won't take a project without a measurable pass/fail." "We test on your footage, not a public dataset." "We hand over the retraining pipeline, not just the model."
- **Where we are** — location, hours, timezone, from `site.js`.

**LAYOUT.** Prose at `.max-w-content`. Founders as two wide rows with photo left at 120px square (2px radius, 1px `line-strong` border — not circles; circular avatars are social-media grammar), text right. Principles as a numbered list only if the order is meaningful; otherwise a plain list.

**ANIMATION.** Fade only. Photos reveal with a horizontal `clip-path` wipe, `DUR.base`, staggered. Nothing else. This page's credibility comes from stillness.

**WHY THIS WINS.** You wanted founders removed; this keeps the buyer-critical signal ("two named engineers, not a faceless vendor") while cutting the self-indulgent part (long bios). It also makes the "you'll work directly with the engineers" claim from H7 verifiable.

---

## /CONTACT

**THEME.** A booking desk. One obvious action, several fallbacks.

**CONTENT.** Headline: "Book a scoping call." The 20-minute framing and the "bring a clip" ask, repeated. Cal.com embed from `site.calLink`. Beneath: WhatsApp, email, hours, location, and expected response time. A short note on what happens after booking — three lines, so the visitor knows what they're agreeing to.

**LAYOUT.** Two columns: embed left (7 cols), contact details and expectations right (5 cols). Stacked on mobile with the embed first. `paper` background.

**ANIMATION.** Page enters with a simple fade. The embed gets a skeleton in `paper-sunk` until loaded — third-party embeds are slow and an unstyled gap here kills momentum at the moment of conversion. Contact rows stagger in at `STAGGER.tight`.

**WHY THIS WINS.** Setting expectations before the click ("20 minutes, bring a clip, we'll tell you if it's solvable") raises show-rates and pre-qualifies the call.

---

## /CAREERS and /404

**Careers:** 301 redirect to `/contact` in `next.config.js`. Do not leave a 404 — inbound links and any indexed job post must land somewhere useful.

**404:** In-brand and short. A reticle that scans and finds nothing, mono readout reading `no target acquired`, headline "That page isn't here," and three links: Home, Work, Book a call. The reticle sweep runs once and stops. Do not loop it — a permanently searching animation on an error page is irritating.

---

## PART 4 — GLOBAL MOTION SYSTEM

### 4.1 Library responsibilities

| Library | Owns | Never used for |
|---|---|---|
| `motion` | React-state-driven motion: reveals, `AnimatePresence`, `layout`, hovers, cursor springs, scroll progress | SVG path drawing, text splitting, long timelines |
| `animejs` v4 | SVG `createDrawable`, `text.split`, orchestrated timelines, number counting | anything tied to React state |
| `lenis` | smooth scroll normalisation only | element animation |

Budget: `motion` already present, anime.js ≈ 4–6KB tree-shaken for the four modules used, Lenis ≈ 3KB. Total new JS under 10KB gzipped. No GSAP (≈50KB for capability already covered). No three.js (≈150KB; your real MP4 clips are more convincing than hand-built WebGL, and they're true).

### 4.2 Smooth scrolling

```js
// components/SmoothScroll.jsx — mounted once in app/layout.js
const lenis = new Lenis({
  duration: 1.05,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,   // never smooth-scroll touch; it fights native momentum
});
```
Requirements: destroy on unmount; `lenis.stop()` when a modal or the agent panel is open; `scroll-behavior: auto` in CSS so Lenis is the only scroll authority; disable entirely under `prefers-reduced-motion`; verify anchor links and browser back-navigation scroll restoration still work.

### 4.3 The `Reveal` component (rewritten)

```jsx
<Reveal variant="slide" delay={0.1} once>{children}</Reveal>
```
Variants: `slide` (opacity + y:16 — the default), `wipe` (clip-path inset from left), `draw` (SVG path draw, delegates to anime.js), `count` (numeric). **Remove the `scale` and `flip` variants.** A 3D flip is decorative rather than informative and it undercuts the precision positioning.

All variants use `whileInView` with `{ once: true, margin: "-80px 0px" }`, `EASE.out`, `DUR.base`. Under reduced motion, `Reveal` renders children with no wrapper motion at all.

### 4.4 Motion discipline

Scattered fade-up-on-every-section is the generic default and reads as generated. The rule for this site:

- **One orchestrated moment per page.** Home: the hero timeline. Work: the filter reshuffle. Case study: the architecture diagram. Everything else is a quiet 16px fade.
- **Motion that answers an action is always welcome** — opening, filtering, hovering, expanding. Motion that fires because you scrolled past something must be nearly invisible.
- Nothing loops except the status strip and the hero clip. Perpetual motion in peripheral vision is fatiguing and reads as decoration.
- Never animate `width`, `height`, `top`, or `left`. Only `transform`, `opacity`, `clip-path`, and SVG `stroke-dashoffset`.
- Anything animating for more than 200ms gets `will-change` set on animation start and removed on completion — never left on permanently.

---

## PART 5 — MEDIA PIPELINE

Your clips are the strongest asset and the heaviest cost. Treat them as a build step, not an upload.

**Encoding, per clip:**
```
Duration        6–8 s, seamless loop, no audio track at all (not muted — absent)
Resolution      1280×720 max; 960×540 for grid cards
Codecs          AV1 (primary) → WebM/VP9 → MP4/H.264 (fallback)
Target size     under 900KB for hero, under 400KB for cards
Poster          WebP, extracted from frame 0, under 40KB
faststart       yes, on the MP4
```

**`ClipPlayer` requirements:**
- `preload="none"`, `poster` always set, `playsInline`, `muted`, `loop`.
- IntersectionObserver plays at ≥50% visible, pauses below.
- Global registry caps concurrent playback at 2 sitewide.
- Renders `clipCaption` as a mono overlay, bottom-left, over a subtle `ink` gradient — **in the UI layer, not burned into the video**, so it's selectable, translatable, and readable by screen readers.
- A `signal-lit` live dot beside the caption while playing.
- Poster stays visible until first frame decodes; no black flash.
- Under `prefers-reduced-motion` or Save-Data, render the poster only with a play button.

**Screenshots:** WebP via `next/image`, explicit width and height to reserve layout space, `sizes` set correctly, lazy below the fold, `priority` on the hero only.

**Captions and small content.** You called this out and you were right — it's where industrial credibility actually lives. Every clip, screenshot, diagram, and metric gets a caption or unit label. Never publish a bare number. `99.8%` is a claim; `99.8% recall on target defect classes, 240 units/min, Jetson Orin NX` is evidence.

---

## PART 6 — PERFORMANCE, ACCESSIBILITY, SEO

**Performance targets:** LCP < 2.0s on 4G, CLS < 0.05, INP < 200ms, initial JS < 180KB gzipped. The hero poster is the LCP element — preload it. Fonts: `next/font` with `display: swap`, subset to latin, preload only the two weights used above the fold.

**Accessibility floor:**
- Every animation respects `prefers-reduced-motion`.
- Visible focus ring: 2px `signal` offset 2px, on every interactive element. Never `outline: none` without a replacement.
- Full keyboard path through nav, filters, agent panel, and forms. Agent panel traps focus while open and returns it to the trigger on close.
- All clips have text alternatives via `clipCaption`; decorative SVG gets `aria-hidden`.
- Colour is never the sole carrier of meaning — pass/fail states get an icon as well as a colour.
- Contrast verified on both `paper` and `slate` surfaces.

**SEO:** Per-route metadata. `Organization` JSON-LD in the root layout (keep existing). `CreativeWork` JSON-LD per case study. OG image generated per case study from the poster plus the headline outcome. Sitemap and robots via the App Router file conventions. Keep Plausible.

---

## PART 7 — DESIGN CRITIQUE CHECKLIST

Run this against every screen before it ships. Any "yes" in the left column is a defect.

| Failure | Fix |
|---|---|
| Content chopped into identical rounded cards with the same border-radius and a soft grey shadow | Use cells with hairline dividers; reserve radius for genuinely interactive surfaces |
| An all-caps tracked-out eyebrow above every heading | Delete unless it carries real data |
| Meta strings joined with middle dots | Use a 1px vertical rule element |
| A `→` appended to button text | Button text states the action |
| One word of a headline in a different colour or weight | Rewrite the headline so the whole sentence carries it |
| Numbered markers on content that isn't a sequence | Only H5 and the case study flow are sequences |
| Fade-up on every section | One orchestrated moment per page; everything else at 16px or less |
| A gradient used as decoration | The only gradients allowed are the marquee edge masks and the caption scrim |
| A metric with no unit or qualifier | Every number gets a label and a source |
| An empty state that just says "no results" | Empty states offer the next action |
| Green used on more than links, active states, and pass marks | Enforce the colour discipline table in 1.2 |
| More than two amber elements in one viewport | Amber is for the primary action only |

**Chanel rule:** before shipping any section, remove one thing. The section that survives with one fewer element is the stronger one.

---

## PART 8 — HANDOFF AND BUILD ORDER

### 8.1 File structure

```
app/
  layout.js                  root: fonts, JSON-LD, SmoothScroll, Nav, Footer, Agent, Cursor
  page.js                    home — sections H1..H8
  work/page.js               index (client)
  work/[slug]/page.js        detail (server, generateStaticParams)
  services/page.js
  about/page.js
  contact/page.js
  not-found.js
  globals.css                @theme tokens, type classes, layout utilities
components/
  layout/       Nav, Footer, StatusStrip, SmoothScroll, Cursor
  motion/       Reveal, Bracket, MetricCounter, ScanReveal, DrawSVG
  media/        ClipPlayer, Screenshot, clipRegistry
  home/         Hero, ProblemGrid, ResultsBand, FeaturedCase,
                ProcessTimeline, EngagementTiers, Credibility, ClosingCTA
  work/         FilterBar, ProjectGrid, ProjectCard
  case/         CaseHero, ConstraintBlock, ArchitectureDiagram, OutcomeRow
  agent/        AgentTrigger, AgentPanel, AgentMessage, SuggestedPrompts
  icons/        twelve drawn domain icons + index
content/        site.js, projects.js, agent-kb.js
lib/            motion.js, format.js, clipRegistry.js
```

### 8.2 Component contracts

```
Reveal        ({ children, className, delay=0, variant='slide', once=true })
Bracket       ({ children, active=false, size=14, color='ink', className })
MetricCounter ({ value, format='number', decimals=1, duration=1500, suffix })
ClipPlayer    ({ src, poster, caption, aspect='16/9', priority=false, dark=false })
ScanReveal    ({ children, direction='left', duration })   // clip-path wipe
DrawSVG       ({ paths, duration=700, stagger=0, trigger='inView' })
ProblemCell   ({ icon, title, description, constraint })
```

### 8.3 Build order

Each phase must be shippable on its own.

**Phase 1 — Message and architecture.** No new libraries. Routes, nav with Home and persistent CTA, rewritten hero copy, problems grid, engagement tiers, closing CTA, careers redirect, services demotion, about reframe. *This is roughly 80% of the visitor-test fix and none of it is animation.*

**Phase 2 — Design system and media.** New `@theme` tokens, type scale, drawn icons, `slate` sections, clip re-encoding, `ClipPlayer` rewrite with registry and captions, status strip shrink.

**Phase 3 — Motion foundation.** Lenis, rewritten `Reveal`, cursor reticle, `MetricCounter` on anime.js, hover states, filter pill `layoutId`.

**Phase 4 — Orchestrated moments.** Hero timeline with `text.split` and `createDrawable`, featured case scan reveal, process timeline draw, architecture diagram, converging closing brackets.

**Phase 5 — Assistant.** `agent-kb.js`, panel, streaming, grounded system prompt, suggested prompts, inline project cards.

**Phase 6 — Voice, conditional.** Only after Phase 5 usage data justifies it. Opt-in toggle, stored preference, never autoplay.

### 8.4 Definition of done, per section

- [ ] Renders correctly at 375, 768, 1024, 1440, 1920px
- [ ] Full keyboard path with visible focus
- [ ] Correct and complete under `prefers-reduced-motion: reduce`
- [ ] Readable with JavaScript disabled
- [ ] No CLS from media, fonts, or animation
- [ ] Every number carries a unit and a qualifier
- [ ] No invented client, quote, logo, or metric
- [ ] Passes the Part 7 critique checklist
- [ ] Contrast verified on its own surface colour

---

## PART 9 — ON EXTERNAL COMPONENT SOURCES

21st.dev is a registry, not a library — the code lands in your repo and you own it. Three frictions with this stack: components ship as TypeScript while your files are `.jsx`; they assume shadcn conventions (`cn()`, `class-variance-authority`, `bg-background` / `text-muted-foreground` tokens) which you don't have; and the popular aesthetic there is glassmorphism, gradient blobs, and rounded SaaS cards, which will look grafted onto this design.

Use it as a **reference for mechanics, not a source of finished UI.** Find a component whose behaviour you want, read how it does the maths, rebuild it in your tokens. Worth mining: marquee loop maths, cursor spring-follow logic, chat panel scaffolding. Not worth taking: heroes, buttons, cards, anything with a gradient. Read the source of anything before shipping it — animated entries generally pull in Motion, which you already have, but check for duplicated dependencies.

Anime.js documentation: use v4 examples only. The v3 API (`anime({ targets, easing })`) is everywhere online and will not work — v4 is `animate(targets, { ease })` with named ES module exports.

---

*End of specification. Build Phase 1 first, review against Part 7, then proceed.*
