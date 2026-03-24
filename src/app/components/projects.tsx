import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";

type ProjectTags = readonly string[];
type ProjectStatus = "on-boarding" | "in-progress" | "complete";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  "on-boarding": "bg-yellow-500",
  "in-progress": "bg-green-500",
  complete: "bg-blue-500",
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  "on-boarding": "On-boarding",
  "in-progress": "In progress",
  complete: "Complete",
};

interface StatusIndicatorProps {
  status: ProjectStatus;
}

/**
 * Renders a colored dot indicating project status
 */
function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span
      className={`size-1.5 rounded-full ${STATUS_COLORS[status]}`}
      title={STATUS_LABELS[status]}
      aria-label={`Status: ${STATUS_LABELS[status]}`}
    />
  );
}

interface ProjectTitleProps {
  title: string;
  status: ProjectStatus;
  link?: string;
}

/**
 * Renders project title with status indicator and optional link
 */
function ProjectTitle({ title, status, link }: ProjectTitleProps) {
  const titleContent = (
    <span className="inline-flex items-center gap-1.5">
      {title}
      <StatusIndicator status={status} />
    </span>
  );

  if (!link) {
    return titleContent;
  }

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-accent-brand font-bold italic no-underline hover:underline"
        aria-label={`${title} project (opens in new tab)`}
      >
        {title}
        <StatusIndicator status={status} />
      </a>
      <div
        className="hidden font-mono text-xs underline print:visible"
        aria-hidden="true"
      >
        {link.replace("https://", "").replace("www.", "").replace("/", "")}
      </div>
    </>
  );
}

interface ProjectTagsProps {
  tags: ProjectTags;
}

/**
 * Renders a list of scope-of-work tags
 */
function ProjectTags({ tags }: ProjectTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      className="mt-2 flex list-none flex-wrap gap-1 p-0"
      aria-label="Scope of work"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            className="px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
            variant="secondary"
          >
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: ProjectTags;
  location: string;
  status: ProjectStatus;
  link?: string;
}

/**
 * Card component displaying project information
 */
function ProjectCard({
  title,
  description,
  tags,
  location,
  status,
  link,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border p-3">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            <ProjectTitle title={title} status={status} link={link} />
          </CardTitle>
          <div className="font-mono text-xs text-muted-foreground">
            {location}
          </div>
          <CardDescription
            className="text-pretty font-mono text-xs print:text-[10px]"
            aria-label="Project description"
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <ProjectTags tags={tags} />
      </CardContent>
    </Card>
  );
}

interface ProjectsProps {
  projects: (typeof RESUME_DATA)["projects"];
}

/**
 * Section component displaying independent consulting projects
 */
export function Projects({ projects }: ProjectsProps) {
  return (
    <Section className="scroll-mb-16 print:space-y-4">
      <h2 className="text-[22px] font-bold uppercase" id="side-projects">
        Independent Consulting
      </h2>
      <div
        className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2"
        role="feed"
        aria-labelledby="side-projects"
      >
        {projects.map((project) => (
          <article
            key={project.title}
            className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm print:hover:translate-y-0 print:hover:shadow-none"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.techStack}
              location={project.location}
              status={project.status}
              link={project.link?.href}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
