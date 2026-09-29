import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { RESUME_DATA } from "@/data/resume-data";

type Education = (typeof RESUME_DATA)["education"][number];

interface EducationPeriodProps {
  location?: string;
  start: Education["start"];
  end: Education["end"];
}

/**
 * Displays location and education period in a consistent format
 */
function EducationPeriod({ location, start, end }: EducationPeriodProps) {
  return (
    <div
      className="shrink-0 whitespace-nowrap font-mono text-sm tabular-nums text-muted-foreground"
      title={`Period: ${start} to ${end}`}
    >
      {location && <>{location} · </>}
      {start} - {end}
    </div>
  );
}

interface EducationItemProps {
  education: Education;
}

/**
 * Individual education card component
 */
function EducationItem({ education }: EducationItemProps) {
  const { school, link, location, start, end, degree } = education;
  const schoolId = `education-${school.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Card className="border-none">
      <CardHeader>
        <div className="flex items-center justify-between gap-x-2">
          <h3
            className="text-balance text-base font-bold"
            id={schoolId}
          >
            {link ? (
              <a
                className="link-wipe font-bold text-foreground"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${school} website (opens in new tab)`}
              >
                {school}
                <span
                  aria-hidden="true"
                  className="ml-1 text-sm text-accent-brand"
                >
                  &#8599;
                </span>
              </a>
            ) : (
              school
            )}
          </h3>
          <EducationPeriod location={location} start={start} end={end} />
        </div>
      </CardHeader>
      <CardContent
        className="mt-1 text-base text-foreground/80 print:text-[10px]"
        aria-labelledby={schoolId}
      >
        {degree}
      </CardContent>
    </Card>
  );
}

interface EducationListProps {
  education: readonly Education[];
}

/**
 * Main education section component
 * Renders a list of education experiences
 */
export function Education({ education }: EducationListProps) {
  return (
    <Section>
      <SectionHeading index="04" kicker="Credentials" id="education-section">
        Credentials
      </SectionHeading>
      <div
        className="space-y-4"
        role="feed"
        aria-labelledby="education-section"
      >
        {education.map((item) => (
          <article key={item.school}>
            <EducationItem education={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
