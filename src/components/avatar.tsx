import { cn } from "@/lib/utils";

interface AvatarProps {
  alt: string;
  fallback: string;
  className?: string;
}

export function Avatar({ alt, fallback, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-xl bg-accent-brand",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <div className="flex h-full w-full items-center justify-center font-mono text-3xl font-bold tracking-tight text-white">
        {fallback}
      </div>
    </div>
  );
}
