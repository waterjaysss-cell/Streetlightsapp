# StreetLights Community — Build Plan

**Project location:** `c:\Users\water\streetlights-web`

> **Phase 2 (current work)** is at the top — homepage fixes + 5 new pages.
> Phase 1 (homepage build) review is preserved below for reference.

---

# Phase 2 — Homepage fixes + 5 new pages

## Order of operations
1. Homepage fixes (address line, logo swap, nav links) → commit
2. Shared components for new pages (PageHeader, ConnectCards extract, CopyButton, FAQItem) → commit with first page
3. `/about` → commit
4. `/events` + `/events/[slug]` + `/events/recap/[slug]` → commit
5. `/shop` → commit
6. `/give` → commit
7. `/connect` → commit
8. Final `npm run build` to verify everything

## Design constraints (unchanged from Phase 1)
- Anton (display) + Inter (body), no other fonts
- `night` / `bone` / `ash` / `smoke` palette only — no accent colors
- Reuse existing components: `Nav`, `Footer`, `Button`, `SectionHeading`, `EventRow`, `Reveal`
- Subtle hover only — no heavy animation

## Homepage fixes

### Fix 1 — Connect "Pull Up" address
- File: `src/app/page.tsx` (Connect section, "01 / Pull Up" card)
- Replace the static `MEETING_ADDRESS` line with: *"Location varies — check What's On for this Monday's spot."*
- Make it a link (`<a href="#whats-on">`) so clicking scrolls up to the schedule.
- Remove the `MEETING_ADDRESS` constant (no longer used anywhere).

### Fix 2 — Logo swap (Nav + Footer)
- Logo file path: `public/brand/streetlights-logo.png` (square brand mark — handwritten "streetlights" wordmark with cross-T and sparkle rays, white-on-black).
- **Aspect ratio: ~1:1 (square).** Nav: `width={44} height={44}`. Footer: `width={72} height={72}`.
- Need to drop the file at `public/brand/streetlights-logo.png` before the page will render the image (otherwise next/image 404s but the page itself still loads).
- Replace the literal text `STREETLIGHTS` in `Nav.tsx` and `Footer.tsx` with `<Image>`.
- Keep the link wrapping (logo links back to `/`).
- Add `alt="StreetLights"` and `priority` on the Nav logo (above the fold). Footer logo no priority.

### Fix 3 — Nav routes (Home / About / Events / Shop / Give / Connect)
- File: `src/components/Nav.tsx`
- Update `NAV_LINKS` to real routes: `/`, `/about`, `/events`, `/shop`, `/give`, `/connect`.
- Home link goes to `/`. The existing in-page anchors (`#whats-on`, `#connect`) stay on the homepage as scroll targets — they won't be in the nav anymore but the homepage still uses them internally.
- 6 links — desktop fits comfortably with `gap-8` instead of `gap-10`. Mobile menu has 6 huge tappable links — adjust the `text-6xl` headline size to `text-5xl` so 6 fit cleanly in `100vh`.

## New shared components (in `src/components/`)

### `PageHeader.tsx`
Eyebrow (small caps tracking-widest text-smoke) + dramatic Anton heading. Used at the top of every new page. Same scale as homepage hero (matches the "WHO WE ARE / A COMMUNITY..." pattern).

```
text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl
```

Includes top padding (`pt-32 sm:pt-40`) to clear the fixed nav.

### `ConnectCards.tsx`
Extract the 3-card "Pull Up / GroupMe / Follow" block from the homepage so `/connect` can reuse it. Takes no props — just renders the canonical content.

### `CopyButton.tsx`
Client component. Button with text label; on click, copies a passed-in string to the clipboard and flips its label to "COPIED" for 2 seconds. Used on `/give` for the Zelle email.

### `FAQItem.tsx`
Native `<details>`/`<summary>` accordion. Custom plus/minus indicator via CSS, hides default disclosure marker. No JS needed. Used on `/connect`.

## New pages

