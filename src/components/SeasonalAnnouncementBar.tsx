import { Sparkle } from "lucide-react";
import { seasonal } from "@/data/seasonal";

/**
 * Thin configurable bar shown above the nav row (inside the same fixed
 * header — see Navbar.tsx) when `seasonal.announcementBar.enabled` is true.
 * Renders nothing at all when disabled, so no claim about bookings being
 * open is ever made unintentionally.
 */
export function SeasonalAnnouncementBar() {
  const { announcementBar } = seasonal;
  if (!announcementBar.enabled) return null;

  return (
    <a
      href={announcementBar.href}
      className="font-nav flex h-9 items-center justify-center gap-2 bg-paper px-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-void transition-colors hover:bg-bone"
    >
      <Sparkle size={12} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{announcementBar.text}</span>
    </a>
  );
}

/** Exported so Navbar/Hero can reserve the right amount of top space. */
export const ANNOUNCEMENT_BAR_HEIGHT_PX = 36;
