import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface StarDividerProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * The four-point sparkle glyph used between the two wordmarks, in the nav,
 * and in the footer lockup.
 */
export function StarDivider({ size = 24, className = "", animated = false }: StarDividerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      animate={shouldAnimate ? { opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] } : undefined}
      transition={shouldAnimate ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <path
        d="M32 4 L36.5 28 L60 32 L36.5 36 L32 60 L27.5 36 L4 32 L27.5 28 Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}
