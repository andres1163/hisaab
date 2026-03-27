"use client";

import { cn } from "@/lib/utils";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { Moon, Sun } from "lucide-react";
import type { ComponentProps } from "react";

export function ThemeToggle({ className }: ComponentProps<"button">) {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "size-8 flex items-center justify-center rounded-full border border-border/60 bg-background text-foreground transition-all duration-200 hover:bg-accent active:scale-95",
        className
      )}
      onClick={toggleTheme}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
