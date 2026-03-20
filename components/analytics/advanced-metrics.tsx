"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdvancedMetrics } from "@/lib/analytics/advanced";
import { formatINR } from "@/lib/utils/format";
import { Activity, TrendingDown, Percent, Shield } from "lucide-react";

interface AdvancedMetricsCardProps {
  metrics: AdvancedMetrics;
}

export function AdvancedMetricsCard({ metrics }: AdvancedMetricsCardProps) {
  const items = [
    {
      label: "Expectancy",
      value: formatINR(metrics.expectancy),
      subtitle: "Avg P&L per trade",
      icon: Activity,
      positive: metrics.expectancy > 0,
    },
    {
      label: "Sharpe Ratio",
      value: metrics.sharpeRatio.toFixed(2),
      subtitle: "Risk-adjusted return",
      icon: Percent,
      positive: metrics.sharpeRatio > 1,
    },
    {
      label: "Max Drawdown",
      value: formatINR(metrics.maxDrawdown),
      subtitle: `${metrics.maxDrawdownPercent.toFixed(1)}% from peak`,
      icon: TrendingDown,
      positive: false,
    },
    {
      label: "Recovery Factor",
      value: metrics.recoveryFactor.toFixed(2),
      subtitle: "Net profit / max DD",
      icon: Activity,
      positive: metrics.recoveryFactor > 1,
    },
    {
      label: "Kelly %",
      value: `${metrics.kellyPercent.toFixed(1)}%`,
      subtitle: "Optimal position size",
      icon: Shield,
      positive: metrics.kellyPercent > 0,
    },
    {
      label: "Risk of Ruin",
      value: `${metrics.riskOfRuin.toFixed(1)}%`,
      subtitle: "Probability of blowup",
      icon: Shield,
      positive: metrics.riskOfRuin < 5,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
            <item.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-bold ${
                item.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.value}
            </div>
            <p className="text-[10px] text-muted-foreground">
              {item.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
