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
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>+K
        </kbd>{" "}
        to open the command menu
      </p>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl xl:hidden print:hidden"
      >
        <CommandIcon className="my-6 size-6" />
      </Button>
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
              <SunIcon className="mr-2 size-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <MoonIcon className="mr-2 size-4" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("system");
                setOpen(false);
              }}
            >
              <MonitorIcon className="mr-2 size-4" />
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
