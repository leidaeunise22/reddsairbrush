/**
 * Site-wide configuration: navigation, socials, contact & booking
 * destinations. Edit this file to rebrand copy or repoint contact info —
 * no component changes required.
 */

export const site = {
  brandTattoo: "Reddtatstoo",
  brandAirbrush: "Reddsairbrush",
  location: "El Paso, TX",
  // tagline: "Art Beyond Surfaces",
  quote: "Art is the most intense mode of individualism that the world has known.",
  supportingCopy: ["TATTOOS", "AIRBRUSH ART"],
  // subline: "Custom art. Real expression.",

  // edgeCopyLeft: ["Skin", "Canvas", "Clothes", "Vehicles", "and more"],
  // edgeCopyRight: ["Same", "Vision", "Different", "Surfaces"],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tattoos", href: "#portfolio", category: "tattoos" as const },
  { label: "Airbrush", href: "#portfolio", category: "airbrush" as const },
  { label: "Halloween", href: "#halloween-work" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/reddsairbrush/", icon: "instagram" as const },
  // { label: "TikTok", href: "https://tiktok.com/", icon: "tiktok" as const },
  { label: "Email", href: "mailto:hello@reddtattoo.com", icon: "mail" as const },
];

/**
 * Booking / inquiry form destinations.
 *
 * This site ships with a WORKING fallback (a pre-filled `mailto:` link —
 * no external service or credentials required) so inquiries always reach
 * the artist. To upgrade to a real in-page submission with a success/error
 * state instead of opening the visitor's email client, connect a static-
 * form service (Formspree, Getform, Basin, etc.) and set the endpoint via
 * environment variables:
 *
 *   VITE_TATTOO_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
 *   VITE_AIRBRUSH_FORM_ENDPOINT=https://formspree.io/f/yyyyyyy
 *
 * (create a `.env.local` file, see `.env.example`). When an endpoint is
 * configured, the Booking form POSTs to it directly and shows a real
 * success/error state. When it's not configured, the form falls back to
 * the mailto link automatically — it never fakes a successful submission.
 */
export const booking = {
  contactEmail: "hello@reddtattoo.com",
  tattooFormEndpoint: import.meta.env.VITE_TATTOO_FORM_ENDPOINT as string | undefined,
  airbrushFormEndpoint: import.meta.env.VITE_AIRBRUSH_FORM_ENDPOINT as string | undefined,
  halloweenFormEndpoint: import.meta.env.VITE_HALLOWEEN_FORM_ENDPOINT as string | undefined,
};
