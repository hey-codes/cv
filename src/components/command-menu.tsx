"use client";

import { CommandIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";

interface Props {
  links: { url: string; title: string }[];
}

/**
 * The keyboard hint, inline in the footer on wide screens. It used to be a
 * fixed bar at the bottom of the viewport, which sat over body text.
 */
export function CommandMenuHint() {
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(window.navigator.userAgent.includes("Mac"));
  }, []);

  return (
    <p className="mt-1 hidden xl:block">
      Press{" "}
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[11px] font-medium text-[hsl(53.3_4.1%_40%)] opacity-100 dark:text-muted-foreground">
        <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>+K
      </kbd>{" "}
      to open the command menu
    </p>
  );
}

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    // Cmd/Ctrl+K is the palette convention and, unlike J, is not claimed by the
    // browser (Chrome and Firefox bind Cmd+J to Downloads and win that race
    // inconsistently). J stays bound for muscle memory.
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((key === "k" || key === "j") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        setOpen((isOpen) => !isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        aria-label="Open command menu"
        title="Command menu"
        className="fixed bottom-4 right-4 hidden rounded-full shadow-2xl sm:flex xl:hidden print:hidden"
      >
        <CommandIcon className="my-6 size-6" />
      </Button>
      {/* Phones get the menu at the end of the page instead: a floating button
          there sits over the text and steals taps meant for tags and links. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto flex min-h-11 items-center px-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-[color,transform] duration-150 ease-out hover:text-accent-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:active:scale-[0.96] sm:hidden print:hidden"
      >
        Menu
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Search actions, themes, and links"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.print();
              }}
            >
              <span>Print</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Theme">
            <CommandItem
              onSelect={() => {
                setTheme("light");
                setOpen(false);
              }}
            >
              <SunIcon className="mr-2 size-4" strokeWidth={1.5} />
              <span>Light</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <MoonIcon className="mr-2 size-4" strokeWidth={1.5} />
              <span>Dark</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("system");
                setOpen(false);
              }}
            >
              <MonitorIcon className="mr-2 size-4" strokeWidth={1.5} />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Links">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false);
                  window.open(url, "_blank");
                }}
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};
