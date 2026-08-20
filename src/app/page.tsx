import type { Metadata } from "next";
import { CommandMenu } from "@/components/command-menu";
import { ScrollNav } from "@/components/ui/scroll-nav";
import { RESUME_DATA } from "@/data/resume-data";
import { generateResumeStructuredData } from "@/lib/structured-data";
import { CareerHighlights } from "./components/career-highlights";
import { Education } from "./components/education";
import { Header } from "./components/header";
import { Skills } from "./components/skills";
import { StatStrip } from "./components/stat-strip";
import { Summary } from "./components/summary";
import { WorkExperience } from "./components/work-experience";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - Resume`,
  description: RESUME_DATA.about,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name} - ${RESUME_DATA.about}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    images: ["/opengraph-image"],
  },
};

/**
 * Transform social links for command menu
 */
function getCommandMenuLinks() {
  const links = [];

  if (RESUME_DATA.personalWebsiteUrl) {
    links.push({
      url: RESUME_DATA.personalWebsiteUrl,
      title: "Personal Website",
    });
  }

  return [
    ...links,
    ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
      url: socialMediaLink.url,
      title: socialMediaLink.name,
    })),
  ];
}

/**
 * Stamped when the page is built, so every deploy carries its own date. Uses
 * en-CA purely because it yields ISO YYYY-MM-DD without manual padding.
 */
const LAST_UPDATED = new Date().toLocaleDateString("en-CA", {
  timeZone: "America/Chicago",
});

export default function ResumePage() {
  const structuredData = generateResumeStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe for JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main
        className="container relative mx-auto scroll-my-12 overflow-auto p-4 pb-[20vh] pt-14 print:p-11 print:pb-11 md:p-16 md:pb-[20vh]"
        id="main-content"
      >
        <div className="sr-only">
          <h1>{RESUME_DATA.name}&apos;s Resume</h1>
        </div>

        <section
          className="mx-auto w-full max-w-3xl space-y-8 bg-background print:space-y-4"
          aria-label="Resume Content"
        >
          <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
            <Header />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "40ms" }}>
            <StatStrip />
          </div>

          <div className="space-y-8 print:space-y-4">
            <div className="animate-fade-in" style={{ animationDelay: "75ms" }}>
              <Summary summary={RESUME_DATA.summary} />
            </div>
            <hr className="border-border" />
            <div
              className="animate-fade-in"
              style={{ animationDelay: "150ms" }}
            >
              <CareerHighlights highlights={RESUME_DATA.careerHighlights} />
            </div>
            <hr className="border-border" />
            <div
              className="animate-fade-in"
              style={{ animationDelay: "225ms" }}
            >
              <WorkExperience work={RESUME_DATA.work} />
            </div>
            <hr className="border-border" />
            <div
              className="animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Education education={RESUME_DATA.education} />
            </div>
            <hr className="border-border" />
            <div
              className="animate-fade-in"
              style={{ animationDelay: "375ms" }}
            >
              <Skills skills={RESUME_DATA.skills} />
            </div>
          </div>

          <hr className="mt-12 border-t-[3px] border-accent-red" />

          <footer className="pb-8 pt-4 text-center font-mono text-xs text-foreground/50 print:hidden">
            <p>
              Last updated:{" "}
              <time
                dateTime={LAST_UPDATED}
                className="font-semibold text-accent-red"
              >
                {LAST_UPDATED}
              </time>
            </p>
            <p className="mt-1">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe text-accent-brand font-bold italic"
              >
                Next.js
              </a>
            </p>
          </footer>
        </section>

        <ScrollNav />

        <nav className="print:hidden" aria-label="Quick navigation">
          <CommandMenu links={getCommandMenuLinks()} />
        </nav>
      </main>
    </>
  );
}
