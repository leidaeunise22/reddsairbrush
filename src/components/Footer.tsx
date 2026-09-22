import { Mail } from "lucide-react";
import { site, socialLinks, booking } from "@/data/site";
import { StarDivider } from "@/components/StarDivider";
import { InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";

const SOCIAL_ICON = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  mail: Mail,
} as const;

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-iron bg-void">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Contact</p>
            <a
              href={`mailto:${booking.contactEmail}`}
              className="font-serif mt-3 inline-block text-xl italic text-paper transition-colors hover:text-silver"
            >
              {booking.contactEmail}
            </a>
          </div>
          <div>
            <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Studio</p>
            <p className="font-serif mt-3 text-xl italic text-paper">{site.location}</p>
          </div>
          <div>
            <p className="font-nav text-[11px] uppercase tracking-[0.35em] text-ash">Follow</p>
            <div className="mt-3 flex items-center gap-5">
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
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 border-t border-iron pt-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:text-left">
          <div className="flex items-center gap-3">
            <span className="font-gothic text-2xl text-paper sm:text-3xl">{site.brandTattoo}</span>
            <StarDivider size={16} className="shrink-0 text-paper/80" />
            <span className="font-gothic text-2xl text-paper sm:text-3xl">{site.brandAirbrush}</span>
          </div>

          <p className="font-nav text-[11px] uppercase tracking-[0.28em] text-ash">{site.location}</p>

          <p className="font-serif text-sm italic text-silver">"{site.quote}"</p>
        </div>

        <p className="font-nav mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-slate lg:text-left">
          © {new Date().getFullYear()} {site.brandTattoo} &amp; {site.brandAirbrush}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
