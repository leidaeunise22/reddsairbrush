import type { BookingFormConfig } from "@/types/booking";

/**
 * The two inquiry paths. Add/remove/reorder fields here — BookingForm.tsx
 * renders whatever is in this array, no component changes required.
 */
export const bookingForms: BookingFormConfig[] = [
  {
    id: "tattoo",
    label: "Tattoo Inquiry",
    intro: "Tell us about the piece — placement, size, style, and any references you have.",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", placeholder: "Optional" },
      { name: "placement", label: "Placement", type: "text", required: true, placeholder: "e.g. Forearm, back, ribs" },
      { name: "size", label: "Approximate Size", type: "text", required: true, placeholder: 'e.g. 6" x 4", full sleeve' },
      { name: "style", label: "Style", type: "text", required: true, placeholder: "e.g. Black & grey realism, fine line" },
      {
        name: "references",
        label: "Reference Images",
        type: "file",
        helperText: "Photos, sketches, or inspiration — optional but helpful.",
      },
      {
        name: "description",
        label: "Project Description",
        type: "textarea",
        required: true,
        rows: 5,
        placeholder: "Walk us through the idea, meaning, and any must-haves.",
      },
    ],
  },
  {
    id: "airbrush",
    label: "Airbrush / Custom Work Inquiry",
    intro: "Shoes, helmets, vehicles, plates, or anything else that holds paint — tell us the surface and the vision.",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", placeholder: "Optional" },
      { name: "medium", label: "Medium / Surface", type: "text", required: true, placeholder: "e.g. Sneakers, motorcycle helmet, car hood" },
      { name: "dimensions", label: "Dimensions", type: "text", required: true, placeholder: "Approximate size of the surface" },
      {
        name: "concept",
        label: "Concept",
        type: "textarea",
        required: true,
        rows: 5,
        placeholder: "Describe the design, mood, and any must-haves.",
      },
      { name: "deadline", label: "Deadline", type: "date", placeholder: "Optional" },
      {
        name: "references",
        label: "Reference Images",
        type: "file",
        helperText: "Photos, sketches, or inspiration — optional but helpful.",
      },
    ],
  },
];
