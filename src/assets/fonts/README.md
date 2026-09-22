# Premium Chicano/blackletter font (secondary display headings)

The hero wordmarks are real logo artwork, not text (see
`public/images/branding/` and the "Brand logos" section of the root
README), so the only remaining use of a display lettering face is
**secondary display headings** — About, Portfolio, Featured
Work/Tattoos/Airbrush, Book Your Piece, and the small footer wordmark.

Right now these use **Eagle Lake** (loaded from Google Fonts in
`index.html`), a free, properly-licensed rounded-blackletter face with
flowing swashes — selected from a side-by-side comparison of real,
embeddable candidates at `public/typography-preview.html`. It's a good
fallback, not necessarily the final word: if you want a pixel-match to
authentic Chicano tattoo-lettering references (e.g. a font like "Chico
Mato"), that lives in commercial type foundries, not Google Fonts, and
requires you to purchase a license and download the font files yourself.

**Halloween section headings (`HalloweenFeature`/`HalloweenGallery`/
`HalloweenBooking`) intentionally do NOT use this font.** They're pinned
to `--font-halloween` (currently Pirata One) in `src/index.css`, kept
separate on purpose — installing a premium font here only affects
`--font-gothic`, not Halloween.

## How to install a licensed premium font once you have one

1. Buy/download the webfont files (`.woff2` and `.woff` if provided) and
   place them here, named to match what's referenced in
   `premium-fonts.css.example`:

   ```
   src/assets/fonts/chico-mato.woff2
   src/assets/fonts/chico-mato.woff
   ```

   (or `qustyle.woff2`/`.woff`, or `kingdom-of-heaven.woff2`/`.woff` — see
   that file for all three blocks, uncomment whichever one matches what
   you bought.)

2. Rename `premium-fonts.css.example` (in this folder) to
   `premium-fonts.css`.

3. In `src/index.css`, add one import line near the top, above the
   `@theme` block:

   ```css
   @import "tailwindcss";
   @import "./assets/fonts/premium-fonts.css"; /* add this line */

   @theme {
     ...
   ```

That's it — no other changes needed. The `--font-gothic` token in
`src/index.css` already lists `"Chico Mato", "Qustyle", "Kingdom of
Heaven", "Eagle Lake"` in that priority order, so the moment `@font-face`
registers one of those family names, the browser picks it up automatically
everywhere `font-gothic` is used; Eagle Lake remains the fallback for any
visitor whose browser hasn't loaded the new font yet (or if you skip this
step entirely).

**Do not** try to fake the missing font's ornamentation with CSS
(`text-shadow`, `-webkit-text-stroke`, decorative `::before`/`::after`
pseudo-elements, etc.) — that produces a blurry knockoff, not the real
letterforms. Ship the real font files, or keep the clean Eagle Lake
fallback until you can.
