import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

// FMWorks type system: Fraunces (display serif) + Geist (UI sans) + JetBrains
// Mono (meta/labels). Faces are the exact woff2 subsets shipped in
// ~/Projects/design-refs/FMWorks-Design-System/fonts, self-hosted here so the
// site renders identically to the design system with no build-time fetch.
const fraunces = localFont({
  src: [
    {
      path: "./fonts/fraunces-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/fraunces-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "./fonts/jetbrains-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});

import type React from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://codymitch.works"),
  title: {
    default: `${RESUME_DATA.name} - ${RESUME_DATA.about}`,
    template: `%s | ${RESUME_DATA.name}`,
  },
  description: RESUME_DATA.about,
  keywords: [
    "resume",
    "cv",
    "portfolio",
    RESUME_DATA.name,
    "facilities management",
    "facilities manager",
    "multi-site operations",
    "workplace operations",
    "preventive maintenance",
    "CMMS",
  ],
  authors: [{ name: RESUME_DATA.name }],
  creator: RESUME_DATA.name,
  publisher: RESUME_DATA.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: RESUME_DATA.personalWebsiteUrl,
    siteName: `${RESUME_DATA.name}'s CV`,
    title: `${RESUME_DATA.name} - ${RESUME_DATA.about}`,
    description: RESUME_DATA.about,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - ${RESUME_DATA.about}`,
    description: RESUME_DATA.about,
  },
  alternates: {
    canonical: RESUME_DATA.personalWebsiteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${GeistSans.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
    >
      <body>
        <ThemeProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
