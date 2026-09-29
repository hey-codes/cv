import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type React from "react";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { XIcon } from "@/components/icons/x-icon";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import type { IconType } from "@/lib/types";

// Type-safe icon mapping
const ICON_MAP: Record<
  IconType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  x: XIcon,
  globe: GlobeIcon,
  mail: MailIcon,
  phone: PhoneIcon,
} as const;

type Social = (typeof RESUME_DATA)["contact"]["social"][number];

interface LocationLinkProps {
  location: typeof RESUME_DATA.location;
  locationLink: typeof RESUME_DATA.locationLink;
}

function LocationLink({ location }: LocationLinkProps) {
  return (
    <p className="max-w-md items-center text-pretty font-mono text-xs text-foreground ml-1">
      {/* The visible text already reads as the location, so the icon is purely
          decorative and the span needs no accessible name of its own. */}
      <span className="inline-flex gap-x-1.5 align-baseline leading-none">
        <MapPinIcon className="size-3" strokeWidth={1.5} aria-hidden="true" />
        {location}
      </span>
    </p>
  );
}

interface SocialButtonProps {
  href: string;
  iconType: IconType;
  label: string;
}

function SocialButton({ href, iconType, label }: SocialButtonProps) {
  const IconComponent = ICON_MAP[iconType];

  return (
    <Button
      className="size-8 relative before:absolute before:-inset-1.5 before:content-['']"
      variant="outline"
      size="icon"
      asChild={true}
    >
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconComponent className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

/** The page's one call to action. LinkedIn is the contact path by design:
 * the site carries no email, phone, or downloadable resume. */
function ConnectButton({ href }: { href: string }) {
  return (
    <Button
      className="h-8 gap-x-1.5 bg-accent-strong px-3 text-accent-ink hover:bg-accent-strong/90 relative before:absolute before:-inset-1.5 before:content-['']"
      asChild={true}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <LinkedInIcon className="size-4" aria-hidden="true" />
        Connect on LinkedIn
      </a>
    </Button>
  );
}

function socialLabel(social: Social): string {
  return social.handle ? `${social.name} (${social.handle})` : social.name;
}

interface ContactButtonsProps {
  contact: typeof RESUME_DATA.contact;
  className?: string;
}

/** LinkedIn as a labeled button first, every other social as an icon beside it.
 * Shared by the header and the closing block so both read the same. */
export function ContactButtons({ contact, className }: ContactButtonsProps) {
  const linkedin = contact.social.find((social) => social.icon === "linkedin");
  const others = contact.social.filter((social) => social.icon !== "linkedin");

  return (
    <ul
      className={`flex list-none flex-wrap items-center gap-3 print:hidden ${className ?? ""}`}
      aria-label="Contact links"
    >
      {linkedin && (
        <li>
          <ConnectButton href={linkedin.url} />
        </li>
      )}
      {others.map((social) => (
        <li key={social.name}>
          <SocialButton
            href={social.url}
            iconType={social.icon}
            label={socialLabel(social)}
          />
        </li>
      ))}
    </ul>
  );
}

function PrintContact({ personalWebsiteUrl }: { personalWebsiteUrl: string }) {
  return (
    <div className="hidden gap-x-2 font-mono text-sm text-foreground/80 print:flex print:text-[12px]">
      <a
        className="underline hover:text-foreground/70"
        href={personalWebsiteUrl}
      >
        {new URL(personalWebsiteUrl).hostname}
      </a>
    </div>
  );
}

/**
 * Header component displaying personal information and contact details
 */
export function Header() {
  return (
    <header>
      <div className="space-y-1.5">
        <h1
          className="text-balance font-display text-[34px] font-bold leading-tight tracking-tight md:text-[44px] print:text-3xl"
          id="resume-name"
        >
          {RESUME_DATA.name}
        </h1>
        <p className="max-w-md text-pretty font-mono text-sm text-foreground/80 print:text-[12px]">
          {RESUME_DATA.about}
        </p>

        <LocationLink
          location={RESUME_DATA.location}
          locationLink={RESUME_DATA.locationLink}
        />

        <ContactButtons contact={RESUME_DATA.contact} className="pt-1" />

        <PrintContact personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl} />
      </div>
    </header>
  );
}
