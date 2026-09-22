import { motion } from "motion/react";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/types/artwork";

interface CategoryGalleryProps {
  activeCategory: CategoryId | null;
  onSelect: (category: CategoryId | null) => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const tileVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export function CategoryGallery({ activeCategory, onSelect }: CategoryGalleryProps) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-7"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <motion.li key={category.id} variants={tileVariant}>
            <button
              type="button"
              onClick={() => onSelect(isActive ? null : category.id)}
              aria-pressed={isActive}
              className={`group relative block w-full overflow-hidden border transition-colors duration-300 ${
                isActive ? "border-paper" : "border-iron hover:border-slate"
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-charcoal">
                <img
                  src={category.image}
                  alt=""
                  role="presentation"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
              </div>
              <div
                className={`font-nav flex items-center justify-center px-2 py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:text-xs ${
                  isActive ? "bg-paper text-void" : "bg-charcoal text-bone group-hover:text-paper"
                }`}
              >
                {category.label}
              </div>
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
