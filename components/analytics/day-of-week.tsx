"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DayOfWeekPerformance } from "@/lib/analytics/behavioral";

const chartConfig = {
  pnl: { label: "P&L", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface DayOfWeekChartProps {
  data: DayOfWeekPerformance[];
}

export function DayOfWeekChart({ data }: DayOfWeekChartProps) {
  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Day-of-Week Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              width={55}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.pnl >= 0 ? "var(--chart-1)" : "var(--destructive)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="grid grid-cols-5 gap-1 mt-3 text-[10px] text-center text-muted-foreground">
          {data.map((d) => (
            <div key={d.day}>
              <p className="font-medium">{d.winRate.toFixed(0)}%</p>
              <p>{d.trades} trades</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
