# Hisaab to Metis Funnel Strategy

**Date:** 2026-03-20
**Status:** Draft
**Goal:** Convert Hisaab users into trymetis.app signups at 5-10% CTR

---

## The Core Insight

Hisaab shows traders their **problems**. Metis offers the **solution**.

```
Hisaab: "Your win rate is 43%. You hold losers 3x longer than winners."
                            |
                            v
Metis:  "Get AI-powered analysis on RELIANCE before your next trade."
```

The upgrade moment must feel like a natural next step, not a sales pitch.

## How the Best Companies Do This

### TradingView (the gold standard for trading tool funnels)

TradingView gives away genuinely useful charting for free, then limits at the exact friction points that power users hit naturally:
- Free: 1 chart, 2 indicators, ads
- The moment you try to add a 3rd indicator or split-screen: upgrade prompt
- 30-day free trial lets you taste the full product before paying

**Lesson for us:** Don't gate core features. Gate the *scale* and *depth* that serious traders need.

### Plausible Analytics (OS to paid, $1M+ ARR)

- Fully open source, free to self-host
- Revenue comes 100% from managed cloud hosting
- Self-hosted users become evangelists who drive cloud signups
- No artificial feature gating

**Lesson for us:** Hisaab users who love it will talk about it. Every share card, every Reddit post, every screenshot is a Metis impression.

### Slack/Zapier (contextual upgrade prompts)

- Show the upgrade prompt *exactly when the user tries to do something that requires paid*
- User is already motivated at that moment
- Zero ambiguity, single button, no guilt

**Lesson for us:** Show the Metis CTA at insight moments, not on every page load.

---

## The Hisaab to Metis Funnel

### Stage 1: Discovery (Hisaab gets found)

**Channels:**
- GitHub trending (target 100+ stars in month 1)
- r/IndianStreetBets, r/IndianStockMarket
- Indian FinTwit (finance Twitter/X)
- Product Hunt launch
- Hacker News "Show HN"
- WhatsApp/Telegram trading groups (shareable stats cards)

**What hooks them:** "See your real win rate in 2 minutes. No signup."

### Stage 2: Value Delivery (Hisaab proves itself)

The user uploads their CSV and sees their dashboard. This is the "aha moment." They now know:
- Their actual win rate (usually worse than they thought)
- Their profit factor
- Their best and worst trades
- Their behavioral patterns (day-of-week, holding period, tilt)

**Key metric:** Time from first visit to dashboard = under 2 minutes.

### Stage 3: Problem Awareness (Hisaab surfaces patterns)

This is where the funnel gets interesting. Hisaab doesn't just show data. It surfaces *painful truths*:

- "You hold losers 3x longer than winners"
- "Your win rate drops 20% on expiry days"
- "FOMO-tagged trades lose 2x more than disciplined ones"
- "Your Sharpe ratio is 0.3 (below breakeven)"

The user now *feels* the problem. They want to fix it.

### Stage 4: Bridge (Contextual Metis CTAs)

**This is the critical moment.** The CTA must appear:
- At the right time (after a painful insight)
- In the right context (related to the specific problem)
- With the right message (solution-oriented, not salesy)

---

## Concrete CTA Placements

### 1. Insight Cards (Phase 4 AI Nudges)

When Hisaab detects a behavioral pattern, show it as a card with an optional Metis CTA:

```
┌─────────────────────────────────────────────────┐
│  You hold losing trades 3.2x longer than        │
│  winning ones. This disposition effect cost      │
│  you ~₹47,000 this FY.                          │
│                                                   │
│  Want AI-powered entry/exit signals              │
│  to improve your timing?                         │
│                                                   │
│  [Try Metis Free →]                    [Dismiss] │
└─────────────────────────────────────────────────┘
```

**Rules:**
- Max 1 Metis CTA per session
- Only after the user has seen their dashboard (never on first visit)
- Dismissable, and stays dismissed for 7 days
- Only on insight cards, never on basic KPIs

### 2. Share Card Watermark

When users generate a shareable stats card (Phase 3):

