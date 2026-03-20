import Papa from "papaparse";
import { ulid } from "ulid";
import type { TradeRecord, ParseResult, ParseError } from "@/lib/types";
import { parseTradeDate } from "@/lib/utils/dates";
import { getFY } from "@/lib/utils/fy";

export function parseAngel(
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

    const quantity = parseInt(row.quantity || row.qty || "0");
    const price = parseFloat(row.price || row.trade_price || "0");
    const rawType = (row["buy/sell"] || row.buy_sell || row.trade_type || row.transaction_type || "").toUpperCase();

    const tradeType = rawType.startsWith("B") ? "BUY" : rawType.startsWith("S") ? "SELL" : "";
    if (tradeType !== "BUY" && tradeType !== "SELL") {
      errors.push({ row: i + 2, field: "buy/sell", value: rawType, message: 'Expected Buy or Sell' });
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

    const symbol = (row.script_name || row.scrip_name || row.symbol || row.tradingsymbol || "").trim().toUpperCase();
    const exchange = (row.exchange || "NSE").toUpperCase();

    trades.push({
      id: ulid(),
      broker: "angel",
      symbol,
      exchange: exchange === "BSE" ? "BSE" : "NSE",
      segment: "EQ",
      tradeType: tradeType as "BUY" | "SELL",
      quantity,
      price,
      amount: quantity * price,
      tradeDate,
      tradeId: row.trade_no?.trim() || row.order_no?.trim() || undefined,
      importId,
      importedAt: now,
      financialYear: getFY(tradeDate),
    });
  }

  return {
    trades,
    errors,
    meta: {
      broker: "angel",
      fileName,
      totalRows: parsed.data.length,
      parsedRows: trades.length,
      skippedRows: errors.length,
      dateRange: minDate ? { from: minDate, to: maxDate } : null,
    },
  };
}
