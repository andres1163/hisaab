import type { MatchedTradeRecord } from "@/lib/types";

export interface DayOfWeekPerformance {
  day: string;
  dayIndex: number;
  trades: number;
  wins: number;
  winRate: number;
  pnl: number;
  avgPnl: number;
}

export interface HoldingPeriodBucket {
  label: string;
  trades: number;
  wins: number;
  winRate: number;
  pnl: number;
  avgPnl: number;
}

export interface TiltAnalysis {
  afterWinStreak: { trades: number; winRate: number; avgPnl: number };
  afterLossStreak: { trades: number; winRate: number; avgPnl: number };
  baseline: { trades: number; winRate: number; avgPnl: number };
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function computeDayOfWeekPerformance(
  trades: MatchedTradeRecord[]
): DayOfWeekPerformance[] {
  const closed = trades.filter((t) => t.status === "CLOSED");
  const byDay = new Map<number, MatchedTradeRecord[]>();

  for (const trade of closed) {
    const day = new Date(trade.entryDate).getDay();
    const existing = byDay.get(day) ?? [];
    existing.push(trade);
    byDay.set(day, existing);
  }

  // Only weekdays (1-5)
  return [1, 2, 3, 4, 5].map((dayIndex) => {
    const dayTrades = byDay.get(dayIndex) ?? [];
    const wins = dayTrades.filter((t) => t.pnl > 0);
    const totalPnl = dayTrades.reduce((s, t) => s + t.pnl, 0);

    return {
      day: DAYS[dayIndex],
      dayIndex,
      trades: dayTrades.length,
      wins: wins.length,
      winRate:
        dayTrades.length > 0
          ? (wins.length / dayTrades.length) * 100
          : 0,
      pnl: totalPnl,
      avgPnl: dayTrades.length > 0 ? totalPnl / dayTrades.length : 0,
    };
  });
}

export function computeHoldingPeriodAnalysis(
  trades: MatchedTradeRecord[]
): HoldingPeriodBucket[] {
  const closed = trades.filter((t) => t.status === "CLOSED");

  const buckets: { label: string; min: number; max: number }[] = [
    { label: "Intraday", min: 0, max: 0 },
    { label: "1-3 days", min: 1, max: 3 },
    { label: "4-7 days", min: 4, max: 7 },
    { label: "1-2 weeks", min: 8, max: 14 },
    { label: "2-4 weeks", min: 15, max: 30 },
    { label: "1+ month", min: 31, max: Infinity },
  ];

  return buckets.map(({ label, min, max }) => {
    const bucket = closed.filter(
      (t) => t.holdingDays >= min && t.holdingDays <= max
    );
    const wins = bucket.filter((t) => t.pnl > 0);
    const totalPnl = bucket.reduce((s, t) => s + t.pnl, 0);

    return {
      label,
      trades: bucket.length,
      wins: wins.length,
      winRate:
        bucket.length > 0 ? (wins.length / bucket.length) * 100 : 0,
      pnl: totalPnl,
      avgPnl: bucket.length > 0 ? totalPnl / bucket.length : 0,
    };
  });
}

export function computeTiltAnalysis(
  trades: MatchedTradeRecord[]
): TiltAnalysis {
  const closed = trades
    .filter((t) => t.status === "CLOSED")
    .sort((a, b) => a.exitDate.localeCompare(b.exitDate));

  const STREAK_THRESHOLD = 3;

  const afterWin: MatchedTradeRecord[] = [];
  const afterLoss: MatchedTradeRecord[] = [];
  const baseline: MatchedTradeRecord[] = [];

  for (let i = STREAK_THRESHOLD; i < closed.length; i++) {
    const prev = closed.slice(i - STREAK_THRESHOLD, i);
    const allWins = prev.every((t) => t.pnl > 0);
    const allLosses = prev.every((t) => t.pnl < 0);

    if (allWins) {
      afterWin.push(closed[i]);
    } else if (allLosses) {
      afterLoss.push(closed[i]);
    } else {
      baseline.push(closed[i]);
    }
  }

  function stats(arr: MatchedTradeRecord[]) {
    const wins = arr.filter((t) => t.pnl > 0);
    const totalPnl = arr.reduce((s, t) => s + t.pnl, 0);
    return {
      trades: arr.length,
      winRate: arr.length > 0 ? (wins.length / arr.length) * 100 : 0,
      avgPnl: arr.length > 0 ? totalPnl / arr.length : 0,
    };
  }

  return {
    afterWinStreak: stats(afterWin),
    afterLossStreak: stats(afterLoss),
    baseline: stats(baseline),
  };
}
