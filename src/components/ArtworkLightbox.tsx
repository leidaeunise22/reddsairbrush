import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { categories } from "@/data/categories";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ArtworkLightboxProps {
  items: Artwork[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ArtworkLightbox({ items, activeIndex, onClose, onNavigate }: ArtworkLightboxProps) {
  const isOpen = activeIndex !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (event.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (activeIndex === null) return null;
  const piece = items[activeIndex];
  // "halloween" has no tile in the main CategoryGallery (it's its own dedicated
  // gallery — see HalloweenGallery.tsx) so it won't be found in `categories`.
  const categoryLabel =
    categories.find((category) => category.id === piece.category)?.label ??
    (piece.category === "halloween" ? "Halloween" : undefined);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${piece.title} — image viewer`}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[100] flex flex-col bg-void/97 backdrop-blur-md"
        >
          <div className="grain pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="font-nav text-[11px] uppercase tracking-[0.25em] text-ash">
              {activeIndex + 1} / {items.length}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="text-paper/80 transition-colors hover:text-paper"
            >
              <X size={26} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onNavigate((activeIndex - 1 + items.length) % items.length)}
                aria-label="Previous image"
                className="absolute left-2 z-10 rounded-full p-2 text-paper/70 transition-colors hover:text-paper sm:left-6"
              >
                <ChevronLeft size={32} strokeWidth={1.4} />
              </button>
            )}

            <div className="flex max-h-full max-w-full flex-col items-center gap-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={piece.id}
                  src={piece.image}
                  alt={piece.alt}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-h-[62dvh] max-w-full object-contain sm:max-h-[68dvh]"
                />
              </AnimatePresence>

              <motion.div
                key={`${piece.id}-caption`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="max-w-xl text-center"
              >
                <p className="font-nav text-[10px] uppercase tracking-[0.28em] text-ash">{categoryLabel}</p>
                <h3 className="font-serif mt-1 text-2xl italic text-paper sm:text-3xl">{piece.title}</h3>
                {piece.description && (
                  <p className="font-serif mt-2 text-sm text-silver sm:text-base">{piece.description}</p>
                )}
                {piece.medium && (
                  <p className="font-nav mt-2 text-[10px] uppercase tracking-[0.2em] text-ash">{piece.medium}</p>
                )}
              </motion.div>
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onNavigate((activeIndex + 1) % items.length)}
                aria-label="Next image"
                className="absolute right-2 z-10 rounded-full p-2 text-paper/70 transition-colors hover:text-paper sm:right-6"
              >
                <ChevronRight size={32} strokeWidth={1.4} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
