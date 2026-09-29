import type { Metadata } from "next";
import Link from "next/link";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="container mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-y-4 p-4 md:p-16"
    >
      <h1 className="text-balance font-display text-hero font-bold tracking-tight">
        {RESUME_DATA.name}
      </h1>
      <hr className="border-t-[3px] border-accent-red" />
      <p className="text-base text-foreground/80">That page doesn’t exist.</p>
      <p className="text-base">
        <Link href="/" className="link-wipe font-semibold text-accent-brand">
          Back to the home page
        </Link>
      </p>
    </main>
  );
}