### `/about` — `src/app/about/page.tsx`
- `PageHeader`: eyebrow "WHO WE ARE", heading "A COMMUNITY, NOT A SERVICE."
- Section 1: 2–3 short paragraphs (under 200 words), placeholder copy in StreetLights voice
- Section 2: Acts 2:42–47 pull-quote — large Inter italic with a vertical rule on the left, tracking on a small "ACTS 2:42–47" attribution above. Editorial-newspaper feel (decided to stay within the two-font palette rather than introduce a serif and break discipline)
- Section 3: full-bleed photo band placeholder (`bg-neutral-900`, `aspect-[16/9]`) with TODO
- Section 4: 3-column "Fellowship / Outreach / Encouragement" — same grid pattern as homepage Connect (numbered labels, headlines, body)

### `/events` — `src/app/events/page.tsx`
- `PageHeader`: eyebrow "WHAT'S ON", heading "EVENTS."
- **Upcoming:** schedule using existing `EventRow` component, but each row wrapped in a `<Link>` to `/events/[slug]`. Slugs are kebab-case from the title (e.g. `grill-sesh`).
- **Recap:** "RECAP" section with 3-4 past-event cards. Each card: name, month/year, 4-cell photo grid placeholder, 1-2 sentence summary, link to `/events/recap/[slug]`.

### `/events/[slug]` — `src/app/events/[slug]/page.tsx`
- Dynamic route. Looks up event by slug from a hardcoded `EVENTS` map; falls back to "event not found" if slug doesn't match.
- One example event filled in (e.g. `grill-sesh`): location, time, what to bring, a 4-photo placeholder grid.
- Back link to `/events`.

### `/events/recap/[slug]` — `src/app/events/recap/[slug]/page.tsx`
- Same pattern. One example recap fully filled in (e.g. `q2-retreat`).

### `/shop` — `src/app/shop/page.tsx`
- `PageHeader`: eyebrow "WEAR THE NAME", heading "SHOP."
- Intro line: *"Limited drops. DM us on Instagram to grab one. All proceeds go back into the community."*
- Grid of 3-4 placeholder products (2-col mobile, 3-col desktop).
- Each card: square-aspect photo placeholder, name, price, sizes, "DM TO ORDER" Button outline variant linking to IG.

### `/give` — `src/app/give/page.tsx`
- `PageHeader`: eyebrow "SUPPORT THE MISSION", heading "GIVE."
- "Why give" — 2-3 sentences in Inter body
- Three giving options in a hairline-divided 3-card grid (same pattern as homepage Connect):
  - **VENMO** — handle `@streetlights` (placeholder), Button "OPEN VENMO" linking to `https://venmo.com/streetlights`
  - **ZELLE** — `give@streetlightscommunity.com` (placeholder), `CopyButton` to copy the email
  - **IN PERSON** — *"Drop in the basket Monday at 6:45."* — no button
- Footer disclaimer in `text-xs text-smoke uppercase tracking-widest`: *"StreetLights Community is currently a non-501(c)(3) ministry. Donations are not tax-deductible at this time."*

### `/connect` — `src/app/connect/page.tsx`
- `PageHeader`: eyebrow "PLUG IN", heading "CONNECT."
- `<ConnectCards />` — reuses the shared component
- "Questions" block: email (placeholder `hi@streetlightscommunity.com`), Instagram DM link, GroupMe link. NO contact form.
- "FAQ" section with 5 placeholder Q&As using `FAQItem`. Going with native `<details>` accordion — no JS, accessible by default, fits the brutalist aesthetic.

## Decisions to flag for review (before/after build)
1. **Logo is a square brand mark, not a wide wordmark.** Sized as 44×44 in nav and 72×72 in footer. The wordmark "STREETLIGHTS" text next to it gets removed entirely — just the logo. If you want the text alongside it, say so.
2. **Acts 2:42–47 pull-quote treatment** — staying in Anton + Inter (large Inter italic with a left rule) rather than introducing a serif font. Keeps the two-font discipline tight.
3. **FAQ as native `<details>`** — accessible, no JS, expands inline. If you'd rather a custom-animated accordion, easy swap.
4. **Event detail pages render hardcoded data per slug** — no backend. Unknown slugs render "event not found." This means real event detail content is inlined in code, not data-driven. Acceptable for v1 / placeholder phase.
5. **"DM TO ORDER" CTA** — links straight to IG profile, not a DM compose URL. Instagram doesn't support deep-link DM compose reliably from the web. If you want a `mailto:` or specific landing instead, swap.
6. **Copy-button feedback** — flips label to "COPIED" for 2 seconds. No toast, no animation beyond a label swap.
7. **Commits** — I'll commit after homepage fixes, then per page (5-6 commits total). Conventional Commits style (`feat:`, `fix:`).

