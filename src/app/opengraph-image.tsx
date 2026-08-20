import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { RESUME_DATA } from "../data/resume-data";

/**
 * Fully self-contained OG card. No runtime network calls: every pixel is drawn
 * from local RESUME_DATA plus the TTF cuts of our own type system in
 * ./fonts/og, so LinkedIn / Gmail / Slack / iMessage unfurls can never render
 * blank because a third party is down.
 *
 * Deliberately NOT edge runtime -- Node lets Next prerender this to a static
 * PNG at build time, which is the most reliable thing an unfurler can hit.
 *
 * Composition is monogram-led on purpose. iMessage renders this card at roughly
 * 300px wide, where anything under ~40px collapses past the point of reading.
 * The CM plate and the name survive that downscale; the rest is texture.
 */

export const alt = `${RESUME_DATA.name} - ${RESUME_DATA.about}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Design tokens, resolved from src/app/globals.css :root
const FOREGROUND = "#37352f";
const MUTED_FOREGROUND = "#73726a";
const BORDER = "#e9e9e7";
const ACCENT_RED = "#e10b00";
const BACKGROUND = "#ffffff";

const DOMAIN = "codymitch.works";

// Mirrors STATS in src/app/components/stat-strip.tsx
const STATS = [
  { value: "13", label: "YEARS IN FM" },
  { value: "400+", label: "LOCATIONS" },
  { value: "9", label: "BRANDS" },
  { value: "$5.3M", label: "PEAK SPEND" },
] as const;

// satori only reads TTF/OTF/WOFF, so these are decompressed cuts of the same
// woff2 subsets layout.tsx self-hosts. Same faces, different container.
const FONT_DIR = join(process.cwd(), "src/app/fonts/og");

async function loadFonts() {
  const [fraunces, monoRegular, monoBold] = await Promise.all([
    readFile(join(FONT_DIR, "fraunces-latin-900-normal.ttf")),
    readFile(join(FONT_DIR, "jetbrains-mono-latin-400-normal.ttf")),
    readFile(join(FONT_DIR, "jetbrains-mono-latin-700-normal.ttf")),
  ]);

  return [
    // satori cannot instance a variable font, so Fraunces ships here as a
    // static wght 900 cut pinned out of the variable subset. Display Black.
    {
      name: "Fraunces",
      data: fraunces,
      weight: 900 as const,
      style: "normal" as const,
    },
    {
      name: "JetBrains Mono",
      data: monoRegular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "JetBrains Mono",
      data: monoBold,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}

export default async function Image() {
  const fonts = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BACKGROUND,
        color: FOREGROUND,
        fontFamily: "JetBrains Mono",
      }}
    >
      {/* Editorial pressmark: full-bleed red rule across the head of the card */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "14px",
          background: ACCENT_RED,
        }}
      />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Monogram plate. Solid ink mass so the mark still reads as a mark at
            thumbnail size, where the type beside it does not. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "430px",
            height: "100%",
            background: FOREGROUND,
            color: BACKGROUND,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: "232px",
              lineHeight: 1,
              letterSpacing: "-10px",
              // optical centering: the -10px tracking pulls the pair left
              paddingLeft: "10px",
            }}
          >
            {RESUME_DATA.initials}
          </div>

          <div
            style={{
              display: "flex",
              width: "132px",
              height: "6px",
              background: ACCENT_RED,
              marginTop: "40px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: "62px 64px 52px 64px",
          }}
        >
          {/* The name group floats between the two spacers rather than sitting
              on the top padding. Bottom spacer is the heavier of the pair, so
              the group lands just above the optical centre of the free space. */}
          <div style={{ display: "flex", flexGrow: 1 }} />

          <div
            style={{
              display: "flex",
              fontSize: "19px",
              fontWeight: 700,
              letterSpacing: "6px",
              color: MUTED_FOREGROUND,
            }}
          >
            RESUME
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              marginTop: "26px",
              fontSize: "76px",
              letterSpacing: "-2.5px",
              lineHeight: 1.05,
            }}
          >
            {RESUME_DATA.name}
          </div>

          <div style={{ display: "flex", flexGrow: 1.25 }} />

          {/* Same four numbers the page opens with, so the unfurl and the site
              tell the identical story */}
          <div style={{ display: "flex", marginBottom: "34px" }}>
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: i === 0 ? "0px" : "44px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Fraunces",
                    fontSize: "36px",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "9px",
                    fontSize: "14px",
                    letterSpacing: "1.6px",
                    color: MUTED_FOREGROUND,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              height: "1px",
              background: BORDER,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "26px",
              fontSize: "23px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: FOREGROUND,
            }}
          >
            {DOMAIN}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts,
    }
  );
}
