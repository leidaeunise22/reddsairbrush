import type { HalloweenProject } from "@/types/halloween";
import type { BookingFormConfig } from "@/types/booking";

import dod1 from "@/assets/images/halloween/DOD1.jpg";
import dod2 from "@/assets/images/halloween/DOD2.jpg";
import skull1 from "@/assets/images/halloween/skull1.jpg";
import skull2 from "@/assets/images/halloween/skull2.jpg";
import skull3 from "@/assets/images/halloween/skull3.jpg";
import skull4 from "@/assets/images/halloween/skull4.jpg";
import skull5 from "@/assets/images/halloween/skull5.jpg";
import skull6 from "@/assets/images/halloween/skull6.jpg";
import clown1 from "@/assets/images/halloween/clown1.jpg";
import nun1 from "@/assets/images/halloween/nun1.jpg";
import joker1 from "@/assets/images/halloween/joker1.jpg";
import avatar1 from "@/assets/images/halloween/avatar1.jpg";
import avatar2 from "@/assets/images/halloween/avatar2.jpg";
import pumpkin1 from "@/assets/images/halloween/pumpkin1.jpg";
import pumpkin2 from "@/assets/images/halloween/pumpkin2.jpg";
import body3 from "@/assets/images/halloween/body3.jpg";
import body4 from "@/assets/images/halloween/body4.jpg";

/**
 * Halloween face-painting projects — real client photography. Each is a
 * whole "look," not a single photo — supports multiple in-progress/detail
 * shots (`images`) and an optional before/after pair. Add/remove/reorder
 * here; HalloweenGallery.tsx and HalloweenFeature.tsx both read from this
 * array, no component changes needed. See src/assets/images/README.md.
 */
export const halloweenProjects: HalloweenProject[] = [
  {
    id: "dia-de-los-muertos-portrait",
    title: "Día de los Muertos Portrait",
    theme: "skulls",
    description: "Classic sugar skull design in profile, fine linework and red accent detailing.",
    images: [{ src: dod1, alt: "Profile view of a man with a black and white Día de los Muertos sugar skull face paint design" }],
    featured: true,
  },
  {
    id: "la-catrina",
    title: "La Catrina",
    theme: "skulls",
    description: "Full Día de los Muertos look with a floral crown and lace veil, red and blue accent work.",
    images: [{ src: dod2, alt: "Woman with a Día de los Muertos sugar skull face paint design, floral headpiece, and lace veil" }],
    featured: true,
  },
  {
    id: "classic-skeleton",
    title: "Classic Skeleton",
    theme: "skulls",
    images: [{ src: skull1, alt: "Man with a black and white classic skeleton face paint design" }],
  },
  {
    id: "skeleton-duo",
    title: "Skeleton Duo",
    theme: "skulls",
    description: "Matching skeleton looks for two, full coverage from hairline to neck.",
    images: [{ src: skull2, alt: "Two men with matching black and white skeleton face paint designs" }],
  },
  {
    id: "skeleton-closeup",
    title: "Skeleton Study",
    theme: "skulls",
    images: [{ src: skull3, alt: "Close-up portrait of a man with a skeleton face paint design" }],
  },
  {
    id: "full-head-skeleton",
    title: "Full Head Skeleton",
    theme: "skulls",
    description: "Full scalp-to-neck skeleton coverage with cracked-bone texture detailing.",
    images: [{ src: skull4, alt: "Man with a full head and neck skeleton face paint design" }],
  },
  {
    id: "skeleton-couple",
    title: "Skeleton Couple",
    theme: "skulls",
    images: [{ src: skull6, alt: "A couple with matching black and white skeleton face paint designs" }],
  },
  {
    id: "tribal-demon-mask",
    title: "Tribal Demon Mask",
    theme: "horror",
    description: "Full scalp coverage tribal-style demon mask with sweeping linework.",
    images: [{ src: skull5, alt: "Man with a full head tribal-style demon mask face paint design" }],
  },
  {
    id: "haunted-nun",
    title: "Haunted Nun",
    theme: "horror",
    description: "Horror-movie-inspired nun look — cracked, weeping skin texture under a habit and veil.",
    images: [{ src: nun1, alt: "Person in a nun's habit with a horror-style cracked skin face paint design" }],
    featured: true,
  },
  {
    id: "horror-clown",
    title: "Horror Clown",
    theme: "clowns",
    description: "Unsettling clown look with a red nose and lip accent against stark black and white paint.",
    images: [{ src: clown1, alt: "Woman with a black and white horror clown face paint design and red nose accent" }],
    featured: true,
  },
  {
    id: "damaged-joker",
    title: "Damaged",
    theme: "character",
    description: "Full character transformation with green hair, painted grin, and body-paint tattoo details.",
    images: [{ src: joker1, alt: "Man with a Joker-inspired character face and body paint transformation, green hair, painted grin on hand" }],
    featured: true,
  },
  {
    id: "navi-warrior-i",
    title: "Na'vi Warrior I",
    theme: "character",
    description: "Full-body blue character transformation with sculpted ear prosthetics and feather accents.",
    images: [{ src: avatar1, alt: "Full-body blue Na'vi-inspired character body paint transformation with ear prosthetics" }],
  },
  {
    id: "navi-warrior-ii",
    title: "Na'vi Warrior II",
    theme: "character",
    images: [{ src: avatar2, alt: "Full-body blue Na'vi-inspired character body paint transformation, side profile" }],
  },
  {
    id: "jack-o-lantern-i",
    title: "Jack-o'-Lantern I",
    theme: "custom",
    description: "Classic carved-pumpkin face extending down the neck, warm orange and black.",
    images: [{ src: pumpkin1, alt: "Woman with a jack-o'-lantern style face and neck paint design in orange and black" }],
  },
  {
    id: "jack-o-lantern-ii",
    title: "Jack-o'-Lantern II",
    theme: "custom",
    images: [{ src: pumpkin2, alt: "Man with a jack-o'-lantern style face paint design in orange and black" }],
  },
  {
    id: "white-tiger",
    title: "White Tiger",
    theme: "custom",
    description: "Full-body tiger stripe concept over a two-piece, orange and black on a pale base.",
    images: [{ src: body3, alt: "Full-body white tiger stripe body paint design" }],
  },
  {
    id: "magenta-spiral",
    title: "Magenta Spiral",
    theme: "custom",
    description: "Bold hand-painted spiral pattern in magenta and violet, full body coverage.",
    images: [{ src: body4, alt: "Full-body magenta and violet spiral body paint design" }],
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
