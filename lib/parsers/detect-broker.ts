import type { Broker } from "@/lib/types";

// Multiple signature variants per broker to handle different export formats
const BROKER_SIGNATURES: Record<string, string[][]> = {
  zerodha: [
    // Zerodha Console tradebook
    ["trade_date", "tradingsymbol", "exchange", "quantity", "price"],
    // Kite export (alternative column names)
    ["order_execution_time", "tradingsymbol", "exchange", "quantity", "price"],
    // Kite variant with different date column
    ["trade_date", "instrument", "exchange", "qty", "price"],
    // Another Kite variant
    ["date", "tradingsymbol", "exchange", "quantity", "average_price"],
  ],
  groww: [
    ["symbol", "trade type", "quantity", "trade price"],
    // Groww CSV variant
    ["symbol", "type", "quantity", "price"],
    // Groww contract note format
    ["scrip name", "buy/sell", "quantity", "rate"],
  ],
  upstox: [
    ["exchange", "symbol", "token", "trade_type", "quantity"],
    ["exchange", "trading_symbol", "trade_type", "quantity", "price"],
  ],
  angel: [
    ["trade date", "script name", "buy/sell", "quantity"],
    ["trade_date", "scrip_name", "transaction_type", "quantity"],
  ],
};

export function detectBroker(headers: string[]): Broker | null {
  const normalized = headers.map((h) =>
    h.trim().toLowerCase().replace(/\s+/g, "_")
  );
  // Also keep space-separated version for matching
  const normalizedSpaced = headers.map((h) => h.trim().toLowerCase());

  for (const [broker, variants] of Object.entries(BROKER_SIGNATURES)) {
    for (const signature of variants) {
      const sigNormalized = signature.map((s) => s.toLowerCase());
      // Match against both underscore and space-separated headers
      if (
        sigNormalized.every(
          (col) =>
            normalizedSpaced.includes(col) ||
            normalized.includes(col.replace(/\s+/g, "_"))
        )
      ) {
        return broker as Broker;
      }
    }
  }

  return null;
}

export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}
