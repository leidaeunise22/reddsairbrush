/**
 * Centralized seasonal (Halloween) configuration.
 *
 * Three independent on/off switches control every seasonal *promotion* on
 * the site — the announcement bar, the homepage feature section, and
 * whether the Halloween booking form is actually live. Flip these when the
 * season starts/ends; no other code changes needed.
 *
 * IMPORTANT: `booking.ctaEnabled` gates whether the real booking form
 * renders. When it's false, the booking section shows an honest "not open
 * yet" notice instead — never a form that pretends to accept a booking
 * that isn't actually being taken. See HalloweenBooking.tsx.
 *
 * The Halloween gallery itself (HalloweenGallery.tsx) is NOT gated by any
 * of these flags — it stays browsable year-round, per the brief.
 */

import halloweenFeatureBg from "@/assets/images/halloween/group-body-art.jpg";

export interface SeasonalConfig {
  announcementBar: {
    enabled: boolean;
    text: string;
    /** Where the bar (and its "Reserve" link) points. */
    href: string;
  };
  homepageFeature: {
    enabled: boolean;
    eyebrow: string;
    headline: string;
    subtitle: string;
    primaryButtonLabel: string;
    /** Where the primary button goes — the Halloween booking section. */
    primaryButtonHref: string;
    secondaryButtonLabel: string;
    /** Where the secondary button goes — the Halloween gallery. */
    secondaryButtonHref: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  booking: {
    /**
     * When false, the Halloween booking section shows a clearly-labeled
     * "not open yet" notice with a way to express interest — it never
     * shows a live form that would imply a booking is being accepted.
     */
    ctaEnabled: boolean;
    notOpenHeadline: string;
    notOpenMessage: string;
    /**
     * Optional external booking/payment service (Square, Calendly, etc.).
     * When set, a prominent link to it is shown alongside the in-page
     * inquiry form. Leave undefined until a real service is connected.
     */
    externalBookingUrl?: string;
    externalBookingLabel: string;
    deposit: {
      enabled: boolean;
      amount: string;
      note: string;
    };
  };
}

export const seasonal: SeasonalConfig = {
  announcementBar: {
    // Flip to true only once Halloween bookings are genuinely being taken.
    enabled: false,
    text: "Halloween Bookings — Reserve Your Look.",
    href: "#halloween-book",
  },
  homepageFeature: {
    // The homepage teaser can stay on as an evergreen service highlight —
    // it doesn't claim bookings are open, `booking.ctaEnabled` does that.
    enabled: true,
    eyebrow: "Seasonal",
    headline: "Become the Art",
    subtitle: "Halloween Face Painting & Custom Transformations",
    primaryButtonLabel: "Book Your Look",
    primaryButtonHref: "#halloween-book",
    secondaryButtonLabel: "View Halloween Work",
    secondaryButtonHref: "#halloween-work",
    backgroundImage: halloweenFeatureBg,
    backgroundAlt: "Three clients showcasing full-body paint designs by the artist",
  },
  booking: {
    ctaEnabled: false,
    notOpenHeadline: "Halloween Booking Opens Soon",
    notOpenMessage:
      "The Halloween calendar isn't open yet. Leave your details below and we'll reach out the moment booking goes live.",
    externalBookingUrl: undefined,
    externalBookingLabel: "Book via Our Scheduling Service",
    deposit: {
      enabled: true,
      amount: "$50",
      note: "A non-refundable deposit secures your Halloween booking slot once booking opens. Deposits are arranged directly with the artist — this site does not collect payment online.",
    },
  },
};
