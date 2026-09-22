import { motion } from "motion/react";
import { site } from "@/data/site";
import portraitImage from "@/assets/images/tattoo/tattooshop.jpg";

// const disciplines = [
//   {
//     name: "Tattoo",
//     detail: "Black & grey realism, fine line, and custom large-scale pieces — skin as a permanent canvas.",
//   },
//   {
//     name: "Airbrush",
//     detail: "Shoes, helmets, vehicles, license plates, and anything else that'll hold a coat of paint.",
//   },
// ];

export function About() {
  return (
    <section id="about" className="relative bg-charcoal py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm overflow-hidden border border-iron lg:max-w-none"
        >
          <img
            src={portraitImage}
            alt="The artist at work in his tattoo studio, surrounded by framed flash art"
            loading="lazy"
            className="h-full w-full object-cover contrast-105"
          />
          <div className="grain pointer-events-none absolute inset-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">About</p>
          <h2 className="font-gothic mt-2 text-4xl leading-[1.05] text-paper sm:text-5xl">
            One Artist. <span className="font-script text-[0.7em] text-silver">Two Disciplines.</span>
          </h2>

          <div className="font-serif mt-6 space-y-4 text-lg leading-relaxed text-silver sm:text-xl">
            <p>
              {site.brandTattoo} and {site.brandAirbrush} are the same hand working two different
              mediums — needle and skin on one side, spray gun and any surface willing to hold
              paint on the other. The vision doesn't change with the canvas.
            </p>
            <p>
              Based in {site.location}, every piece — tattoo, sneaker, helmet, plate, or
              custom panel — starts the same way: a conversation about what it should say, and
              a commitment to make it last.
            </p>
          </div>

          {/* <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {disciplines.map((discipline) => (
              <li key={discipline.name} className="border border-iron p-5">
                <p className="font-nav text-xs uppercase tracking-[0.25em] text-paper">{discipline.name}</p>
                <p className="font-serif mt-2 text-sm leading-relaxed text-silver">{discipline.detail}</p>
              </li>
            ))}
          </ul> */}
        </motion.div>
      </div>
    </section>
  );
}
