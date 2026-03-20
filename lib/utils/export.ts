import type { MatchedTradeRecord } from "@/lib/types";
import { db } from "@/lib/storage/db";

export async function exportMatchedTradesCSV(): Promise<string> {
  const trades = await db.matchedTrades
    .where("status")
    .equals("CLOSED")
    .toArray();

  const headers = [
    "Symbol",
    "Direction",
    "Entry Date",
    "Exit Date",
    "Entry Price",
    "Exit Price",
    "Quantity",
    "P&L",
    "P&L %",
    "Holding Days",
    "Tags",
    "Emotion",
    "Rating",
    "Notes",
  ];

  const rows = trades.map((t) => [
    t.symbol,
    t.direction,
    t.entryDate.slice(0, 10),
    t.exitDate.slice(0, 10),
    t.entryPrice.toFixed(2),
    t.exitPrice.toFixed(2),
    t.quantity,
    t.pnl.toFixed(2),
    t.pnlPercent.toFixed(2),
    t.holdingDays,
    (t.tags ?? []).join("; "),
    t.emotion ?? "",
    t.rating ?? "",
    // Sanitize notes for CSV (escape quotes, remove newlines)
    (t.notes ?? "").replace(/"/g, '""').replace(/\n/g, " "),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map(
      (row) => row.map((cell) => `"${cell}"`).join(",")
    ),
  ].join("\n");

  return csv;
}

export async function exportAllDataJSON(): Promise<string> {
  const trades = await db.trades.toArray();
  const matchedTrades = await db.matchedTrades.toArray();
  const imports = await db.imports.toArray();
  return JSON.stringify({ trades, matchedTrades, imports }, null, 2);
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
