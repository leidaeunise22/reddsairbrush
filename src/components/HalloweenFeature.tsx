import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { seasonal } from "@/data/seasonal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import sideLeft from "@/assets/images/halloween/body1.jpg";
import sideRight from "@/assets/images/halloween/body2.jpg";

/**
 * Full-width homepage promo for Halloween face painting. Rendered by
 * Portfolio.tsx, positioned between the category tiles and Featured Work.
 * Controlled entirely by seasonal.homepageFeature.enabled — returns null
 * when off, so the section simply doesn't exist rather than showing stale
 * or disabled-looking content.
 */
export function HalloweenFeature() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { homepageFeature } = seasonal;
  if (!homepageFeature.enabled) return null;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section aria-labelledby="halloween-feature-heading" className="relative my-16 overflow-hidden sm:my-20">
      {/* Cinematic image reveal — scale settles in from a slight zoom */}
      <motion.div
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {/* Real body-art photos fill the space beside the centered feature
            photo — no blur, no dead space, matching the same side-imagery
            treatment the main Hero uses. Each fades into the void toward
            the center so the seam against the contained photo is soft. */}
        <div className="absolute inset-y-0 left-0 hidden w-[34%] sm:block md:w-[30%]">
          <img
            src={sideLeft}
            alt=""
            role="presentation"
            loading="lazy"
            className="h-full w-full object-cover object-top grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-void" />
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[34%] sm:block md:w-[30%]">
          <img
            src={sideRight}
            alt=""
            role="presentation"
            loading="lazy"
            className="h-full w-full object-cover object-top grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-void" />
        </div>

        {/* The actual featured photo, shown whole — object-contain, never cropped. */}
        <img
          src={homepageFeature.backgroundImage}
          alt={homepageFeature.backgroundAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain grayscale contrast-110"
        />
      </motion.div>

      {/* Legibility gradient + grain, matching the rest of the site's texture language */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/30" />
      <div className="grain pointer-events-none absolute inset-0 opacity-70" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative flex min-h-[520px] flex-col items-start justify-end gap-5 px-6 py-16 sm:min-h-[560px] sm:px-10 sm:py-20 lg:px-16"
      >
        <motion.p variants={item} className="font-nav text-[11px] uppercase tracking-[0.35em] text-silver">
          {homepageFeature.eyebrow}
        </motion.p>
        <motion.h2
          variants={item}
          id="halloween-feature-heading"
          className="font-halloween max-w-2xl text-4xl leading-[1.05] text-paper sm:text-5xl lg:text-6xl"
        >
          {homepageFeature.headline}
        </motion.h2>
        <motion.p
          variants={item}
          className="font-nav max-w-lg text-xs uppercase tracking-[0.25em] text-bone sm:text-sm"
        >
          {homepageFeature.subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            href={homepageFeature.primaryButtonHref}
            className="group font-nav inline-flex items-center justify-center gap-3 bg-paper px-8 py-4 text-xs uppercase tracking-[0.3em] text-void transition-colors duration-300 hover:bg-bone sm:py-3.5"
          >
            {homepageFeature.primaryButtonLabel}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={homepageFeature.secondaryButtonHref}
            className="font-nav inline-flex items-center justify-center gap-3 border border-paper/70 px-8 py-4 text-xs uppercase tracking-[0.3em] text-paper transition-colors duration-300 hover:bg-paper/10 sm:py-3.5"
          >
            {homepageFeature.secondaryButtonLabel}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
