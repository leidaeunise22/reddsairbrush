/**
 * Central content types for the site's portfolio system.
 * Add/remove/reorder artwork by editing src/data/artwork.ts only —
 * no component code needs to change.
 */

export type CategoryId =
  | "tattoos"
  | "airbrush"
  | "shoes"
  | "license-plates"
  | "helmets"
  | "portraits"
  | "custom-items"
  // Halloween face painting has its own dedicated gallery (HalloweenGallery.tsx,
  // src/data/halloween.ts) rather than a tile in the main CategoryGallery — this
  // value exists only so ArtworkLightbox can label those pieces correctly when
  // reused for Halloween projects.
  | "halloween";

export interface Category {
  id: CategoryId;
  label: string;
  /** Short line shown on the category tile. */
  tagline: string;
  /** Image module path (see src/assets/images). */
  image: string;
}

export type AspectRatio = "portrait" | "landscape" | "square" | "wide";

export interface Artwork {
  id: string;
  title: string;
  category: CategoryId;
  image: string;
  /** Optional longer description shown in the lightbox. */
  description?: string;
  /** Included in the homepage "Featured Work" strip when true. */
  featured?: boolean;
  aspect?: AspectRatio;
  /** Optional client/medium credit line, e.g. "Custom airbrush, acrylic on leather". */
  medium?: string;
  alt: string;
}
