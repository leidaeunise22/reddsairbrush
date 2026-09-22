import type { Artwork } from "@/types/artwork";

// Real photography
import tattooSacredHeart from "@/assets/images/tattoo/tattoo-sacred-heart-forearm.jpg";
import tattooRoseMemorial from "@/assets/images/tattoo/tattoo-rose-memorial-sleeve.jpg";
import tattooWolfFamily from "@/assets/images/tattoo/tattoo-wolf-family-forearm.jpg";
import tattooAngelScales from "@/assets/images/tattoo/tattoo-angel-scales-shoulder.jpg";
import tattooArchangelPsalms from "@/assets/images/tattoo/tattoo-archangel-psalms-sleeve.jpg";

// Placeholders — see src/assets/images/README.md to replace these with real photos
import tigerEye from "@/assets/images/placeholders/tattoo-tiger-eye-realism.svg";
import butterfly from "@/assets/images/placeholders/tattoo-butterfly-forearm.svg";

import airbrushPortraitTears from "@/assets/images/placeholders/airbrush-female-portrait-tears.svg";
import guardianFigure from "@/assets/images/placeholders/airbrush-guardian-figure-robe.svg";
import flameTankPanel from "@/assets/images/placeholders/airbrush-flame-tank-panel.svg";
import abstractSmoke from "@/assets/images/placeholders/airbrush-abstract-smoke.svg";

import shoePortrait from "@/assets/images/placeholders/shoes-airforce1-custom-portrait.svg";
import shoeClean from "@/assets/images/placeholders/shoes-airforce1-clean.svg";
import shoeFloral from "@/assets/images/placeholders/shoes-canvas-floral.svg";

import plateTexas from "@/assets/images/placeholders/license-plate-texas-elpaso.svg";
import plateFlames from "@/assets/images/placeholders/license-plate-flames.svg";

import helmetFlame from "@/assets/images/placeholders/helmet-flame-motorcycle.svg";
import helmetSkull from "@/assets/images/placeholders/helmet-skull-full.svg";

import portraitWoman from "@/assets/images/placeholders/portrait-woman-realism-bw.svg";
import portraitMan from "@/assets/images/placeholders/portrait-elderly-man-bw.svg";

import carMural from "@/assets/images/placeholders/custom-car-mural-mustang.svg";
import flameTumbler from "@/assets/images/placeholders/custom-flame-tumbler-cup.svg";
import guitarBody from "@/assets/images/placeholders/custom-guitar-body-art.svg";

/**
 * All portfolio artwork. This is the single source of truth for both the
 * category-filtered gallery and the homepage "Featured Work" strip.
 *
 * - Reorder entries to change gallery order (featured strip preserves the
 *   same relative order, filtered to `featured: true`).
 * - Delete an entry to remove it everywhere.
 * - Add a new entry (with a new image import above) to add new work — no
 *   component changes required.
 *
 * Tattoo entries below are real studio photography. Every other category
 * (airbrush, shoes, license plates, helmets, portraits, custom items) is
 * still using generated placeholder art — see src/assets/images/README.md
 * for how to swap those out as real photos come in.
 */
