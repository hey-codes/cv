import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type React from "react";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { XIcon } from "@/components/icons/x-icon";
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
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="ctl relative inline-flex size-8 items-center justify-center rounded-md before:absolute before:-inset-1.5 before:content-['']"
    >
      <IconComponent className="size-4" aria-hidden="true" />
    </a>
  );
}

/** Same outlined control, with its name spelled out so it reads as a next step. */
function LabeledSocialButton({ href, iconType, label }: SocialButtonProps) {
  const IconComponent = ICON_MAP[iconType];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ctl relative inline-flex h-8 items-center gap-x-1.5 whitespace-nowrap rounded-md px-3 font-mono text-xs font-medium before:absolute before:-inset-1.5 before:content-['']"
    >
      <IconComponent className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}

interface ContactButtonsProps {
  contact: typeof RESUME_DATA.contact;
  personalWebsiteUrl?: string;
}

function ContactButtons({ contact }: ContactButtonsProps) {
  return (
    <ul
      className="flex list-none items-center gap-x-3 pt-1 font-mono text-sm text-foreground/80 print:hidden"
      aria-label="Contact links"
    >
      {contact.social.map((social) => (
        <li key={social.name}>
          {social.icon === "linkedin" ? (
            <LabeledSocialButton
              href={social.url}
              iconType={social.icon}
              label={social.name}
            />
          ) : (
            <SocialButton
              href={social.url}
              iconType={social.icon}
              label={
                social.handle ? `${social.name} (${social.handle})` : social.name
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
}

interface PrintContactProps {
  personalWebsiteUrl?: string;
}

function PrintContact({ personalWebsiteUrl }: PrintContactProps) {
  return (
    <div className="hidden gap-x-2 font-mono text-sm text-foreground/80 print:flex print:text-[12px]">
      {personalWebsiteUrl && (
        <>
          <a
            className="underline hover:text-foreground/70"
            href={personalWebsiteUrl}
          >
            {new URL(personalWebsiteUrl).hostname}
          </a>
          <span aria-hidden="true">/</span>
        </>
      )}
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

        <ContactButtons
          contact={RESUME_DATA.contact}
          personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl}
        />

        <PrintContact
          personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl}
        />
      </div>
    </header>
  );
}
