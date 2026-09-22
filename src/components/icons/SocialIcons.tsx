import type { SVGProps } from "react";

/**
 * Lucide's brand icon set no longer ships Instagram/TikTok glyphs, so these
 * two are hand-drawn to match lucide's 24x24 / stroke-based visual style
 * (round joins, 2px stroke, currentColor) for a consistent icon language.
 *
 * `size` mirrors lucide-react's own icon API (sets both width/height) since
 * these are used interchangeably with lucide icons throughout the site.
 */
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function InstagramIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 3v10.5a3.3 3.3 0 1 1-2.6-3.23" />
      <path d="M15 3c.4 2.4 2.1 4.1 4.5 4.4" />
    </svg>
  );
}
