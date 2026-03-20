"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { MatchedTradeRecord } from "@/lib/types";
import { computeTaxReport, exportTaxReportCSV } from "@/lib/analytics/tax";
import { downloadFile } from "@/lib/utils/export";
import { formatINR, formatPnl } from "@/lib/utils/format";
import { getAllFYs } from "@/lib/utils/fy";
import { FileSpreadsheet, Receipt } from "lucide-react";

interface TaxReportProps {
  trades: MatchedTradeRecord[];
}

export function TaxReport({ trades }: TaxReportProps) {
  const fys = useMemo(() => getAllFYs(trades), [trades]);
  const [selectedFY, setSelectedFY] = useState(fys[0] ?? "");

  const summary = useMemo(
    () => computeTaxReport(trades, selectedFY || undefined),
    [trades, selectedFY]
  );

  function handleExport() {
    const csv = exportTaxReportCSV(summary);
    const fyLabel = selectedFY || "all";
    downloadFile(
      csv,
      `hisaab-tax-report-${fyLabel}.csv`,
      "text/csv"
    );
  }

  if (trades.filter((t) => t.status === "CLOSED").length === 0) return null;

  const stcgPnl = formatPnl(summary.stcg.totalPnl);
  const ltcgPnl = formatPnl(summary.ltcg.totalPnl);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              Tax Report (STCG / LTCG)
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
              className="h-7 rounded-md border border-input bg-transparent px-2 text-xs font-medium outline-none focus-visible:border-ring"
            >
              <option value="">All Time</option>
              {fys.map((fy) => (
                <option key={fy} value={fy}>
                  {fy}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border p-3 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              STCG P&L
            </p>
            <p className={`text-sm font-semibold ${stcgPnl.className}`}>
              {stcgPnl.text}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {summary.stcg.count} trades
            </p>
          </div>
          <div className="rounded-lg border p-3 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              STCG Tax (20%)
            </p>
            <p className="text-sm font-semibold">
              {formatINR(summary.stcg.estimatedTax)}
            </p>
          </div>
          <div className="rounded-lg border p-3 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              LTCG P&L
            </p>
            <p className={`text-sm font-semibold ${ltcgPnl.className}`}>
              {ltcgPnl.text}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {summary.ltcg.count} trades | {formatINR(summary.ltcg.exemption)}{" "}
              exempt
            </p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
            <p className="text-[10px] text-primary uppercase tracking-wide font-medium">
              Total Estimated Tax
            </p>
            <p className="text-sm font-bold text-primary">
              {formatINR(summary.totalEstimatedTax)}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Consult a CA for actual filing
            </p>
          </div>
        </div>

        {/* Trade-wise breakdown */}
        <div className="overflow-auto max-h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Entry</TableHead>
                <TableHead className="text-right">Exit</TableHead>
                <TableHead className="text-right">Days</TableHead>
                <TableHead className="text-right">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.trades.slice(0, 50).map((t, i) => {
                const pnl = formatPnl(t.grossPnl);
                return (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">
                      {t.symbol}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={t.taxType === "LTCG" ? "default" : "secondary"}
                        className="text-[10px] px-1.5"
                      >
                        {t.taxType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {t.quantity}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {formatINR(t.entryPrice, true)}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {formatINR(t.exitPrice, true)}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {t.holdingDays}d
                    </TableCell>
                    <TableCell
                      className={`text-right text-xs font-medium ${pnl.className}`}
                    >
                      {pnl.text}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {summary.trades.length > 50 && (
          <p className="text-xs text-muted-foreground text-center">
            Showing 50 of {summary.trades.length} trades. Export CSV for full
            report.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
