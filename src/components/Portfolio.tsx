import { useState } from "react";
import { motion } from "motion/react";
import { CategoryGallery } from "@/components/CategoryGallery";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ArtworkLightbox } from "@/components/ArtworkLightbox";
import { HalloweenFeature } from "@/components/HalloweenFeature";
import type { Artwork, CategoryId } from "@/types/artwork";

interface PortfolioProps {
  activeCategory: CategoryId | null;
  onSelectCategory: (category: CategoryId | null) => void;
}

export function Portfolio({ activeCategory, onSelectCategory }: PortfolioProps) {
  const [lightbox, setLightbox] = useState<{ items: Artwork[]; index: number } | null>(null);

  return (
    <section id="portfolio" className="relative bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14"
        >
          <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Portfolio</p>
          <h2 className="font-gothic mt-1 text-4xl text-paper sm:text-5xl">Every Surface, One Vision</h2>
        </motion.div>

        <CategoryGallery activeCategory={activeCategory} onSelect={onSelectCategory} />
      </div>

      {/* Full-width, breaks out of the padded container above/below. Renders
          nothing when seasonal.homepageFeature is disabled — the mt-16/20
          below still guarantees spacing before Featured Work either way. */}
      <HalloweenFeature />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mt-16 sm:mt-20">
          <FeaturedWork
            activeCategory={activeCategory}
            onClearCategory={() => onSelectCategory(null)}
            onOpenArtwork={(items, index) => setLightbox({ items, index })}
          />
        </div>
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
