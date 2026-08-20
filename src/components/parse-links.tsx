import type React from "react";

/**
 * Parses a small inline-markdown subset within a string and returns React
 * nodes: [text](url) links and **bold** emphasis. Bold marks the load-bearing
 * figures so a skimming reader can hop number to number.
 */
export function parseLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match = regex.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[3] !== undefined) {
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[3]}
        </strong>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="link-wipe text-accent-brand font-bold italic"
        >
          {match[1]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
