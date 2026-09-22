import type { Category } from "@/types/artwork";

import tileTattoos from "@/assets/images/tattoo/tattoo-sacred-heart-forearm.jpg";
import tileAirbrush from "@/assets/images/placeholders/tile-airbrush.svg";
import tileShoes from "@/assets/images/placeholders/tile-shoes.svg";
import tileLicensePlates from "@/assets/images/placeholders/tile-license-plates.svg";
import tileHelmets from "@/assets/images/placeholders/tile-helmets.svg";
import tilePortraits from "@/assets/images/placeholders/tile-portraits.svg";
import tileCustomItems from "@/assets/images/placeholders/tile-custom-items.svg";

/**
 * The 7 portfolio category tiles. Reorder this array to reorder the tiles;
 * add/remove entries to add/remove tiles. See src/types/artwork.ts for the
 * shape and src/assets/images/README.md for swapping in real photos.
 */
export const categories: Category[] = [
  { id: "tattoos", label: "Tattoos", tagline: "Skin as canvas", image: tileTattoos },
  { id: "airbrush", label: "Airbrush", tagline: "Any surface, one vision", image: tileAirbrush },
  { id: "shoes", label: "Shoes", tagline: "Custom sneaker art", image: tileShoes },
  { id: "license-plates", label: "License Plates", tagline: "Metal, reimagined", image: tileLicensePlates },
  { id: "helmets", label: "Helmets", tagline: "Gear worth staring at", image: tileHelmets },
  { id: "portraits", label: "Portraits", tagline: "Realism, rendered", image: tilePortraits },
  { id: "custom-items", label: "Custom Items", tagline: "If it holds paint, it's fair game", image: tileCustomItems },
];
