import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { halloweenProjects } from "@/data/halloween";
import { HALLOWEEN_THEME_LABELS } from "@/types/halloween";
import type { HalloweenProject, HalloweenTheme } from "@/types/halloween";
import type { Artwork } from "@/types/artwork";
import { ArtworkLightbox } from "@/components/ArtworkLightbox";

const THEME_ORDER: HalloweenTheme[] = ["skulls", "clowns", "horror", "character", "custom"];

/** Flattens one project's before/after + gallery images into lightbox items, in view order. */
function projectToLightboxItems(project: HalloweenProject): Artwork[] {
  const items: Artwork[] = [];
  if (project.before) {
    items.push({
      id: `${project.id}-before`,
      title: `${project.title} — Before`,
      category: "halloween",
      image: project.before.src,
      alt: project.before.alt,
      aspect: "portrait",
      medium: "Halloween face painting",
    });
  }
  if (project.after) {
    items.push({
      id: `${project.id}-after`,
      title: `${project.title} — After`,
      category: "halloween",
      image: project.after.src,
      alt: project.after.alt,
      aspect: "portrait",
      description: project.description,
      medium: "Halloween face painting",
    });
  }
  project.images.forEach((image, index) => {
    items.push({
      id: `${project.id}-${index}`,
      title: project.images.length > 1 ? `${project.title} — Look ${index + 1}` : project.title,
      category: "halloween",
      image: image.src,
      alt: image.alt,
      aspect: "portrait",
      description: index === 0 && !project.after ? project.description : undefined,
      medium: "Halloween face painting",
    });
  });
  return items;
}

function projectCover(project: HalloweenProject) {
  return project.after ?? project.images[0] ?? project.before!;
}

export function HalloweenGallery() {
  const [activeTheme, setActiveTheme] = useState<HalloweenTheme | null>(null);
  const [lightbox, setLightbox] = useState<{ items: Artwork[]; index: number } | null>(null);

  const visibleProjects = useMemo(
    () => (activeTheme ? halloweenProjects.filter((p) => p.theme === activeTheme) : halloweenProjects),
    [activeTheme],
  );

  return (
    <section id="halloween-work" className="relative bg-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14"
        >
          <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Halloween</p>
          <h2 className="font-halloween mt-1 text-4xl text-paper sm:text-5xl">Halloween Face Painting</h2>
          <p className="font-nav mt-3 max-w-xl text-xs uppercase tracking-[0.18em] text-silver">
            Skulls, clowns, horror looks, character transformations, and custom concepts — browsable year-round.
          </p>
        </motion.div>

        {/* Theme filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTheme(null)}
            aria-pressed={activeTheme === null}
            className={`font-nav border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              activeTheme === null ? "border-paper bg-paper text-void" : "border-iron text-bone hover:border-slate"
            }`}
          >
            All
          </button>
          {THEME_ORDER.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setActiveTheme((current) => (current === theme ? null : theme))}
              aria-pressed={activeTheme === theme}
              className={`font-nav border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                activeTheme === theme ? "border-paper bg-paper text-void" : "border-iron text-bone hover:border-slate"
              }`}
            >
              {HALLOWEEN_THEME_LABELS[theme]}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleProjects.map((project) => {
              const cover = projectCover(project);
              const items = projectToLightboxItems(project);
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightbox({ items, index: 0 })}
                  className="group relative block aspect-[3/4] overflow-hidden border border-iron bg-void text-left"
                  aria-label={`View ${project.title} — ${items.length} photo${items.length === 1 ? "" : "s"}`}
                >
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-95 grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <p className="font-serif text-base italic text-paper sm:text-lg">{project.title}</p>
                    <p className="font-nav mt-0.5 text-[10px] uppercase tracking-[0.16em] text-silver">
                      {HALLOWEEN_THEME_LABELS[project.theme]}
                      {project.before && project.after ? " · Before & After" : items.length > 1 ? ` · ${items.length} Photos` : ""}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ArtworkLightbox
        items={lightbox?.items ?? []}
        activeIndex={lightbox?.index ?? null}
        onClose={() => setLightbox(null)}
        onNavigate={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
      />
    </section>
  );
}
