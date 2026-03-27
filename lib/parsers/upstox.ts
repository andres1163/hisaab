import Papa from "papaparse";
import { ulid } from "ulid";
import type { TradeRecord, ParseResult, ParseError } from "@/lib/types";
import { parseTradeDate, excelSerialToISO } from "@/lib/utils/dates";
import { getFY } from "@/lib/utils/fy";

/**
 * Check if normalized headers match the Upstox Realized P&L format.
 */
function isRealizedPnLFormat(headers: string[]): boolean {
  const required = ["scrip_name", "symbol", "qty", "buy_date", "sell_date"];
  return required.every((col) => headers.includes(col));
}

/**
 * Parse Upstox Realized P&L XLSX format.
 * Each row contains both BUY and SELL data for a completed trade pair.
 */
export function parseUpstoxPnL(
  rows: Record<string, string>[],
  fileName: string,
  importId: string
): ParseResult {
  const errors: ParseError[] = [];
  const trades: TradeRecord[] = [];
  const now = new Date().toISOString();
  let minDate = "";
  let maxDate = "";

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const symbol = (row.symbol || "").toString().trim().toUpperCase();
    if (!symbol) continue; // skip empty/summary rows

    const qty = parseInt(String(row.qty || "0"));
    if (isNaN(qty) || qty <= 0) {
      errors.push({ row: i + 2, field: "qty", value: String(row.qty), message: "Invalid quantity" });
      continue;
    }

    const isin = (row.isin || "").toString().trim() || undefined;
    const segment = (row.scrip_opt || "EQ").toString().trim().toUpperCase() === "EQ" ? "EQ" : "FO";

    // --- BUY leg ---
    const rawBuyDate = String(row.buy_date || "");
    const buyDate = /^\d{4,5}$/.test(rawBuyDate)
      ? excelSerialToISO(parseInt(rawBuyDate))
      : parseTradeDate(rawBuyDate);
    const buyRate = parseFloat(String(row.buy_rate || "0"));

    if (!buyDate) {
      errors.push({ row: i + 2, field: "buy_date", value: rawBuyDate, message: "Invalid buy date" });
    } else if (isNaN(buyRate) || buyRate <= 0) {
      errors.push({ row: i + 2, field: "buy_rate", value: String(row.buy_rate), message: "Invalid buy rate" });
    } else {
      if (!minDate || buyDate < minDate) minDate = buyDate;
      if (!maxDate || buyDate > maxDate) maxDate = buyDate;

      trades.push({
        id: ulid(),
        broker: "upstox",
        symbol,
        isin,
        exchange: "NSE",
        segment: segment as "EQ" | "FO",
        tradeType: "BUY",
        quantity: qty,
        price: buyRate,
        amount: qty * buyRate,
        tradeDate: buyDate,
        importId,
        importedAt: now,
        financialYear: getFY(buyDate),
      });
    }

    // --- SELL leg ---
    const rawSellDate = String(row.sell_date || "");
    const sellDate = /^\d{4,5}$/.test(rawSellDate)
      ? excelSerialToISO(parseInt(rawSellDate))
      : parseTradeDate(rawSellDate);
    const sellRate = parseFloat(String(row.sell_rate || "0"));

    if (!sellDate) {
      errors.push({ row: i + 2, field: "sell_date", value: rawSellDate, message: "Invalid sell date" });
    } else if (isNaN(sellRate) || sellRate <= 0) {
      errors.push({ row: i + 2, field: "sell_rate", value: String(row.sell_rate), message: "Invalid sell rate" });
    } else {
      if (!minDate || sellDate < minDate) minDate = sellDate;
      if (!maxDate || sellDate > maxDate) maxDate = sellDate;

      trades.push({
        id: ulid(),
        broker: "upstox",
        symbol,
        isin,
        exchange: "NSE",
        segment: segment as "EQ" | "FO",
        tradeType: "SELL",
        quantity: qty,
        price: sellRate,
        amount: qty * sellRate,
        tradeDate: sellDate,
        importId,
        importedAt: now,
        financialYear: getFY(sellDate),
      });
    }
  }

  return {
    trades,
    errors,
    meta: {
      broker: "upstox",
      fileName,
      totalRows: rows.length,
      parsedRows: trades.length,
      skippedRows: errors.length,
      dateRange: minDate ? { from: minDate, to: maxDate } : null,
    },
  };
}

/**
 * Parse standard Upstox tradebook CSV format (individual trade rows).
 */
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

  // Check if this CSV is actually the Realized P&L format
  if (parsed.data.length > 0) {
    const headers = Object.keys(parsed.data[0]);
    if (isRealizedPnLFormat(headers)) {
      return parseUpstoxPnL(parsed.data, fileName, importId);
    }
  }

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
