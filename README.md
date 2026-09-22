# Reddtatstoo & Reddsairbrush

A cinematic, strictly grayscale portfolio site for Reddtatstoo and
Reddsairbrush — one artist, two disciplines. Built with React, Vite,
TypeScript, Tailwind CSS v4, Motion for React, and lucide-react.

## Stack

- **Vite + React + TypeScript** — app shell and build
- **Tailwind CSS v4** (`@tailwindcss/vite`) — styling, design tokens defined in `src/index.css`
- **Motion for React** (`motion/react`) — page entrances, hover states, scroll reveals, filtering, lightbox transitions
- **lucide-react** — UI icons (Instagram/TikTok are hand-drawn in `src/components/icons/SocialIcons.tsx` since lucide dropped brand icons)

### Typography

- **Hero wordmarks** ("Reddtatstoo" / "Reddsairbrush") are real logo
  **artwork** (extracted from the client-supplied branding image), not
  text or a webfont — see [Brand logos](#brand-logos-hero-wordmarks)
  below.
- **Secondary display headings** (About, Portfolio, Featured
  Work/Tattoos/Airbrush, Book Your Piece, footer wordmark) use a
  Chicano-tattoo-lettering-inspired display face — currently **Eagle
  Lake** (free, properly licensed), chosen from a side-by-side comparison
  of real candidates — see [Chicano/blackletter font](#chicano-blackletter-font)
  below.
- **Halloween section headings** (`HalloweenFeature`/`HalloweenGallery`/
  `HalloweenBooking`) intentionally use a **different, separate** font
  token (`--font-halloween`, currently Pirata One) and are not affected by
  the Chicano typography change above.
- **Script accent** (e.g. "Two Disciplines." in the About section) uses
  Alex Brush — a loopy brush-pen script that stays legible.
- **Navigation, buttons, body copy, and descriptions** use Inter.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
npm run lint      # oxlint
```

## Project structure

```
public/
  images/branding/   real hero wordmark logo artwork (reddtatstoo.png,
                      star.png, reddsairbrush.png) — served as-is, not
                      bundled by Vite's asset pipeline
  typography-preview.html   standalone font-comparison page (not part of
                      the built app's routes) — see Chicano/blackletter
                      font section below
  CNAME               reddsairbrush.com
src/
  components/       Navbar, Hero, About, Portfolio, CategoryGallery,
                     FeaturedWork, ArtworkLightbox, Booking, BookingForm,
                     Footer, StarDivider, icons/,
                     SeasonalAnnouncementBar, HalloweenFeature,
                     HalloweenGallery, HalloweenBooking
  data/              site.ts, categories.ts, artwork.ts, bookingForms.ts,
                     seasonal.ts, halloween.ts — all editable content, no
                     component changes needed
  types/             artwork.ts, booking.ts, halloween.ts — shared content shapes
  hooks/             usePrefersReducedMotion, useLockBodyScroll
  assets/
    images/
      tattoo/         real tattoo studio photography
      halloween/      real Halloween feature photography (color OK — CSS
                      grayscale filter applied on display)
      placeholders/  generated placeholder art (still used by every
                      category except tattoos) + README.md
    fonts/            premium Chicano/blackletter font slot (inert until
                      you add a licensed font) + README.md
scripts/
  generate-placeholders.mjs   regenerates the placeholder artwork set
```

## Editing content

Everything content-related lives in `src/data/`:

- **`site.ts`** — brand names, tagline, nav links, social links, booking
  email/endpoints.
- **`categories.ts`** — the 7 portfolio category tiles.
- **`artwork.ts`** — every gallery piece (title, category, image, aspect
  ratio, description, `featured` flag). Add/remove/reorder entries here to
  change the gallery and the homepage "Featured Work" strip — no component
  code needs to change.
- **`bookingForms.ts`** — the fields for the Tattoo Inquiry and Airbrush /
  Custom Work Inquiry forms.
- **`seasonal.ts`** — Halloween announcement bar, homepage feature copy, and
  booking policy. See [Halloween / seasonal system](#halloween--seasonal-system).
- **`halloween.ts`** — Halloween face-painting projects and the Halloween
  booking form fields.

See `src/assets/images/README.md` for how to swap the generated placeholder
artwork for real photography.

## Brand logos (hero wordmarks)

The hero's "Reddtatstoo ✦ Reddsairbrush" lockup is **real logo artwork**,
not styled text or a webfont approximation. It was extracted from a single
combined branding image the client supplied
(`src/assets/images/logos/redd-logo.png`, kept as the source reference)
into three separate transparent PNGs:

```
public/images/branding/reddtatstoo.png     ("Reddtatstoo" lettering)
public/images/branding/star.png            (center decorative star)
public/images/branding/reddsairbrush.png   ("Reddsairbrush" lettering)
```

These live in `public/`, not `src/assets/`, specifically so they're
served at a stable, predictable root-relative path rather than going
through Vite's content-hashing pipeline — `Hero.tsx` references them via
`` `${import.meta.env.BASE_URL}images/branding/...` `` so the path stays
correct under whatever `base` is configured (see the deployment section
below for why that matters for the custom domain).

**Extraction method:** the source image's flat black background was
removed via connected-component flood-fill from the image border (not a
naive "make all dark pixels transparent" pass), so the background is
fully transparent while the dark shading/depth *within* the lettering
(drop shadows, engraved-look bevels) stays intact and opaque — verified
pixel-level with no fringing or halo artifacts.

**To update the branding artwork later:** overwrite the three files above
(or re-run the extraction from a new source image) — no component code
needs to change as long as the filenames stay the same. If you want to
swap in something with a different aspect ratio, note that `Hero.tsx`
sizes `reddtatstoo.png`/`reddsairbrush.png` by **width** (not height) —
that's deliberate, since the original artwork has near-identical widths
but different heights for the two wordmarks, and sizing by width is what
preserves that original composition.

## Chicano/blackletter font

Secondary display headings (About, Portfolio, Featured
Work/Tattoos/Airbrush, Book Your Piece, footer wordmark) use **Eagle
Lake** today — a free, properly-licensed face Google classifies as "a
rounded blackletter style with flowing swashes." It was picked from three
real, embeddable candidates compared side-by-side at
**`public/typography-preview.html`** (open that file in a browser to see
the comparison — it's a static page, not part of the built app).

For an exact match to authentic Chicano tattoo-lettering references (the
genre lives almost entirely in commercial type foundries, not Google
Fonts — "Chico Mato" is one example), you'd need to purchase a font
license yourself; we can't bundle or embed an unlicensed font file. See
**`src/assets/fonts/README.md`** for the drop-in activation steps once you
have licensed files — no other code changes needed.

**Halloween headings are pinned separately** (`--font-halloween`,
currently Pirata One, in `src/index.css`) and are unaffected by whatever
you choose here.

## Halloween / seasonal system

Halloween is treated as a major booking season, not just another portfolio
category. Everything seasonal is controlled from one file,
**`src/data/seasonal.ts`**, with three independent on/off switches:

| Flag | Controls | Default |
|---|---|---|
| `announcementBar.enabled` | The thin bar above the nav ("Halloween Bookings — Reserve Your Look.") | `false` |
| `homepageFeature.enabled` | The full-width "Become the Art" promo section on the homepage (between the portfolio category tiles and Featured Work) | `true` |
| `booking.ctaEnabled` | Whether the Halloween booking **form** is live, or a "not open yet" notice shows instead | `false` |

**Why `booking.ctaEnabled` defaults to `false`:** the brief was explicit —
never claim bookings are open unless they actually are. Turning it on
swaps the honest "Halloween Booking Opens Soon" notice (with a `mailto`
"Get Notified" fallback) for the real booking form. Flip it only when the
artist is actually taking Halloween bookings.

**The Halloween gallery is never gated by any of these flags** — `#halloween-work`
(`HalloweenGallery.tsx`) stays browsable year-round regardless of season,
per the brief.

### Structure

- **`SeasonalAnnouncementBar.tsx`** — renders inside the same fixed header
  as `Navbar.tsx` (so it never overlaps content; `Navbar.tsx` and
  `Hero.tsx` both compute their top offset from
  `TOTAL_HEADER_HEIGHT_PX`, which accounts for the bar automatically).
- **`HalloweenFeature.tsx`** — the homepage promo. Full-bleed (breaks out
  of `Portfolio.tsx`'s padded container deliberately), cinematic image
  reveal, staggered headline/subtitle/button entrance, dark gradient for
  legibility. All copy (headline, subtitle, button labels/links,
  background image) comes from `seasonal.homepageFeature` — no hardcoded
  strings in the component.
- **`HalloweenGallery.tsx`** — the dedicated Halloween portfolio. Projects
  (`src/data/halloween.ts`) support multiple photos each plus an optional
  before/after pair — richer than the generic single-image `Artwork` type
  used elsewhere, because a Halloween booking is usually a whole look, not
  one photo. Reuses the existing `ArtworkLightbox` via a small adapter
  that flattens each project's before/after/gallery images into lightbox
  items. Filterable by theme (skulls, clowns, horror, character
  transformations, custom concepts).
- **`HalloweenBooking.tsx`** — the dedicated booking section (separate
  from the general Tattoo/Airbrush `Booking.tsx`, reflecting that
  Halloween is its own major opportunity). Collects name/contact,
  requested date + time, party size, desired design, optional event
  location (for group bookings), reference images, and additional
  details — reuses the same generic `BookingForm` component and
  mailto/endpoint-POST submission logic as the rest of the site (see
  below), just with its own field config and its own env var,
  `VITE_HALLOWEEN_FORM_ENDPOINT`.

### Deposit policy

`seasonal.booking.deposit` is **informational only** — it displays a
policy note ("A $50 deposit secures your booking...") so visitors know
what to expect. It does not collect payment. Per the brief, this site
does not take payments online; deposits are arranged directly with the
artist, or through whatever external service you connect via
`seasonal.booking.externalBookingUrl` (e.g. Square, Calendly) — when set,
a prominent "Book via..." link appears above the in-page form.

### Placeholder Halloween photography

`halloweenProjects` in `src/data/halloween.ts` currently point at
generated SVG placeholders (`src/assets/images/placeholders/halloween-*`),
clearly stamped "PLACEHOLDER IMAGE" — never presented as real client work.
Replace them with real photos (with the client's permission to publish)
the same way as the rest of the site's placeholder photography — see
`src/assets/images/README.md`.

## Booking form — connecting a real submission service

The Booking form works out of the box with **no external service**: it
opens the visitor's email client with a pre-filled inquiry (a `mailto:`
link). It never fakes a successful submission.

To get a real in-page submit with a success/error state instead, connect a
static-form backend (e.g. [Formspree](https://formspree.io),
[Getform](https://getform.io), [Basin](https://usebasin.com)) and set:

```bash
# .env.local (copy from .env.example)
VITE_TATTOO_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
VITE_AIRBRUSH_FORM_ENDPOINT=https://formspree.io/f/yyyyyyy
VITE_HALLOWEEN_FORM_ENDPOINT=https://formspree.io/f/zzzzzzz
```

When these are set, the form POSTs `FormData` (including selected reference
images) directly to the endpoint. When unset, it falls back to the mailto
flow automatically.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys `dist/` to
GitHub Pages on every push to `main`, using the standard
`actions/upload-pages-artifact` + `actions/deploy-pages` flow.

**One-time setup:**

1. In your GitHub repo, go to **Settings → Pages → Build and deployment →
   Source** and select **GitHub Actions**.
2. (Optional) If you're using the Formspree/Getform env vars above, add
   them as **repository variables** (Settings → Secrets and variables →
   Actions → Variables) named `VITE_TATTOO_FORM_ENDPOINT`,
   `VITE_AIRBRUSH_FORM_ENDPOINT`, and `VITE_HALLOWEEN_FORM_ENDPOINT` — the
   workflow reads them via `vars.*`.
3. Push to `main`. The workflow builds and deploys automatically; the
   Pages URL appears in the Actions run summary and in Settings → Pages.

### Custom domain (reddsairbrush.com) — already configured

This repo is set up to deploy at the custom domain **reddsairbrush.com**:

- `public/CNAME` contains `reddsairbrush.com` — Vite copies everything in
  `public/` into `dist/` on build, so GitHub Pages picks it up
  automatically on every deploy.
- `vite.config.ts` sets `base: '/'` (a custom domain is served from the
  domain root, not a `/repo-name/` subpath), which is why every asset —
  including the logo images above — resolves correctly at that domain.

You still need to point DNS at GitHub Pages and confirm the domain in
**Settings → Pages → Custom domain** (GitHub will show DNS instructions —
an `A`/`ALIAS` record for an apex domain like `reddsairbrush.com`, or a
`CNAME` record for a `www` subdomain).

### Changing the base path (moving off the custom domain, or renaming the repo)

If you ever stop using the custom domain and fall back to the default
GitHub Pages project-page URL (`https://<user>.github.io/<repo-name>/`)
instead:

1. Delete `public/CNAME`.
2. In `vite.config.ts`, change `base: process.env.VITE_BASE_PATH ?? '/'`
   to `base: process.env.VITE_BASE_PATH ?? '/<repo-name>/'`.

You can also override the base path at build time without editing the
file, via `VITE_BASE_PATH=/whatever/ npm run build`.

## Accessibility & motion

- All interactive elements are real `<button>`/`<a>` elements with visible
  focus states and descriptive `aria-label`s (lightbox controls, social
  links, mobile menu toggle).
- Every artwork has a descriptive `alt`; decorative background imagery uses
  `alt=""` + `role="presentation"`. The hero logo images keep the brand
  name as their `alt` text (sourced from `site.brandTattoo` /
  `site.brandAirbrush`) and stay wrapped in `<h1>` tags, so the heading
  structure and announced content are unchanged even though the heading
  text is now an image rather than a styled string.
- No `text-shadow`, `-webkit-text-stroke`, or decorative pseudo-elements are
  used to approximate lettering/flourishes anywhere in the CSS — ornamental
  detail comes from real font files or real logo artwork, never faked.
- `prefers-reduced-motion` is respected globally: CSS transitions collapse
  to ~0ms, and `<MotionConfig reducedMotion="user">` (in `App.tsx`) disables
  Motion's transform/gesture animations for users who've requested reduced
  motion at the OS level.
