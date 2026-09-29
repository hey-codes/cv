import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: "Page not found",
};

/** 404 in the site's own voice: Fraunces name, the red rule, one mono line,
 * and a blue link home. */
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="container mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-y-4 p-4 md:p-16"
    >
      <h1 className="text-balance font-display text-[34px] font-bold leading-tight tracking-tight md:text-[44px]">
        {RESUME_DATA.name}
      </h1>
      <hr className="border-t-[3px] border-accent-red" />
      <p className="font-mono text-sm text-muted-foreground">
        404 · That page doesn’t exist.
      </p>
      <p className="font-mono text-sm">
        <Link href="/" className="link-wipe font-bold text-accent-brand">
          Back to codymitch.works
        </Link>
      </p>
    </main>
  );
}
