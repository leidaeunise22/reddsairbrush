import { useState } from "react";
import { motion } from "motion/react";
import { bookingForms } from "@/data/bookingForms";
import { booking } from "@/data/site";
import { BookingForm } from "@/components/BookingForm";

export function Booking() {
  const [activeId, setActiveId] = useState(bookingForms[0].id);
  const activeConfig = bookingForms.find((form) => form.id === activeId) ?? bookingForms[0];
  const endpoint = activeId === "tattoo" ? booking.tattooFormEndpoint : booking.airbrushFormEndpoint;

  return (
    <section id="book" className="relative bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Book</p>
          <h2 className="font-gothic mt-2 text-4xl text-paper sm:text-5xl">Start Your Piece</h2>
          <p className="font-serif mx-auto mt-4 max-w-xl text-lg italic text-silver">{activeConfig.intro}</p>
        </motion.div>

        <div role="tablist" aria-label="Inquiry type" className="mb-10 flex justify-center border-b border-iron">
          {bookingForms.map((form) => (
            <button
              key={form.id}
              role="tab"
              type="button"
              aria-selected={activeId === form.id}
              onClick={() => setActiveId(form.id)}
              className="font-nav relative px-4 py-3 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:text-paper sm:px-6 sm:text-sm"
            >
              {form.label}
              {activeId === form.id && (
                <motion.span
                  layoutId="booking-tab-underline"
                  className="absolute inset-x-2 -bottom-px h-px bg-paper"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <BookingForm config={activeConfig} endpoint={endpoint} />
        </motion.div>
      </div>
    </section>
  );
}
