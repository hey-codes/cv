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

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setIsMac(window.navigator.userAgent.includes("Mac"));

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
      <p className="fixed bottom-0 left-0 right-0 hidden bg-gradient-to-t from-[hsl(var(--background))] to-transparent p-1 pt-6 text-center text-sm text-muted-foreground xl:block print:hidden">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground opacity-100">
          <span>{isMac ? "⌘" : "Ctrl"}</span>+K
        </kbd>{" "}
        to open the command menu
      </p>
      {/* The floating button opens the command menu (print, theme, links).
          It shows only from md to xl: at md the text column ends at least
          8px left of it, so it never sits over copy. Below md the menu is a
          plain button at the end of the page; from xl the hint bar covers it.
          The tooltip is visible on hover and keyboard focus. */}
      <div className="group fixed bottom-4 right-4 hidden md:block xl:hidden print:hidden">
        <Button
          onClick={() => setOpen((open) => !open)}
          variant="outline"
          size="icon"
          aria-label="Open menu: print, theme, and links"
          aria-describedby="command-menu-tip"
          className="rounded-full shadow-2xl"
        >
          <CommandIcon className="size-6" aria-hidden="true" />
        </Button>
        <span
          id="command-menu-tip"
          role="tooltip"
          className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-sm transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
        >
          Menu: print, theme, links ({isMac ? "⌘" : "Ctrl"}+K)
        </span>
      </div>
      {/* Phones and small tablets get the menu at the end of the page instead:
          a floating button there sits over the text and steals taps meant
          for tags and links. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto flex min-h-11 items-center px-4 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-[color,transform] duration-150 ease-out hover:text-accent-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:active:scale-[0.96] md:hidden print:hidden"
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
