"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const METIS_BASE = "https://trymetis.app";

function metisLink(content: string) {
  return `${METIS_BASE}?utm_source=hisaab&utm_medium=app&utm_content=${content}`;
}

/**
 * Subtle footer CTA for the analytics page.
 * Non-intrusive, informational, at the bottom of analytics.
 */
export function MetisAnalyticsCTA() {
  return (
    <Card className="border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium">
            Hisaab shows you what happened.
          </p>
          <p className="text-sm text-muted-foreground">
            Metis helps you decide what to do next. AI-powered stock analysis for Indian traders.
          </p>
        </div>
        <a
          href={metisLink("analytics-footer")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Explore Metis
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

/**
 * Minimal "Part of the Metis ecosystem" trust signal for empty states.
 */
export function MetisTrustSignal() {
  return (
    <p className="text-xs text-muted-foreground/60 text-center">
      Part of the{" "}
      <a
        href={metisLink("trust-signal")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary/60 hover:text-primary transition-colors"
      >
        Metis
      </a>{" "}
      ecosystem. Open source. Privacy first.
    </p>
  );
}

/**
 * Tiny "Powered by Metis" for bottom nav area.
 */
export function PoweredByMetis() {
  return (
    <a
      href={metisLink("powered-by")}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[9px] text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors text-center block"
    >
      Powered by Metis
    </a>
  );
}

export { metisLink };