## Don't do (per brief)
- No CMS, DB, auth, or backend
- No real e-commerce, no Stripe, no cart
- No RSVP system on Events
- No contact form
- No newsletter
- Don't touch the homepage layout beyond the 3 fixes above

---

# Phase 1 — Homepage Build (completed)

**Scope:** Homepage only. No other pages, no backend, no CMS.

---

## Design commitments (locked in before build)

- **Headline font:** `Anton` (Google Fonts via `next/font/google`). Confirmed.
- **Body / UI font:** `Inter` (Google Fonts via `next/font/google`).
- **Palette — strict B&W, no accent color:**
  - `night` = `#0A0A0A` (background)
  - `bone` = `#F5F5F5` (text — softer than pure white on true black)
  - `ash` = `#1A1A1A` (elevation, dividers)
  - `smoke` = `#737373` (muted text)
- **Tailwind semantic classes:** `bg-night`, `text-bone`, `bg-ash`, `text-smoke`, `font-display`, `font-body`. No raw hex in components. No accent color class — CTAs use bone fill or bone outline.
- **Aesthetic direction:** editorial brutalism / streetwear zine — hard edges, no rounded cards, no shadows, brutal type scale, photo as content.

---

## Setup tasks

- [x] Scaffold Next.js 16 + TS + Tailwind v4 in `c:\Users\water\streetlights-web` (App Router, src dir)
- [x] Configure `next/font` (Anton + Inter) in `app/layout.tsx`, expose as CSS vars
- [x] Extend Tailwind theme with palette + font families via `@theme` in `globals.css`
- [x] Set base `<html>`/`<body>` to `bg-night text-bone font-body`, set lang, set basic metadata (title, description, OG)
- [ ] ~~Add a README.md with run instructions~~ (skipped — Next.js scaffold ships with one; standard `npm run dev`)
- [ ] ~~`git init` + initial commit~~ (scaffold auto-init'd the repo; no commit yet — leaving for you)

## Reusable components (`src/components/`)

- [x] `Nav.tsx` — sticky top nav, wordmark left, links right; backdrop-blur after scroll; mobile = full-screen overlay with staggered link reveals
- [x] `Footer.tsx` — wordmark, IG, GroupMe, copyright
- [x] `Button.tsx` — variants `filled` (bone bg, night text, hover dims) and `outline` (bone border, transparent bg, hover fills to bone)
- [x] `SectionHeading.tsx` — uppercase display-font heading with optional kicker
- [x] `EventRow.tsx` — big day number, event name (display font), location (body font), thin divider
- [x] `Reveal.tsx` — IntersectionObserver wrapper for scroll-triggered fade-in

## Homepage sections (`src/app/page.tsx`)

- [x] **Hero** — 100svh, full-bleed dark placeholder, three-line brutal headline, Acts attribution, two CTAs, scroll indicator
- [x] **Who we are** — 5/6 split, kicker + huge headline, two-paragraph statement
- [x] **What's On** — May 2026 header (mirrors IG schedule graphic), 5 placeholder EventRows, footer line
- [x] **Photo grid band** — asymmetric 8-cell grid (2-col mobile, 12-col desktop with varying spans/aspects)
- [x] **Connect** — 3-card hairline grid (Pull Up / GroupMe / Follow)
- [x] **Footer**

## Polish

- [x] Subtle fade-in on scroll via `Reveal` (IntersectionObserver + CSS transition, respects `prefers-reduced-motion`)
- [x] Smooth-scroll + scroll-margin for in-page anchors so fixed nav doesn't cover targets
- [x] Mobile pass: clamp() on hero headline (3.25rem → 12rem), full-bleed sections, tap targets ≥ 44px
- [x] `next/image` ready — placeholder divs structured to swap directly to `<Image fill>`
- [x] `next build` passes clean — no TS or lint errors, fully static prerender

## TODOs that ship as placeholders (clearly marked in code)

- Hero background photo
- Photo grid (8 photos)
- Veterans Park exact address
- GroupMe invite URL (placeholder for now)
- Real event copy / schedule (5-6 placeholder events ok)
- Favicon + OG image

## Explicit non-goals (per brief)

- No other pages (About, What's On, Connect = anchor links to homepage sections for now)
- No CMS, DB, auth, calendar integration, sermon player, giving, prayer wall
- No heavy animation library — subtle CSS transitions + tiny scroll fade is the ceiling
- No rounded-card-soft-shadow corporate look, no dove/cross/open-Bible iconography, no gradient buttons

---

## Review

### What was built

A complete homepage at `c:\Users\water\streetlights-web` running on **Next.js 16 + TypeScript + Tailwind v4**.

**File structure:**

```
src/
  app/
    layout.tsx        — Anton + Inter via next/font, metadata, base body classes
    globals.css       — @theme tokens, reveal animation, smooth scroll, anchor offsets
    page.tsx          — homepage composing all six sections
  components/
    Nav.tsx           — sticky, scroll-blur, full-screen mobile menu
    Footer.tsx        — wordmark, IG, GroupMe, copyright
    Button.tsx        — filled / outline variants
    SectionHeading.tsx — kicker + display headline (clamped 3rem → 8rem)
    EventRow.tsx      — day, month, title, location with hairline dividers
    Reveal.tsx        — IntersectionObserver scroll fade-in (no framer-motion)
tasks/
  todo.md             — this file
```

### Locked-in decisions

- **Headline font:** Anton (committed)
- **Body font:** Inter (committed)
- **Palette:** `night #0A0A0A` background · `bone #F5F5F5` text · `ash #1A1A1A` elevation · `smoke #737373` muted. **No accent color** — CTAs use bone fill or bone outline only.
- **Tailwind v4:** all tokens defined in `@theme` in `globals.css`. Used as `bg-night`, `text-bone`, `bg-ash`, `text-smoke`, `font-display`, `font-body` throughout. No raw hex in components.
- **Anchor links** in Nav (`#about`, `#whats-on`, `#connect`) — TODO comment in `Nav.tsx:7` flags the swap to real routes when other pages exist.
- **No framer-motion** — scroll fade is a ~40-line `Reveal` component using IntersectionObserver + a CSS transition. Respects `prefers-reduced-motion`.

### TODOs left as placeholders (clearly marked in code)

| Where | What |
|---|---|
| `page.tsx` Hero | Real hero photo (currently `bg-neutral-900` + atmospheric radial gradients) |
| `page.tsx` Photo Grid | 8 real community photos (currently labeled `Photo / 01` through `08`) |
| `page.tsx` constants | `MEETING_ADDRESS` — confirm exact Veterans Park address |
| `page.tsx` + `Footer.tsx` | `GROUPME_URL` — currently the IG-bio invite, confirm it's the right one |
| `page.tsx` `EVENTS` | Real schedule (placeholder mirrors the May 2026 IG graphic) |
| `app/layout.tsx` | Favicon + OG image (defaults still in place from scaffold) |

### Decisions to flag for review

1. **Hero photo treatment.** Placeholder is `bg-neutral-900` with two radial gradients + a bottom-up dark gradient for headline legibility. When the real photo drops, keep the bottom-up gradient — it stays useful on bright photos. Swap the placeholder div to `<Image fill priority>`.
2. **Body font choice.** Inter is what the brief listed; the design skill flags Inter as overused. I committed to Inter per your brief. If you want Geist or DM Sans, it's a one-line change in `layout.tsx`.
3. **"About" anchor target.** I used the "Who We Are" section as `#about`. When About becomes its own page, the anchor strategy changes — see TODO in `Nav.tsx:7`.
4. **Mobile menu animation.** Currently a fade-in overlay with staggered link reveals. No slide-from-edge. Felt cleaner on Anton's chunky letterforms; can change.
5. **Connect section uses a hairline grid.** Three cards separated by 1px bone-tinted dividers (`gap-px` + `bg-bone/15`). Editorial brutalist move. Easy swap to standalone blocks if you'd rather.

### Verification

- `npm run build` — **passes clean.** TypeScript clean. Static prerender for `/`. Bundle is small.
- **I have NOT visually verified the page in a browser** — the harness can't open one. Run `npm run dev` to view at `http://localhost:3000`. Things to eyeball on first run:
  - Hero headline scaling on narrow phones (clamp should handle but verify)
  - Mobile menu hamburger animation
  - Scroll-blur kicking in past the hero
  - Photo grid asymmetry at md+ breakpoint
