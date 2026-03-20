import Papa from "papaparse";
import { ulid } from "ulid";
import type { TradeRecord, ParseResult, ParseError } from "@/lib/types";
import { parseTradeDate } from "@/lib/utils/dates";
import { getFY } from "@/lib/utils/fy";

export function parseUpstox(
  csvText: string,
  fileName: string,
  importId: string
): ParseResult {
  const errors: ParseError[] = [];
  const trades: TradeRecord[] = [];
  const now = new Date().toISOString();

  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  });

  let minDate = "";
  let maxDate = "";

  for (let i = 0; i < parsed.data.length; i++) {
    const row = parsed.data[i];

    const rawDate = row.trade_date || row.date || "";
    const tradeDate = parseTradeDate(rawDate);
    if (!tradeDate) {
      errors.push({ row: i + 2, field: "date", value: rawDate, message: "Invalid date" });
      continue;
    }

    const quantity = parseInt(row.quantity || "0");
    const price = parseFloat(row.price || row.trade_price || "0");
    const rawType = (row.trade_type || row.transaction_type || "").toUpperCase();

    if (rawType !== "BUY" && rawType !== "SELL") {
      errors.push({ row: i + 2, field: "trade_type", value: rawType, message: 'Expected "BUY" or "SELL"' });
      continue;
    }
    if (isNaN(quantity) || quantity <= 0) {
      errors.push({ row: i + 2, field: "quantity", value: row.quantity, message: "Invalid quantity" });
      continue;
    }
    if (isNaN(price) || price < 0) {
      errors.push({ row: i + 2, field: "price", value: row.price, message: "Invalid price" });
      continue;
    }

    if (!minDate || tradeDate < minDate) minDate = tradeDate;
    if (!maxDate || tradeDate > maxDate) maxDate = tradeDate;

    const symbol = (row.symbol || row.tradingsymbol || row.scrip_name || "").trim().toUpperCase();
    const exchange = (row.exchange || "NSE").toUpperCase();
    const segment = (row.segment || "").toUpperCase().includes("FO") ? "FO" : "EQ";

    trades.push({
      id: ulid(),
      broker: "upstox",
      symbol,
      exchange: exchange === "BSE" ? "BSE" : "NSE",
      segment: segment as "EQ" | "FO",
      tradeType: rawType as "BUY" | "SELL",
      quantity,
      price,
      amount: quantity * price,
      tradeDate,
      tradeId: row.trade_id?.trim() || row.order_id?.trim() || undefined,
      importId,
      importedAt: now,
      financialYear: getFY(tradeDate),
    });
  }

  return {
    trades,
    errors,
    meta: {
      broker: "upstox",
      fileName,
      totalRows: parsed.data.length,
      parsedRows: trades.length,
      skippedRows: errors.length,
      dateRange: minDate ? { from: minDate, to: maxDate } : null,
    },
  };
}
