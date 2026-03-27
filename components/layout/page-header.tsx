"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface PageHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/journal", label: "Journal" },
  { href: "/calendar", label: "Calendar" },
  { href: "/analytics", label: "Analytics" },
] as const;

export function PageHeader({ title, children }: PageHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Hisaab
          </Link>
          {title && (
            <>
              <span className="text-muted-foreground/40 md:hidden">/</span>
              <h1 className="text-sm font-semibold text-foreground md:hidden">
                {title}
              </h1>
            </>
          )}

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
