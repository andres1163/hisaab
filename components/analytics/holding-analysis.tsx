"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HoldingPeriodBucket } from "@/lib/analytics/behavioral";
import { formatINR, formatPnl } from "@/lib/utils/format";

interface HoldingAnalysisProps {
  data: HoldingPeriodBucket[];
}

export function HoldingAnalysis({ data }: HoldingAnalysisProps) {
  const filtered = data.filter((d) => d.trades > 0);
  if (filtered.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Holding Period Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Trades</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
              <TableHead className="text-right">Total P&L</TableHead>
              <TableHead className="text-right">Avg P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => {
              const pnl = formatPnl(row.pnl);
              const avg = formatPnl(row.avgPnl);
              return (
                <TableRow key={row.label}>
                  <TableCell className="text-xs font-medium">
                    {row.label}
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    {row.trades}
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    {row.winRate.toFixed(1)}%
                  </TableCell>
                  <TableCell
                    className={`text-right text-xs font-medium ${pnl.className}`}
                  >
                    {pnl.text}
                  </TableCell>
                  <TableCell
                    className={`text-right text-xs ${avg.className}`}
                  >
                    {avg.text}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
