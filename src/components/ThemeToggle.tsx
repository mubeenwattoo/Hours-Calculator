"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all duration-200 ease-out hover:bg-secondary hover:border-primary/30 hover:-translate-y-px active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Toggle color theme"
    >
      <Moon
        className={cn(
          "h-[1.125rem] w-[1.125rem]",
          mounted && theme === "dark" && "hidden",
        )}
        aria-hidden="true"
      />
      <Sun
        className={cn(
          "h-[1.125rem] w-[1.125rem]",
          (!mounted || theme === "light") && "hidden",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
