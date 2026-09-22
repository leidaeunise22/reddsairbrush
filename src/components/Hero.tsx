import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { TOTAL_HEADER_HEIGHT_PX } from "@/components/Navbar";
import heroLeft from "@/assets/images/tattoo/tattoo-archangel-psalms-sleeve.jpg";
import heroRight from "@/assets/images/tattoo/tattoo-rose-memorial-sleeve.jpg";

// Real extracted brand artwork — lives in public/ (not src/assets) so it's
// served as-is at a stable root-relative path. BASE_URL is prefixed so the
// path resolves correctly under Vite's configured `base` (see
// vite.config.ts) in dev, at the GitHub Pages project URL, and once a
// custom domain is added later.
const BRANDING_BASE = `${import.meta.env.BASE_URL}images/branding`;
const logoTattoo = `${BRANDING_BASE}/reddtatstoo.png`;
const logoAirbrush = `${BRANDING_BASE}/reddsairbrush.png`;
const logoStar = `${BRANDING_BASE}/star.png`;

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.14, delayChildren: prefersReducedMotion ? 0 : 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  // Each logo image animates independently (its own initial/animate/transition,
  // not a shared variant) so dimensions, positioning, and timing can be tuned
  // per-mark without affecting the others — a subtle fade + upward reveal only,
  // never letter-by-letter (these are opaque raster images, not text).
  const tattooLogoReveal = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] as const },
  };
  const airbrushLogoReveal = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: prefersReducedMotion ? 0 : 0.44, ease: [0.16, 1, 0.3, 1] as const },
  };
  // Star fades in with a slight rotation settle, timed between the two
  // wordmarks so the reveal reads left → center → right.
  const starReveal = {
    initial: { opacity: 0, rotate: prefersReducedMotion ? 0 : -12, scale: prefersReducedMotion ? 1 : 0.92 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 0.8, delay: prefersReducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-void"
    >
      {/* Side imagery, bleeding to the edges — desktop only; tablet/mobile get a clean centered hero */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[30%] lg:block xl:w-[28%]">
        <img
          src={heroLeft}
          alt=""
          role="presentation"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-void" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[30%] lg:block xl:w-[28%]">
        <img
          src={heroRight}
          alt=""
          role="presentation"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-void" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      </div>

      {/* Center darkness + grain + vignette so text stays legible */}
      <div className="pointer-events-none absolute inset-x-[18%] inset-y-0 hidden bg-gradient-to-b from-void/70 via-void/30 to-void/80 lg:block" />
      <div className="grain vignette pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-void/35 lg:bg-transparent" />

      {/* Center content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ paddingTop: TOTAL_HEADER_HEIGHT_PX }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:gap-8"
      >
        <div className="flex w-full max-w-[85%] flex-col items-center gap-1 sm:max-w-[80%] lg:max-w-[85%] lg:flex-row lg:justify-center lg:gap-3 xl:gap-5">
          <motion.h1 {...tattooLogoReveal} className="w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[380px] xl:max-w-[460px]">
            <img
              src={logoTattoo}
              alt={site.brandTattoo}
              className="h-auto w-full"
            />
          </motion.h1>
          <motion.img
            {...starReveal}
            src={logoStar}
            alt=""
            role="presentation"
            className="h-16 w-auto shrink-0 sm:h-20 lg:h-16 xl:h-20"
          />
          <motion.h1 {...airbrushLogoReveal} className="w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[380px] xl:max-w-[460px]">
            <img
              src={logoAirbrush}
              alt={site.brandAirbrush}
              className="h-auto w-full"
            />
          </motion.h1>
        </div>

        {site.supportingCopy.length === 2 ? (
          // Two-item case (the common "X × Y" tagline): mirrors the logo
          // row's own layout — same max-width, a fixed-width center glyph
          // flanked by two flex-1 sides — so the × lands on the exact same
          // horizontal center as the star between the brand logos above,
          // at every screen size (never drifts due to word-length or wraps
          // onto its own off-center line at in-between viewport widths).
          <motion.div
            variants={item}
            className="font-nav flex w-full max-w-[85%] items-center gap-3 text-xs uppercase tracking-[0.4em] text-bone sm:max-w-[80%] sm:gap-4 sm:text-sm lg:max-w-[85%]"
          >
            <span className="flex-1 text-right">{site.supportingCopy[0]}</span>
            <span className="shrink-0 text-ash">×</span>
            <span className="flex-1 text-left">{site.supportingCopy[1]}</span>
          </motion.div>
        ) : (
          <motion.p
            variants={item}
            className="font-nav flex flex-wrap items-center justify-center gap-x-3 text-xs uppercase tracking-[0.4em] text-bone sm:gap-x-4 sm:text-sm"
          >
            {site.supportingCopy.map((word, index) => (
              <span key={word} className="flex items-center gap-3 sm:gap-4">
                {index > 0 && <span className="text-ash">×</span>}
                {word}
              </span>
            ))}
          </motion.p>
        )}

        <motion.a
          variants={item}
          href="#book"
          className="group font-nav mt-2 inline-flex items-center gap-3 border border-paper/70 px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-paper transition-colors duration-300 hover:bg-paper hover:text-void sm:mt-4"
        >
          Book Now
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>
      </motion.div>

      <motion.a
        href="#portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-silver/70 transition-colors hover:text-paper"
        aria-label="Scroll to portfolio"
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
