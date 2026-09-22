#!/usr/bin/env node
/**
 * Generates the temporary placeholder artwork used throughout the site.
 *
 * These are intentionally abstract, clearly-labeled SVGs (grain + a category
 * motif + a "PLACEHOLDER IMAGE" stamp) — never photorealistic renders — so
 * nothing here could be mistaken for the artist's actual work.
 *
 * Run again any time you add a new placeholder entry to PLACEHOLDERS below:
 *   node scripts/generate-placeholders.mjs
 *
 * To swap in real photography, see src/assets/images/README.md.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "src", "assets", "images", "placeholders");
mkdirSync(OUT_DIR, { recursive: true });

const DIMENSIONS = {
  portrait: [800, 1000],
  landscape: [1000, 700],
  square: [900, 900],
  wide: [1200, 675],
  banner: [1920, 1080],
};

// Simple hand-drawn line motifs per category — deliberately abstract.
const MOTIFS = {
  tattoos: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5" stroke-linecap="round">
      <path d="M ${cx - s * 0.22} ${cy + s * 0.18} L ${cx + s * 0.12} ${cy - s * 0.2} L ${cx + s * 0.2} ${cy - s * 0.12} L ${cx - s * 0.14} ${cy + s * 0.26} Z" />
      <line x1="${cx + s * 0.2}" y1="${cy - s * 0.12}" x2="${cx + s * 0.32}" y2="${cy - s * 0.24}" />
      <circle cx="${cx + s * 0.34}" cy="${cy - s * 0.26}" r="${s * 0.025}" fill="#d8d5cd" />
    </g>`,
  airbrush: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5" stroke-linecap="round">
      <rect x="${cx - s * 0.06}" y="${cy - s * 0.22}" width="${s * 0.12}" height="${s * 0.3}" rx="${s * 0.02}" />
      <line x1="${cx - s * 0.03}" y1="${cy - s * 0.28}" x2="${cx - s * 0.03}" y2="${cy - s * 0.22}" />
      <path d="M ${cx + s * 0.08} ${cy + s * 0.1} q ${s * 0.15} ${s * 0.02} ${s * 0.22} ${s * 0.16}" opacity="0.35" />
      <path d="M ${cx + s * 0.08} ${cy + s * 0.16} q ${s * 0.12} ${s * 0.04} ${s * 0.18} ${s * 0.2}" opacity="0.25" />
    </g>`,
  shoes: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${cx - s * 0.3} ${cy + s * 0.1} q 0 ${-s * 0.08} ${s * 0.1} ${-s * 0.1} q ${s * 0.08} ${-s * 0.16} ${s * 0.2} ${-s * 0.1} q ${s * 0.1} ${s * 0.04} ${s * 0.18} ${s * 0.02} q ${s * 0.1} ${-s * 0.02} ${s * 0.12} ${s * 0.08} q ${s * 0.02} ${s * 0.1} ${-s * 0.06} ${s * 0.12} l ${-s * 0.5} ${s * 0.02} Z" />
      <line x1="${cx - s * 0.12}" y1="${cy - s * 0.06}" x2="${cx - s * 0.02}" y2="${cy - s * 0.12}" />
      <line x1="${cx - s * 0.04}" y1="${cy - s * 0.02}" x2="${cx + s * 0.06}" y2="${cy - s * 0.08}" />
    </g>`,
  "license-plates": (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <rect x="${cx - s * 0.28}" y="${cy - s * 0.14}" width="${s * 0.56}" height="${s * 0.28}" rx="${s * 0.02}" />
      <line x1="${cx - s * 0.2}" y1="${cy}" x2="${cx + s * 0.2}" y2="${cy}" stroke-width="${s * 0.03}" opacity="0.3" />
      <circle cx="${cx - s * 0.22}" cy="${cy - s * 0.1}" r="${s * 0.012}" fill="#d8d5cd" />
      <circle cx="${cx + s * 0.22}" cy="${cy - s * 0.1}" r="${s * 0.012}" fill="#d8d5cd" />
    </g>`,
  helmets: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <path d="M ${cx - s * 0.22} ${cy + s * 0.08} a ${s * 0.22} ${s * 0.2} 0 0 1 ${s * 0.44} 0 l 0 ${s * 0.02} l ${-s * 0.44} 0 Z" />
      <line x1="${cx - s * 0.22}" y1="${cy + s * 0.1}" x2="${cx + s * 0.22}" y2="${cy + s * 0.1}" />
      <path d="M ${cx + s * 0.1} ${cy + s * 0.1} q ${s * 0.02} ${s * 0.08} ${-s * 0.02} ${s * 0.12}" />
    </g>`,
  portraits: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <ellipse cx="${cx}" cy="${cy}" rx="${s * 0.16}" ry="${s * 0.2}" />
      <path d="M ${cx - s * 0.06} ${cy - s * 0.02} q ${s * 0.06} ${s * 0.03} ${s * 0.12} 0" opacity="0.4" />
      <line x1="${cx}" y1="${cy - s * 0.2}" x2="${cx}" y2="${cy - s * 0.3}" opacity="0.3" />
    </g>`,
  "custom-items": (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5" stroke-linecap="round">
      <path d="M ${cx} ${cy - s * 0.22} L ${cx + s * 0.06} ${cy - s * 0.06} L ${cx + s * 0.22} ${cy - s * 0.02} L ${cx + s * 0.08} ${cy + s * 0.08} L ${cx + s * 0.12} ${cy + s * 0.24} L ${cx} ${cy + s * 0.12} L ${cx - s * 0.12} ${cy + s * 0.24} L ${cx - s * 0.08} ${cy + s * 0.08} L ${cx - s * 0.22} ${cy - s * 0.02} L ${cx - s * 0.06} ${cy - s * 0.06} Z" />
    </g>`,
};

const CATEGORY_LABELS = {
  tattoos: "TATTOOS",
  airbrush: "AIRBRUSH",
  shoes: "SHOES",
  "license-plates": "LICENSE PLATES",
  helmets: "HELMETS",
  portraits: "PORTRAITS",
  "custom-items": "CUSTOM ITEMS",
};

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svgFor({ category, title, aspect, seed }) {
  const [w, h] = DIMENSIONS[aspect];
  const cx = w / 2;
  const cy = h / 2;
  const s = Math.min(w, h);
  const motif = MOTIFS[category](cx, cy - h * 0.04, s);
  const label = CATEGORY_LABELS[category];
  const grainFreq = (0.7 + (seed % 5) * 0.05).toFixed(2);
  const g1 = 10 + (seed % 4) * 3;
  const g2 = 22 + (seed % 5) * 4;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0c0c" />
      <stop offset="55%" stop-color="#1${g1 % 10}1${g1 % 10}1${g1 % 10}" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </linearGradient>
    <radialGradient id="vig-${seed}" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
    </radialGradient>
    <filter id="grain-${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="${grainFreq}" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg-${seed})" />
  <rect width="${w}" height="${h}" fill="#${g2}${g2}${g2}" opacity="0.15" />
  ${motif}
  <rect width="${w}" height="${h}" filter="url(#grain-${seed})" opacity="0.6" />
  <rect width="${w}" height="${h}" fill="url(#vig-${seed})" />

  <rect x="18" y="18" width="${w - 36}" height="${h - 36}" fill="none" stroke="#d8d5cd" stroke-opacity="0.25" stroke-width="1" />

  <text x="34" y="46" font-family="Jost, sans-serif" font-size="15" letter-spacing="3" fill="#d8d5cd" fill-opacity="0.65">${label}</text>

  <text x="${cx}" y="${h - 64}" text-anchor="middle" font-family="Jost, sans-serif" font-size="12" letter-spacing="4" fill="#d8d5cd" fill-opacity="0.5">PLACEHOLDER IMAGE</text>
  <text x="${cx}" y="${h - 38}" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="22" fill="#ece9e2" fill-opacity="0.85">${escapeXml(title)}</text>
</svg>`;
}

// filename, title, category, aspect
const PLACEHOLDERS = [
  ["tile-tattoos", "Tattoo Work", "tattoos", "square"],
  ["tile-airbrush", "Airbrush Work", "airbrush", "square"],
  ["tile-shoes", "Custom Shoes", "shoes", "square"],
  ["tile-license-plates", "License Plates", "license-plates", "square"],
  ["tile-helmets", "Helmets", "helmets", "square"],
  ["tile-portraits", "Portraits", "portraits", "square"],
  ["tile-custom-items", "Custom Items", "custom-items", "square"],

  ["tattoo-tiger-eye-realism", "Tiger Eye — Realism Sleeve", "tattoos", "square"],
  ["tattoo-butterfly-forearm", "Butterfly — Fine Line", "tattoos", "square"],
  ["tattoo-religious-figure-back", "Sacred Heart — Back Piece", "tattoos", "portrait"],
  ["tattoo-skull-clock-forearm", "Skull & Clock — Forearm", "tattoos", "portrait"],
  ["tattoo-mandala-shoulder", "Mandala — Shoulder Cap", "tattoos", "square"],
  ["tattoo-rose-sleeve", "Rose Sleeve — Black & Grey", "tattoos", "portrait"],

  ["airbrush-female-portrait-tears", "Sorrow — Airbrush Portrait", "airbrush", "portrait"],
  ["airbrush-guardian-figure-robe", "Guardian — Robed Figure", "airbrush", "portrait"],
  ["airbrush-flame-tank-panel", "Flame Panel — Fuel Tank", "airbrush", "landscape"],
  ["airbrush-abstract-smoke", "Abstract Smoke Study", "airbrush", "landscape"],

  ["shoes-airforce1-custom-portrait", "Custom Portrait — Sneaker", "shoes", "landscape"],
  ["shoes-airforce1-clean", "Clean Canvas — Sneaker", "shoes", "landscape"],
  ["shoes-canvas-floral", "Floral Study — Canvas Shoe", "shoes", "landscape"],

  ["license-plate-texas-elpaso", "Texas — El Paso Plate", "license-plates", "landscape"],
  ["license-plate-flames", "Flame Plate", "license-plates", "landscape"],

  ["helmet-flame-motorcycle", "Flame Wrap — Full Helmet", "helmets", "wide"],
  ["helmet-skull-full", "Skull Study — Full Helmet", "helmets", "square"],

  ["portrait-woman-realism-bw", "Realism Study — B&W", "portraits", "portrait"],
  ["portrait-elderly-man-bw", "Character Study — B&W", "portraits", "portrait"],

  ["custom-car-mural-mustang", "Mural — Classic Mustang", "custom-items", "wide"],
  ["custom-flame-tumbler-cup", "Flame Wrap — Tumbler", "custom-items", "portrait"],
  ["custom-guitar-body-art", "Body Art — Guitar", "custom-items", "landscape"],
];

PLACEHOLDERS.forEach(([filename, title, category, aspect], index) => {
  const svg = svgFor({ category, title, aspect, seed: index + 1 });
  writeFileSync(join(OUT_DIR, `${filename}.svg`), svg, "utf8");
});

// --- Full-bleed hero art (atmospheric, no center card treatment) ---
function heroSvgFor({ title, seed, side }) {
  const w = 900;
  const h = 1400;
  const cx = side === "left" ? w * 0.62 : w * 0.38;
  const cy = h * 0.46;
  const g1 = 8 + (seed % 4) * 3;

  const figure =
    side === "left"
      ? `<g stroke="#d8d5cd" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round">
          <path d="M ${cx - 160} ${cy - 260} q -60 140 -20 320 q 20 100 -10 220" />
          <path d="M ${cx - 90} ${cy - 300} q -40 160 0 340 q 20 90 -20 200" opacity="0.35" />
          <circle cx="${cx - 60}" cy="${cy - 140}" r="70" opacity="0.3" />
          <path d="M ${cx - 130} ${cy + 40} q 40 20 70 -10" opacity="0.4" />
        </g>`
      : `<g stroke="#d8d5cd" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round">
          <ellipse cx="${cx + 80}" cy="${cy - 60}" rx="150" ry="210" opacity="0.4" />
          <path d="M ${cx - 10} ${cy - 20} q 40 30 90 10" opacity="0.35" />
          <path d="M ${cx + 40} ${cy - 240} q 90 60 60 220 q -10 80 40 160" opacity="0.3" />
          <line x1="${cx + 60}" y1="${cy + 20}" x2="${cx + 60}" y2="${cy + 260}" opacity="0.25" />
        </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="hbg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0b0b" />
      <stop offset="50%" stop-color="#1${g1 % 10}1${g1 % 10}1${g1 % 10}" />
      <stop offset="100%" stop-color="#080808" />
    </linearGradient>
    <radialGradient id="hvig-${seed}" cx="${side === "left" ? "70%" : "30%"}" cy="40%" r="80%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.8" />
    </radialGradient>
    <filter id="hgrain-${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0" />
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#hbg-${seed})" />
  ${figure}
  <rect width="${w}" height="${h}" filter="url(#hgrain-${seed})" opacity="0.7" />
  <rect width="${w}" height="${h}" fill="url(#hvig-${seed})" />
  <text x="${side === "left" ? 28 : w - 28}" y="${h - 28}" text-anchor="${side === "left" ? "start" : "end"}" font-family="Jost, sans-serif" font-size="13" letter-spacing="3" fill="#d8d5cd" fill-opacity="0.45">PLACEHOLDER — ${escapeXml(title)}</text>
</svg>`;
}

const HERO_IMAGES = [
  ["hero-tattoo-arm-sleeve", "Tattoo Sleeve Study", "left"],
  ["hero-airbrush-portrait-face", "Airbrush Portrait Study", "right"],
];

HERO_IMAGES.forEach(([filename, title, side], index) => {
  const svg = heroSvgFor({ title, side, seed: 100 + index });
  writeFileSync(join(OUT_DIR, `${filename}.svg`), svg, "utf8");
});

// --- Halloween face-painting placeholders ---------------------------------
const HALLOWEEN_MOTIFS = {
  skulls: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <ellipse cx="${cx}" cy="${cy - s * 0.02}" rx="${s * 0.15}" ry="${s * 0.17}" />
      <ellipse cx="${cx - s * 0.06}" cy="${cy - s * 0.03}" rx="${s * 0.035}" ry="${s * 0.045}" />
      <ellipse cx="${cx + s * 0.06}" cy="${cy - s * 0.03}" rx="${s * 0.035}" ry="${s * 0.045}" />
      <line x1="${cx}" y1="${cy + s * 0.01}" x2="${cx}" y2="${cy + s * 0.06}" />
      <path d="M ${cx - s * 0.08} ${cy + s * 0.1} q ${s * 0.08} ${s * 0.05} ${s * 0.16} 0" />
      <line x1="${cx - s * 0.05}" y1="${cy + s * 0.1}" x2="${cx - s * 0.05}" y2="${cy + s * 0.14}" opacity="0.4" />
      <line x1="${cx + s * 0.05}" y1="${cy + s * 0.1}" x2="${cx + s * 0.05}" y2="${cy + s * 0.14}" opacity="0.4" />
    </g>`,
  clowns: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <ellipse cx="${cx}" cy="${cy}" rx="${s * 0.17}" ry="${s * 0.2}" />
      <circle cx="${cx}" cy="${cy + s * 0.02}" r="${s * 0.025}" fill="#d8d5cd" opacity="0.4" />
      <path d="M ${cx - s * 0.1} ${cy + s * 0.08} q ${s * 0.1} ${s * 0.1} ${s * 0.2} 0" />
      <path d="M ${cx - s * 0.14} ${cy - s * 0.08} q ${s * 0.04} ${-s * 0.04} ${s * 0.08} 0" opacity="0.4" />
      <path d="M ${cx + s * 0.06} ${cy - s * 0.08} q ${s * 0.04} ${-s * 0.04} ${s * 0.08} 0" opacity="0.4" />
    </g>`,
  horror: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <ellipse cx="${cx}" cy="${cy}" rx="${s * 0.16}" ry="${s * 0.19}" />
      <path d="M ${cx - s * 0.07} ${cy - s * 0.04} l ${s * 0.03} ${s * 0.04} l ${-s * 0.02} ${s * 0.03}" />
      <path d="M ${cx + s * 0.07} ${cy - s * 0.04} l ${-s * 0.03} ${s * 0.04} l ${s * 0.02} ${s * 0.03}" />
      <path d="M ${cx - s * 0.1} ${cy + s * 0.1} l ${s * 0.02} ${s * 0.03} l ${s * 0.02} ${-s * 0.03} l ${s * 0.02} ${s * 0.03} l ${s * 0.02} ${-s * 0.03} l ${s * 0.02} ${s * 0.03} l ${s * 0.02} ${-s * 0.03} l ${s * 0.02} ${s * 0.03} l ${s * 0.02} ${-s * 0.03}" />
    </g>`,
  character: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <ellipse cx="${cx}" cy="${cy}" rx="${s * 0.16}" ry="${s * 0.19}" />
      <path d="M ${cx - s * 0.16} ${cy - s * 0.1} q ${s * 0.16} ${-s * 0.1} ${s * 0.32} 0" opacity="0.4" />
      <path d="M ${cx - s * 0.08} ${cy - s * 0.02} q ${s * 0.08} ${s * 0.04} ${s * 0.16} 0" />
      <line x1="${cx}" y1="${cy - s * 0.24}" x2="${cx}" y2="${cy - s * 0.32}" opacity="0.35" />
    </g>`,
  custom: (cx, cy, s) => `
    <g stroke="#d8d5cd" stroke-width="${s * 0.012}" fill="none" opacity="0.5">
      <path d="M ${cx} ${cy - s * 0.2} L ${cx + s * 0.05} ${cy - s * 0.05} L ${cx + s * 0.2} ${cy} L ${cx + s * 0.05} ${cy + s * 0.05} L ${cx} ${cy + s * 0.2} L ${cx - s * 0.05} ${cy + s * 0.05} L ${cx - s * 0.2} ${cy} L ${cx - s * 0.05} ${cy - s * 0.05} Z" />
      <circle cx="${cx}" cy="${cy}" r="${s * 0.04}" />
    </g>`,
};

const HALLOWEEN_THEME_LABELS = {
  skulls: "SKULLS",
  clowns: "CLOWNS",
  horror: "HORROR",
  character: "CHARACTER",
  custom: "CUSTOM",
};

function halloweenSvgFor({ theme, tag, title, aspect, seed }) {
  const [w, h] = DIMENSIONS[aspect];
  const cx = w / 2;
  const cy = h / 2;
  const s = Math.min(w, h);
  const motif = HALLOWEEN_MOTIFS[theme](cx, cy - h * 0.04, s);
  const label = HALLOWEEN_THEME_LABELS[theme];
  const grainFreq = (0.7 + (seed % 5) * 0.05).toFixed(2);
  const g1 = 10 + (seed % 4) * 3;
  const g2 = 22 + (seed % 5) * 4;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="hw-bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0c0c" />
      <stop offset="55%" stop-color="#1${g1 % 10}1${g1 % 10}1${g1 % 10}" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </linearGradient>
    <radialGradient id="hw-vig-${seed}" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
    </radialGradient>
    <filter id="hw-grain-${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="${grainFreq}" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#hw-bg-${seed})" />
  <rect width="${w}" height="${h}" fill="#${g2}${g2}${g2}" opacity="0.15" />
  ${motif}
  <rect width="${w}" height="${h}" filter="url(#hw-grain-${seed})" opacity="0.6" />
  <rect width="${w}" height="${h}" fill="url(#hw-vig-${seed})" />

  <rect x="18" y="18" width="${w - 36}" height="${h - 36}" fill="none" stroke="#d8d5cd" stroke-opacity="0.25" stroke-width="1" />

  <text x="34" y="46" font-family="Jost, sans-serif" font-size="15" letter-spacing="3" fill="#d8d5cd" fill-opacity="0.65">HALLOWEEN — ${label}${tag ? ` — ${tag}` : ""}</text>

  <text x="${cx}" y="${h - 64}" text-anchor="middle" font-family="Jost, sans-serif" font-size="12" letter-spacing="4" fill="#d8d5cd" fill-opacity="0.5">PLACEHOLDER IMAGE</text>
  <text x="${cx}" y="${h - 38}" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="22" fill="#ece9e2" fill-opacity="0.85">${escapeXml(title)}</text>
</svg>`;
}

// filename, theme, tag ("BEFORE" | "AFTER" | null), title, aspect
const HALLOWEEN_PLACEHOLDERS = [
  ["halloween-sugar-skull-before", "skulls", "BEFORE", "Sugar Skull — Before", "portrait"],
  ["halloween-sugar-skull-after", "skulls", "AFTER", "Sugar Skull — After", "portrait"],
  ["halloween-sugar-skull-detail", "skulls", null, "Sugar Skull — Detail", "square"],

  ["halloween-horror-clown-1", "clowns", null, "Horror Clown — Look 1", "portrait"],
  ["halloween-horror-clown-2", "clowns", null, "Horror Clown — Look 2", "portrait"],

  ["halloween-zombie-before", "horror", "BEFORE", "Zombie Transformation — Before", "portrait"],
  ["halloween-zombie-after", "horror", "AFTER", "Zombie Transformation — After", "portrait"],

  ["halloween-fantasy-character-1", "character", null, "Dark Fantasy Character — Look 1", "portrait"],
  ["halloween-fantasy-character-2", "character", null, "Dark Fantasy Character — Look 2", "square"],
  ["halloween-fantasy-character-3", "character", null, "Dark Fantasy Character — Look 3", "portrait"],

  ["halloween-porcelain-doll-before", "custom", "BEFORE", "Cracked Porcelain Doll — Before", "portrait"],
  ["halloween-porcelain-doll-after", "custom", "AFTER", "Cracked Porcelain Doll — After", "portrait"],

  ["halloween-skeletal-king-1", "skulls", null, "Skeletal King — Look 1", "portrait"],
  ["halloween-skeletal-king-2", "skulls", null, "Skeletal King — Look 2", "square"],
];

HALLOWEEN_PLACEHOLDERS.forEach(([filename, theme, tag, title, aspect], index) => {
  const svg = halloweenSvgFor({ theme, tag, title, aspect, seed: 200 + index });
  writeFileSync(join(OUT_DIR, `${filename}.svg`), svg, "utf8");
});

// Full-bleed homepage feature background (banner aspect, atmospheric — no
// center card treatment, matching the hero side-image style).
function halloweenBannerSvg({ seed }) {
  const [w, h] = DIMENSIONS.banner;
  const cx = w / 2;
  const cy = h * 0.42;
  const s = Math.min(w, h);
  const g1 = 8 + (seed % 4) * 3;

  const motif = `
    <g stroke="#d8d5cd" stroke-width="3" fill="none" opacity="0.4">
      <ellipse cx="${cx}" cy="${cy}" rx="${s * 0.22}" ry="${s * 0.27}" />
      <path d="M ${cx - s * 0.1} ${cy - s * 0.04} q ${s * 0.1} ${s * 0.06} ${s * 0.2} 0" opacity="0.35" />
      <path d="M ${cx - s * 0.09} ${cy - s * 0.09} q ${s * 0.05} ${-s * 0.04} ${s * 0.1} 0" opacity="0.3" />
      <path d="M ${cx + s * 0.09} ${cy - s * 0.09} q ${s * 0.05} ${-s * 0.04} ${s * 0.1} 0" opacity="0.3" />
      <line x1="${cx}" y1="${cy - s * 0.27}" x2="${cx}" y2="${cy - s * 0.38}" opacity="0.25" />
      <path d="M ${cx - s * 0.28} ${cy + s * 0.2} q ${s * 0.28} ${s * 0.12} ${s * 0.56} 0" opacity="0.2" />
    </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="hwb-bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0b0b" />
      <stop offset="50%" stop-color="#1${g1 % 10}1${g1 % 10}1${g1 % 10}" />
      <stop offset="100%" stop-color="#070707" />
    </linearGradient>
    <radialGradient id="hwb-vig-${seed}" cx="50%" cy="38%" r="85%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
    </radialGradient>
    <filter id="hwb-grain-${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0" />
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#hwb-bg-${seed})" />
  ${motif}
  <rect width="${w}" height="${h}" filter="url(#hwb-grain-${seed})" opacity="0.7" />
  <rect width="${w}" height="${h}" fill="url(#hwb-vig-${seed})" />
  <text x="40" y="${h - 40}" font-family="Jost, sans-serif" font-size="16" letter-spacing="3" fill="#d8d5cd" fill-opacity="0.45">PLACEHOLDER — Halloween Feature Background</text>
</svg>`;
}

writeFileSync(join(OUT_DIR, "halloween-feature-background.svg"), halloweenBannerSvg({ seed: 300 }), "utf8");

console.log(
  `Generated ${PLACEHOLDERS.length + HERO_IMAGES.length + HALLOWEEN_PLACEHOLDERS.length + 1} placeholder images in ${OUT_DIR}`,
);