```
┌──────────────────────────────┐
│  My Trading Stats FY2025-26  │
│                              │
│  Win Rate: 56%               │
│  Net P&L: +₹3,54,801        │
│  Profit Factor: 2.22         │
│  87 trades                   │
│                              │
│  ─────────────────────────── │
│  hisaab.dev | Powered by     │
│  trymetis.app                │
└──────────────────────────────┘
```

This is passive marketing. Every shared card = free Metis impression in trading communities.

### 3. Analytics Page Footer

After the advanced analytics section (Sharpe, drawdown, Monte Carlo):

```
┌─────────────────────────────────────────────────┐
│  Hisaab shows you what happened.                │
│  Metis helps you decide what to do next.        │
│                                                   │
│  AI-powered stock analysis for Indian traders.   │
│  [Explore Metis →]                               │
└─────────────────────────────────────────────────┘
```

Subtle, informational, at the bottom of analytics. Not blocking anything.

### 4. Export Watermark

CSV and PDF exports include a footer line:

```
Generated by Hisaab (hisaab.dev) | AI analysis at trymetis.app
```

### 5. README Badge

In the GitHub README, a single line:

```
Get AI-powered stock analysis at [trymetis.app](https://trymetis.app)
```

### 6. Empty State on First Visit

When user lands on Hisaab with no data, show trust signals:

```
Part of the Metis ecosystem.
Open source. Privacy first.
```

Small, non-intrusive. Builds brand recognition.

---

## What NOT to Do

Based on research, these kill OS-to-paid conversion:

1. **No popups or modals** pushing Metis (ever)
2. **No feature gating** in Hisaab that requires Metis
3. **No nagging banners** on every page
4. **No "upgrade to unlock"** patterns (Hisaab is fully free)
5. **No data collection** without consent (Hisaab is browser-only)
6. **No broken-feeling free version** (Hisaab must be excellent standalone)

---

## Tracking & Metrics

Since Hisaab is fully client-side with no analytics backend, tracking is limited. But we can measure:

### On Hisaab (client-side, privacy-respecting)
- CTA click events (link clicks to trymetis.app, measurable via UTM params)
- Share card generation count (local counter)

### On Metis (server-side)
- Signups with `utm_source=hisaab`
- Which CTA drove the signup (`utm_content=insight-card|share-card|analytics-footer|readme`)
- Conversion rate: Metis signups from Hisaab / total Hisaab CTA clicks

### Target Metrics
- 10% of Hisaab users see a Metis CTA (they've used it enough to reach insights)
- 5-10% of those click through to trymetis.app
- 3-5% of click-throughs sign up for Metis
- Net: ~0.15-0.5% of Hisaab users become Metis users

At 10,000 Hisaab monthly users, that's 15-50 Metis signups/month from organic funnel alone.

---

## Implementation Priority

| CTA | Phase | Effort | Impact |
|-----|-------|--------|--------|
| README badge + "Powered by Metis" | Now | 1 hour | Medium (always visible) |
| Share card watermark | Phase 3 | Low | High (viral, WhatsApp) |
| Export footer line | Phase 3 | Low | Low (CAs see it) |
| Analytics page footer | Phase 3 | Low | Medium |
| AI insight cards with CTA | Phase 4 | Medium | Highest (contextual) |
| Empty state trust signal | Now | Low | Low |

### Start with the non-intrusive stuff now, save contextual CTAs for Phase 4.

The share card watermark is probably the highest ROI item because:
1. It costs nothing to implement
2. It reaches people outside Hisaab (WhatsApp, Twitter, Reddit)
3. It targets traders who are already interested in trading tools
4. It's completely non-intrusive (it's on *their* share card, not blocking their workflow)

---

## The Positioning Split

```
Hisaab                          Metis
───────                         ─────
"What happened?"                "What should I do next?"
Post-trade analysis             Pre-trade AI analysis
Backward-looking                Forward-looking
Free, open source               Paid, cloud-hosted
Browser-only, no auth           Full auth + persistence
Your data stays local           Cloud-synced across devices
You analyze yourself            AI analyzes for you
```

This split is clean because there's zero overlap. Hisaab never tries to be Metis. Metis never replaces Hisaab. They serve different moments in the trading workflow.

A trader who uses Hisaab to review last month's trades and discovers their win rate drops on Mondays is the *perfect* Metis prospect. They now know the problem. Metis is the solution.
