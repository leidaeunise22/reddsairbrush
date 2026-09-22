import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Menu, X } from "lucide-react";
import { navLinks, socialLinks } from "@/data/site";
import { seasonal } from "@/data/seasonal";
import type { CategoryId } from "@/types/artwork";
// import { StarDivider } from "@/components/StarDivider";
import { InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import { SeasonalAnnouncementBar, ANNOUNCEMENT_BAR_HEIGHT_PX } from "@/components/SeasonalAnnouncementBar";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const NAV_HEIGHT_PX = 64; // matches h-16 below

/** Total fixed-header height (announcement bar, when shown, + nav row) — used by Hero.tsx for top padding. */
export const TOTAL_HEADER_HEIGHT_PX =
  NAV_HEIGHT_PX + (seasonal.announcementBar.enabled ? ANNOUNCEMENT_BAR_HEIGHT_PX : 0);

const SOCIAL_ICON = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  mail: Mail,
} as const;

interface NavbarProps {
  onSelectCategory: (category: CategoryId | null) => void;
}

export function Navbar({ onSelectCategory }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLockBodyScroll(isMenuOpen);

  const leftLinks = navLinks.slice(0, 4);
  const rightLinks = navLinks.slice(4);

  const handleClick = (category?: CategoryId) => {
    onSelectCategory(category ?? null);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled ? "bg-void/85 backdrop-blur-md border-b border-iron/60" : "bg-transparent"
      }`}
    >
      <SeasonalAnnouncementBar />
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Left links (desktop) */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {leftLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleClick(link.category)}
              className="font-nav text-[12px] font-medium uppercase tracking-[0.22em] text-bone/90 transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Star mark, center on desktop */}
        <a
          href="#home"
          onClick={() => handleClick()}
          className="hidden text-paper/90 transition-transform hover:scale-110 lg:block"
          aria-label="Back to top"
        >
          {/* <StarDivider size={22} /> */}
        </a>

        {/* Right links + socials (desktop) */}
        <div className="hidden items-center gap-7 lg:flex">
          <nav aria-label="Secondary" className="flex items-center gap-7">
            {rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleClick(link.category)}
                className="font-nav text-[12px] font-medium uppercase tracking-[0.22em] text-bone/90 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 border-l border-iron pl-6">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICON[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel={social.icon === "mail" ? undefined : "noreferrer"}
                  aria-label={social.label}
                  className="text-bone/80 transition-colors hover:text-paper"
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile brand + hamburger */}
        <a
          href="#home"
          onClick={() => handleClick()}
          className="font-gothic text-2xl text-paper lg:hidden"
        >
          R
        </a>
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="text-paper lg:hidden"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ top: TOTAL_HEADER_HEIGHT_PX }}
            className="fixed inset-x-0 bottom-0 z-40 bg-void/98 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-label="Mobile"
              className="flex h-full flex-col items-center justify-center gap-8 px-8"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleClick(link.category)}
                  className="font-serif text-3xl italic tracking-wide text-paper"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 flex items-center gap-6">
                {socialLinks.map((social) => {
                  const Icon = SOCIAL_ICON[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.icon === "mail" ? undefined : "_blank"}
                      rel={social.icon === "mail" ? undefined : "noreferrer"}
                      aria-label={social.label}
                      className="text-bone/80"
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
