"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TiltAnalysis } from "@/lib/analytics/behavioral";
import { formatINR } from "@/lib/utils/format";

interface TiltCardProps {
  data: TiltAnalysis;
}

export function TiltCard({ data }: TiltCardProps) {
  if (
    data.afterWinStreak.trades === 0 &&
    data.afterLossStreak.trades === 0
  ) {
    return null;
  }

  const rows = [
    { label: "After 3+ wins", ...data.afterWinStreak },
    { label: "After 3+ losses", ...data.afterLossStreak },
    { label: "Baseline", ...data.baseline },
  ].filter((r) => r.trades > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Tilt Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">
          How you perform after consecutive wins or losses (streaks of 3+).
        </p>
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between text-xs"
            >
              <span className="font-medium w-32">{row.label}</span>
              <span className="text-muted-foreground">
                {row.trades} trades
              </span>
              <span>{row.winRate.toFixed(1)}% win</span>
              <span
                className={
                  row.avgPnl >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                {formatINR(row.avgPnl)} avg
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
