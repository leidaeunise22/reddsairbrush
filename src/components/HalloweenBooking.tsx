import { motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { seasonal } from "@/data/seasonal";
import { halloweenBookingForm } from "@/data/halloween";
import { booking } from "@/data/site";
import { BookingForm } from "@/components/BookingForm";

/**
 * Dedicated Halloween Face Painting booking section — deliberately separate
 * from the general Booking section (Tattoo/Airbrush), reflecting that
 * Halloween is a major seasonal opportunity, not just another inquiry type.
 *
 * `seasonal.booking.ctaEnabled` gates whether the live form renders. When
 * false, this section shows an honest "not open yet" notice with a
 * low-friction way to register interest (mailto) — it never presents a form
 * that implies a booking is being accepted when it isn't.
 */
export function HalloweenBooking() {
  const { booking: bookingConfig } = seasonal;

  return (
    <section id="halloween-book" className="relative bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Halloween</p>
          <h2 className="font-halloween mt-2 text-4xl text-paper sm:text-5xl">Book Your Look</h2>
          <p className="font-nav mx-auto mt-4 max-w-xl text-xs uppercase tracking-[0.18em] text-silver">
            {bookingConfig.ctaEnabled ? halloweenBookingForm.intro : bookingConfig.notOpenMessage}
          </p>
        </motion.div>

        {bookingConfig.deposit.enabled && (
          <div className="mb-8 border border-iron bg-graphite/50 px-5 py-4 text-center">
            <p className="font-nav text-[11px] uppercase tracking-[0.2em] text-bone">
              Deposit required to confirm: <span className="text-paper">{bookingConfig.deposit.amount}</span>
            </p>
            <p className="font-nav mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ash">{bookingConfig.deposit.note}</p>
          </div>
        )}

        {bookingConfig.externalBookingUrl && (
          <a
            href={bookingConfig.externalBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group font-nav mb-8 flex items-center justify-center gap-3 border border-paper bg-paper px-8 py-4 text-xs uppercase tracking-[0.3em] text-void transition-colors duration-300 hover:bg-bone"
          >
            {bookingConfig.externalBookingLabel}
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}

        {bookingConfig.ctaEnabled ? (
          <BookingForm config={halloweenBookingForm} endpoint={booking.halloweenFormEndpoint} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 border border-iron px-6 py-14 text-center"
          >
            <p className="font-serif text-xl italic text-paper">{bookingConfig.notOpenHeadline}</p>
            <p className="font-nav max-w-sm text-xs uppercase tracking-[0.18em] text-silver">
              {bookingConfig.notOpenMessage}
            </p>
            <a
              href={`mailto:${booking.contactEmail}?subject=${encodeURIComponent("Halloween booking — notify me")}`}
              className="group font-nav mt-2 inline-flex items-center gap-3 border border-paper/70 px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-paper transition-colors duration-300 hover:bg-paper hover:text-void"
            >
              <Mail size={14} />
              Get Notified
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
