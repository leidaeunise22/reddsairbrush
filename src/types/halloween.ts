/**
 * Halloween face painting portfolio — a deliberately richer shape than the
 * general Artwork type (src/types/artwork.ts) because a single Halloween
 * booking is often a whole look, not one photo: multiple in-progress /
 * detail shots, and sometimes a before/after pair. See src/data/halloween.ts.
 */

export type HalloweenTheme = "skulls" | "clowns" | "horror" | "character" | "custom";

export interface HalloweenImage {
  src: string;
  alt: string;
}

export interface HalloweenProject {
  id: string;
  title: string;
  theme: HalloweenTheme;
  description?: string;
  /** Optional before/after pair — omit either or both when not available. */
  before?: HalloweenImage;
  after?: HalloweenImage;
  /** Additional photos of the finished look (process shots, different angles, etc.). */
  images: HalloweenImage[];
  /** Shown in the homepage teaser strip and given priority in the gallery grid. */
  featured?: boolean;
}

export const HALLOWEEN_THEME_LABELS: Record<HalloweenTheme, string> = {
  skulls: "Skulls",
  clowns: "Clowns",
  horror: "Horror",
  character: "Character Transformations",
  custom: "Custom Concepts",
};
