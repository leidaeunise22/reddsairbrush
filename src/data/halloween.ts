import type { HalloweenProject } from "@/types/halloween";
import type { BookingFormConfig } from "@/types/booking";

import sugarSkullBefore from "@/assets/images/placeholders/halloween-sugar-skull-before.svg";
import sugarSkullAfter from "@/assets/images/placeholders/halloween-sugar-skull-after.svg";
import sugarSkullDetail from "@/assets/images/placeholders/halloween-sugar-skull-detail.svg";

import horrorClown1 from "@/assets/images/placeholders/halloween-horror-clown-1.svg";
import horrorClown2 from "@/assets/images/placeholders/halloween-horror-clown-2.svg";

import zombieBefore from "@/assets/images/placeholders/halloween-zombie-before.svg";
import zombieAfter from "@/assets/images/placeholders/halloween-zombie-after.svg";

import fantasyCharacter1 from "@/assets/images/placeholders/halloween-fantasy-character-1.svg";
import fantasyCharacter2 from "@/assets/images/placeholders/halloween-fantasy-character-2.svg";
import fantasyCharacter3 from "@/assets/images/placeholders/halloween-fantasy-character-3.svg";

import porcelainDollBefore from "@/assets/images/placeholders/halloween-porcelain-doll-before.svg";
import porcelainDollAfter from "@/assets/images/placeholders/halloween-porcelain-doll-after.svg";

import skeletalKing1 from "@/assets/images/placeholders/halloween-skeletal-king-1.svg";
import skeletalKing2 from "@/assets/images/placeholders/halloween-skeletal-king-2.svg";

/**
 * Halloween face-painting projects. Each is a whole "look," not a single
 * photo — supports multiple in-progress/detail shots (`images`) and an
 * optional before/after pair. Add/remove/reorder here; HalloweenGallery.tsx
 * and HalloweenFeature.tsx both read from this array, no component changes
 * needed. See src/assets/images/README.md for swapping placeholders for
 * real client photos (with the client's permission to publish).
 */
export const halloweenProjects: HalloweenProject[] = [
  {
    id: "sugar-skull-portrait",
    title: "Sugar Skull Portrait",
    theme: "skulls",
    description: "Full-face sugar skull design, fine linework and dimensional shading.",
    before: { src: sugarSkullBefore, alt: "Placeholder photo of a client's bare face before sugar skull face painting" },
    after: { src: sugarSkullAfter, alt: "Placeholder artwork representing a finished sugar skull face painting look" },
    images: [
      { src: sugarSkullDetail, alt: "Placeholder detail shot of sugar skull face painting linework" },
    ],
    featured: true,
  },
  {
    id: "horror-clown",
    title: "Classic Horror Clown",
    theme: "clowns",
    description: "Weathered, unsettling clown look — cracked paint texture and deep shadow work.",
    images: [
      { src: horrorClown1, alt: "Placeholder artwork representing a horror clown face painting look, front view" },
      { src: horrorClown2, alt: "Placeholder artwork representing a horror clown face painting look, side detail" },
    ],
    featured: true,
  },
  {
    id: "zombie-transformation",
    title: "Zombie Transformation",
    theme: "horror",
    description: "Full zombie transformation — torn skin texture, sunken eyes, exposed bone detailing.",
    before: { src: zombieBefore, alt: "Placeholder photo of a client's bare face before zombie face painting" },
    after: { src: zombieAfter, alt: "Placeholder artwork representing a finished zombie transformation face painting look" },
    images: [],
  },
  {
    id: "dark-fantasy-character",
    title: "Dark Fantasy Character",
    theme: "character",
    description: "Original character transformation blending face paint with sculptural prosthetic accents.",
    images: [
      { src: fantasyCharacter1, alt: "Placeholder artwork representing a dark fantasy character face painting look, look 1" },
      { src: fantasyCharacter2, alt: "Placeholder detail shot of dark fantasy character face painting" },
      { src: fantasyCharacter3, alt: "Placeholder artwork representing a dark fantasy character face painting look, look 3" },
    ],
    featured: true,
  },
  {
    id: "cracked-porcelain-doll",
    title: "Cracked Porcelain Doll",
    theme: "custom",
    description: "Custom porcelain-doll concept — cracked glaze texture with hand-painted rosy accents.",
    before: { src: porcelainDollBefore, alt: "Placeholder photo of a client's bare face before porcelain doll face painting" },
    after: { src: porcelainDollAfter, alt: "Placeholder artwork representing a finished cracked porcelain doll face painting look" },
    images: [],
  },
  {
    id: "skeletal-king",
    title: "Skeletal King",
    theme: "skulls",
    description: "Regal skeletal king concept with an ornamental crown motif painted directly onto the skin.",
    images: [
      { src: skeletalKing1, alt: "Placeholder artwork representing a skeletal king face painting look, front view" },
      { src: skeletalKing2, alt: "Placeholder detail shot of skeletal king crown facepainting motif" },
    ],
  },
];

/**
 * Halloween Face Painting booking form fields. Rendered by the same
 * generic BookingForm component used for the Tattoo/Airbrush paths — see
 * src/components/HalloweenBooking.tsx.
 */
export const halloweenBookingForm: BookingFormConfig = {
  id: "halloween",
  label: "Halloween Face Painting",
  intro: "Tell us about the look, the date, and how many people need painting.",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", placeholder: "Optional" },
    { name: "date", label: "Requested Date", type: "date", required: true },
    { name: "time", label: "Requested Time", type: "time", required: true },
    { name: "partySize", label: "Number of People", type: "number", required: true, placeholder: "1" },
    {
      name: "design",
      label: "Desired Design / Character",
      type: "text",
      required: true,
      placeholder: "e.g. Sugar skull, horror clown, custom character",
    },
    {
      name: "location",
      label: "Event Location",
      type: "text",
      placeholder: "Optional — for group/event bookings",
    },
    {
      name: "references",
      label: "Reference Images",
      type: "file",
      helperText: "Photos or inspiration for the look — optional but helpful.",
    },
    {
      name: "details",
      label: "Additional Details",
      type: "textarea",
      rows: 4,
      placeholder: "Anything else we should know — allergies, sensitive skin, event details, etc.",
    },
  ],
};
