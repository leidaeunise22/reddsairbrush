# Image assets

## `placeholders/`

Every file in this folder is a **generated, non-photographic placeholder** —
a grayscale gradient, a faint line-art motif, film grain, and a
"PLACEHOLDER IMAGE" stamp. They exist so the site's layout, aspect-ratio
handling, filtering, and lightbox can be built and tested before real
photography is available. **None of these represent the artist's actual
work** — they are intentionally abstract so they can never be mistaken for
real tattoo/airbrush pieces.

They're produced by `scripts/generate-placeholders.mjs` from the repo root:

```bash
node scripts/generate-placeholders.mjs
```

Edit the `PLACEHOLDERS` / `HERO_IMAGES` arrays in that script to add, rename,
or resize placeholder entries, then re-run it.

## `tattoo/`

Real studio photography. Holds 5 real tattoo pieces (sacred heart, rose
memorial sleeve, wolf family, scales of justice, and an archangel sleeve)
used throughout the `tattoos` category, both sides of the homepage hero's
side imagery, and the "Tattoos" category tile — plus `tattooshop.jpg`, a
photo of the artist himself in the shop, used for the About section
portrait. That one's kept in **color** deliberately — a `contrast-105`
boost only, no grayscale filter — unlike the rest of this folder's strictly
black-and-grey tattoo photography.

Every other category — airbrush, shoes, license plates, helmets, portraits,
custom items — is still using generated `placeholders/` art. Follow the
steps below to replace those as real photos come in.

## `halloween/`

Real photography for the Halloween homepage feature (`HalloweenFeature.tsx`,
wired up via `src/data/seasonal.ts`). Rendered in grayscale (plus a
contrast boost) via CSS, same treatment as `tattoo/`, so it matches the
rest of the site rather than being a color exception. The Halloween
portfolio gallery's own photos (`HalloweenGallery.tsx`,
`src/data/halloween.ts`) still use `placeholders/` — see that data file to
swap those in the same way as below.

## Replacing placeholders with real photography

1. Shoot or export real photos of finished work — grayscale/B&W processing
   is recommended to match the site's visual identity, but color photos
   will also render fine since the UI chrome around them is already
   grayscale (the About section's artist photo is the one deliberate color
   exception — see `artist/` above).
2. Save each image into `tattoo/` (or `halloween/`, `photos/` for any new
   category folder you start), using a descriptive filename:
   `airbrush-flame-tank-panel.jpg`, `helmet-skull-full.jpg`, etc.
3. Open `src/data/artwork.ts` and:
   - Add `import myImage from "../assets/images/tattoo/my-file.jpg";` at the
     top.
   - Point the relevant `Artwork.image` field at `myImage` (or add a new
     `Artwork` entry — see `src/types/artwork.ts` for the shape).
4. Do the same in `src/data/categories.ts` for the 7 category tile images.
5. Set an accurate `alt` string for every entry — this drives screen-reader
   support and is required by the type.

No component code needs to change. `CategoryGallery`, `FeaturedWork`, and
`ArtworkLightbox` all read from `src/data/artwork.ts` /
`src/data/categories.ts`, so adding, removing, or reordering entries in
those two files is enough to update what appears on the site (including
gallery order — entries render in array order).

### Aspect ratios

Each `Artwork` has an `aspect` of `"portrait" | "landscape" | "square" |
"wide"`. The gallery grid and lightbox both size images by their intrinsic
aspect ratio (via CSS `object-fit: contain` in the lightbox and
`aspect-ratio` hints in the grid), so mixed aspect ratios are expected and
supported — don't pre-crop photos to force a single ratio.

### Formats

Prefer `.webp` or well-compressed `.jpg` for photos (smaller payload than
PNG for photographic content). SVG is only appropriate for the generated
placeholders/line art, not photography.