export const artwork: Artwork[] = [
  {
    id: "tattoo-archangel-psalms-sleeve",
    title: "Archangel",
    category: "tattoos",
    image: tattooArchangelPsalms,
    description: "Full sleeve archangel piece with scripture banner, fine stipple shading.",
    medium: "Tattoo — black & grey realism",
    featured: true,
    aspect: "portrait",
    alt: "Black and grey realism tattoo of an archangel with wings and a scripture banner on a forearm sleeve",
  },
  {
    id: "custom-car-mural-mustang",
    title: "Mustang Mural",
    category: "custom-items",
    image: carMural,
    description: "Full panel mural airbrushed onto a classic Mustang body.",
    medium: "Airbrush — automotive enamel",
    featured: true,
    aspect: "wide",
    alt: "Placeholder artwork representing an airbrushed mural on a classic Mustang",
  },
  {
    id: "airbrush-female-portrait-tears",
    title: "Sorrow",
    category: "airbrush",
    image: airbrushPortraitTears,
    description: "Fine-detail airbrush portrait study, high-contrast monochrome.",
    medium: "Airbrush — acrylic on panel",
    featured: true,
    aspect: "portrait",
    alt: "Placeholder artwork representing a monochrome airbrushed portrait",
  },
  {
    id: "shoes-airforce1-custom-portrait",
    title: "Portrait Kicks",
    category: "shoes",
    image: shoePortrait,
    description: "Custom portrait airbrushed onto a pair of leather sneakers.",
    medium: "Airbrush — leather-safe acrylic",
    featured: true,
    aspect: "landscape",
    alt: "Placeholder artwork representing a custom airbrushed portrait sneaker",
  },
  {
    id: "tattoo-wolf-family-forearm",
    title: "Wolf Family",
    category: "tattoos",
    image: tattooWolfFamily,
    description: "Snarling wolf portrait with two pups, fine linework and dotwork shading.",
    medium: "Tattoo — black & grey realism",
    featured: true,
    aspect: "portrait",
    alt: "Black and grey realism tattoo of a snarling wolf with two wolf pups on a forearm",
  },
  {
    id: "tattoo-butterfly-forearm",
    title: "Fine Line Butterfly",
    category: "tattoos",
    image: butterfly,
    description: "Delicate fine-line butterfly, single-needle detail.",
    medium: "Tattoo — fine line",
    aspect: "square",
    alt: "Placeholder artwork representing a fine line butterfly tattoo",
  },
  {
    id: "helmet-flame-motorcycle",
    title: "Flame Wrap",
    category: "helmets",
    image: helmetFlame,
    description: "Full-wrap flame design across a motorcycle helmet shell.",
    medium: "Airbrush — clear-coated enamel",
    featured: true,
    aspect: "wide",
    alt: "Placeholder artwork representing a flame-wrapped motorcycle helmet",
  },

  {
    id: "tattoo-sacred-heart-forearm",
    title: "Sacred Heart",
    category: "tattoos",
    image: tattooSacredHeart,
    description: "Sacred heart with crown of thorns and radiant rays, forearm placement.",
    medium: "Tattoo — black & grey realism",
    aspect: "portrait",
    alt: "Black and grey realism tattoo of a sacred heart with a crown of thorns on a forearm",
  },
  {
    id: "tattoo-angel-scales-shoulder",
    title: "Scales of Justice",
    category: "tattoos",
    image: tattooAngelScales,
    description: "Winged, hooded figure holding a sword over the scales, storm-cloud backdrop.",
    medium: "Tattoo — black & grey realism",
    aspect: "portrait",
    alt: "Black and grey realism tattoo of a winged hooded figure holding a sword over scales of justice on a shoulder",
  },
  {
    id: "tattoo-rose-memorial-sleeve",
    title: "Rose Memorial Sleeve",
    category: "tattoos",
    image: tattooRoseMemorial,
    description: "Two realism roses with lettered banner and filigree detailing, forearm sleeve.",
    medium: "Tattoo — black & grey realism",
    aspect: "portrait",
    alt: "Black and grey realism tattoo of two roses with a memorial name banner on a forearm sleeve",
  },
  {
    id: "tattoo-tiger-eye-realism",
    title: "Tiger Eye",
    category: "tattoos",
    image: tigerEye,
    description: "Black & grey realism close-up, freehand shading, forearm placement.",
    medium: "Tattoo — black & grey realism",
    aspect: "square",
    alt: "Placeholder artwork representing a black and grey realism tiger eye tattoo",
  },

  {
    id: "airbrush-guardian-figure-robe",
    title: "Guardian",
    category: "airbrush",
    image: guardianFigure,
    description: "Robed guardian figure, custom hood panel.",
    medium: "Airbrush — automotive enamel",
    aspect: "portrait",
    alt: "Placeholder artwork representing a robed guardian figure airbrushed on a hood panel",
  },
  {
    id: "airbrush-flame-tank-panel",
    title: "Flame Panel",
    category: "airbrush",
    image: flameTankPanel,
    description: "Fuel tank flame panel, layered candy clear coats.",
    medium: "Airbrush — automotive enamel",
    aspect: "landscape",
    alt: "Placeholder artwork representing a flame panel airbrushed on a fuel tank",
  },
  {
    id: "airbrush-abstract-smoke",
    title: "Smoke Study",
    category: "airbrush",
    image: abstractSmoke,
    description: "Abstract smoke and mist study, freehand blending.",
    medium: "Airbrush — acrylic on panel",
    aspect: "landscape",
    alt: "Placeholder artwork representing an abstract airbrushed smoke study",
  },

  {
    id: "shoes-airforce1-clean",
    title: "Clean Canvas",
    category: "shoes",
    image: shoeClean,
    description: "Minimal custom detailing on a fresh pair.",
    medium: "Airbrush — leather-safe acrylic",
    aspect: "landscape",
    alt: "Placeholder artwork representing minimal custom sneaker detailing",
  },
  {
    id: "shoes-canvas-floral",
    title: "Floral Study",
    category: "shoes",
    image: shoeFloral,
    description: "Floral motif custom-painted on canvas sneakers.",
    medium: "Airbrush — fabric-safe acrylic",
    aspect: "landscape",
    alt: "Placeholder artwork representing a floral design on canvas sneakers",
  },

  {
    id: "license-plate-texas-elpaso",
    title: "El Paso Plate",
    category: "license-plates",
    image: plateTexas,
    description: "Custom Texas plate rework, El Paso theme.",
    medium: "Airbrush — enamel on metal",
    aspect: "landscape",
    alt: "Placeholder artwork representing a custom El Paso, Texas themed license plate",
  },
  {
    id: "license-plate-flames",
    title: "Flame Plate",
    category: "license-plates",
    image: plateFlames,
    description: "Flame motif license plate, full recolor.",
    medium: "Airbrush — enamel on metal",
    aspect: "landscape",
    alt: "Placeholder artwork representing a flame-themed license plate",
  },

  {
    id: "helmet-skull-full",
    title: "Skull Study",
    category: "helmets",
    image: helmetSkull,
    description: "Full skull illustration across a helmet shell.",
    medium: "Airbrush — clear-coated enamel",
    aspect: "square",
    alt: "Placeholder artwork representing a skull illustration on a motorcycle helmet",
  },

  {
    id: "portrait-woman-realism-bw",
    title: "Realism Study I",
    category: "portraits",
    image: portraitWoman,
    description: "Black & white realism portrait study.",
    medium: "Tattoo — black & grey realism",
    aspect: "portrait",
    alt: "Placeholder artwork representing a black and white realism portrait study",
  },
  {
    id: "portrait-elderly-man-bw",
    title: "Character Study I",
    category: "portraits",
    image: portraitMan,
    description: "Character portrait study, heavy contrast shading.",
    medium: "Tattoo — black & grey realism",
    aspect: "portrait",
    alt: "Placeholder artwork representing a black and white character portrait study",
  },

  {
    id: "custom-flame-tumbler-cup",
    title: "Flame Tumbler",
    category: "custom-items",
    image: flameTumbler,
    description: "Custom flame wrap on a drinkware tumbler.",
    medium: "Airbrush — enamel on stainless",
    aspect: "portrait",
    alt: "Placeholder artwork representing a flame-wrapped custom tumbler",
  },
  {
    id: "custom-guitar-body-art",
    title: "Guitar Body Art",
    category: "custom-items",
    image: guitarBody,
    description: "Custom body art on an electric guitar.",
    medium: "Airbrush — instrument-safe lacquer",
    aspect: "landscape",
    alt: "Placeholder artwork representing custom airbrushed art on an electric guitar body",
  },
];
