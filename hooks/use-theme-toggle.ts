"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

/**
 * View Transition theme toggle hook.
 * Uses the View Transitions API for a smooth circular clip-path animation.
 * Falls back to an instant switch on unsupported browsers.
 *
 * Based on rudrodip/theme-toggle-effect
 */
export const useThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);

    if (typeof window === "undefined") return;

    const css = `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
      ::view-transition-new(root) {
        animation-name: reveal;
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal;
      }
      @keyframes reveal {
        from { clip-path: circle(0% at 100% 0%); }
        to   { clip-path: circle(150% at 100% 0%); }
      }
    `;

    let style = document.getElementById("theme-transition") as HTMLStyleElement;
    if (!style) {
      style = document.createElement("style");
      style.id = "theme-transition";
      document.head.appendChild(style);
    }
    style.textContent = css;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme, isDark]);

  return { isDark, toggleTheme };
};
