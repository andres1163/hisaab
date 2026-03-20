import type { MatchedTradeRecord } from "@/lib/types";

// Indian T-bill rate (approximate, annualized)
const RISK_FREE_RATE = 0.065;

export interface AdvancedMetrics {
  expectancy: number;
  stdDev: number;
  sharpeRatio: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  recoveryFactor: number;
  kellyPercent: number;
  riskOfRuin: number;
}

export interface DrawdownPoint {
  date: string;
  equity: number;
  peak: number;
  drawdown: number;
  drawdownPercent: number;
}

export interface MonteCarloResult {
  percentile5: number;
  percentile25: number;
  median: number;
  percentile75: number;
  percentile95: number;
  ruinProbability: number;
  curves: number[][]; // subset of simulated equity curves for charting
}

export function computeAdvancedMetrics(
  trades: MatchedTradeRecord[]
): AdvancedMetrics {
  const closed = trades
    .filter((t) => t.status === "CLOSED")
    .sort((a, b) => a.exitDate.localeCompare(b.exitDate));

  if (closed.length === 0) {
    return {
      expectancy: 0,
      stdDev: 0,
      sharpeRatio: 0,
      maxDrawdown: 0,
      maxDrawdownPercent: 0,
      recoveryFactor: 0,
      kellyPercent: 0,
      riskOfRuin: 0,
    };
  }

  const pnls = closed.map((t) => t.pnl);
  const returns = closed.map((t) => t.pnlPercent / 100);

  // Expectancy (average P&L per trade)
  const expectancy = pnls.reduce((s, v) => s + v, 0) / pnls.length;

  // Standard deviation of returns
  const meanReturn = returns.reduce((s, v) => s + v, 0) / returns.length;
  const variance =
    returns.reduce((s, v) => s + (v - meanReturn) ** 2, 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  // Simplified Sharpe ratio (annualized assuming ~250 trading days)
  const tradesPerYear = Math.min(closed.length, 250);
  const annualizedReturn = meanReturn * tradesPerYear;
  const annualizedStdDev = stdDev * Math.sqrt(tradesPerYear);
  const sharpeRatio =
    annualizedStdDev > 0
      ? (annualizedReturn - RISK_FREE_RATE) / annualizedStdDev
      : 0;

  // Max drawdown
  const drawdownData = computeDrawdownCurve(closed);
  const maxDrawdown = Math.max(...drawdownData.map((d) => d.drawdown), 0);
  const maxDrawdownPercent = Math.max(
    ...drawdownData.map((d) => d.drawdownPercent),
    0
  );

  // Recovery factor
  const totalPnl = pnls.reduce((s, v) => s + v, 0);
  const recoveryFactor = maxDrawdown > 0 ? totalPnl / maxDrawdown : 0;

  // Kelly criterion: f* = W - (1-W)/R
  const winners = closed.filter((t) => t.pnl > 0);
  const losers = closed.filter((t) => t.pnl < 0);
  const winRate = winners.length / closed.length;
  const avgWin =
    winners.length > 0
      ? winners.reduce((s, t) => s + t.pnl, 0) / winners.length
      : 0;
  const avgLoss =
    losers.length > 0
      ? Math.abs(losers.reduce((s, t) => s + t.pnl, 0) / losers.length)
      : 1;
  const rewardRisk = avgLoss > 0 ? avgWin / avgLoss : 0;
  const kellyPercent =
    rewardRisk > 0
      ? Math.max(0, (winRate - (1 - winRate) / rewardRisk) * 100)
      : 0;

  // Risk of ruin (simplified)
  const riskOfRuin =
    winRate > 0 && winRate < 1 && rewardRisk > 0
      ? Math.pow((1 - winRate) / winRate, 10) * 100 // simplified with 10 units
      : winRate === 0
        ? 100
        : 0;

  return {
    expectancy,
    stdDev: stdDev * 100, // as percent
    sharpeRatio,
    maxDrawdown,
    maxDrawdownPercent,
    recoveryFactor,
    kellyPercent: Math.min(kellyPercent, 100),
    riskOfRuin: Math.min(riskOfRuin, 100),
  };
}

export function computeDrawdownCurve(
  trades: MatchedTradeRecord[]
): DrawdownPoint[] {
  const closed = trades
    .filter((t) => t.status === "CLOSED")
    .sort((a, b) => a.exitDate.localeCompare(b.exitDate));

  let equity = 0;
  let peak = 0;
  const points: DrawdownPoint[] = [];

  for (const trade of closed) {
    equity += trade.pnl;
    peak = Math.max(peak, equity);
    const drawdown = peak - equity;
    const drawdownPercent = peak > 0 ? (drawdown / peak) * 100 : 0;

    points.push({
      date: trade.exitDate,
      equity,
      peak,
      drawdown,
      drawdownPercent,
    });
  }

  return points;
}

export function runMonteCarlo(
  trades: MatchedTradeRecord[],
  simulations = 1000,
  tradeCount?: number
): MonteCarloResult {
  const closed = trades.filter((t) => t.status === "CLOSED");
  if (closed.length === 0) {
    return {
      percentile5: 0,
      percentile25: 0,
      median: 0,
      percentile75: 0,
      percentile95: 0,
      ruinProbability: 0,
      curves: [],
    };
  }

  const pnls = closed.map((t) => t.pnl);
  const n = tradeCount ?? pnls.length;
  const finalEquities: number[] = [];
  const sampleCurves: number[][] = [];
  let ruinCount = 0;

  for (let sim = 0; sim < simulations; sim++) {
    let equity = 0;
    let minEquity = 0;
    const curve: number[] = [0];

    for (let i = 0; i < n; i++) {
      const randomPnl = pnls[Math.floor(Math.random() * pnls.length)];
      equity += randomPnl;
      minEquity = Math.min(minEquity, equity);
      if (sim < 20) curve.push(equity); // store only 20 curves for charting
    }

    finalEquities.push(equity);
    if (sim < 20) sampleCurves.push(curve);

    // Ruin = drawdown > 50% of max equity at any point
    const peakEquity = Math.max(...(sim < 20 ? curve : [equity]));
    if (minEquity < -Math.abs(peakEquity) * 0.5 || equity < 0) {
      ruinCount++;
    }
  }

  finalEquities.sort((a, b) => a - b);

  const percentile = (p: number) =>
    finalEquities[Math.floor((p / 100) * finalEquities.length)] ?? 0;

  return {
    percentile5: percentile(5),
    percentile25: percentile(25),
    median: percentile(50),
    percentile75: percentile(75),
    percentile95: percentile(95),
    ruinProbability: (ruinCount / simulations) * 100,
    curves: sampleCurves,
  };
}
