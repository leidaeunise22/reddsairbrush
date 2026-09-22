import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { artwork } from "@/data/artwork";
import { categories } from "@/data/categories";
import type { Artwork, CategoryId } from "@/types/artwork";

interface FeaturedWorkProps {
  activeCategory: CategoryId | null;
  onClearCategory: () => void;
  onOpenArtwork: (items: Artwork[], index: number) => void;
}

export function FeaturedWork({ activeCategory, onClearCategory, onOpenArtwork }: FeaturedWorkProps) {
  const [showAll, setShowAll] = useState(false);

  const items = useMemo(() => {
    if (activeCategory) return artwork.filter((piece) => piece.category === activeCategory);
    if (showAll) return artwork;
    return artwork.filter((piece) => piece.featured);
  }, [activeCategory, showAll]);

  const heading = activeCategory
    ? categories.find((category) => category.id === activeCategory)?.label ?? "Work"
    : showAll
      ? "All Work"
      : "Featured Work";

  const handleViewAll = () => {
    onClearCategory();
    setShowAll(true);
  };

  const isFilteredView = Boolean(activeCategory) || showAll;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 border-b border-iron pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="flex items-baseline gap-4">
          <h2 className="font-gothic text-4xl text-paper sm:text-5xl">{heading}</h2>
          {isFilteredView && (
            <button
              type="button"
              onClick={() => {
                onClearCategory();
                setShowAll(false);
              }}
              className="font-nav text-[11px] uppercase tracking-[0.2em] text-ash underline decoration-iron underline-offset-4 transition-colors hover:text-paper"
            >
              Back to Featured
            </button>
          )}
        </div>
        <div className="flex items-center justify-between gap-6 sm:justify-end">
          {/* <p className="font-serif hidden text-sm italic tracking-wide text-silver sm:block">
            Different mediums. Same passion.
          </p> */}
          {!isFilteredView && (
            <button
              type="button"
              onClick={handleViewAll}
              className="group font-nav inline-flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:text-paper"
            >
              View All
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>

      <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-4">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((piece, index) => (
            <motion.button
              key={piece.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onOpenArtwork(items, index)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-iron bg-charcoal text-left"
              aria-label={`Open ${piece.title} in lightbox`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={piece.image}
                  alt={piece.alt}
                  loading="lazy"
                  className="h-auto w-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-void/0 to-void/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-serif text-lg italic text-paper">{piece.title}</p>
                  {piece.medium && (
                    <p className="font-nav mt-0.5 text-[10px] uppercase tracking-[0.16em] text-silver">
                      {piece.medium}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
