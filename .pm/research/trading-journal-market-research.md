# Trading Journal for Indian Traders — Market Research

**Date:** March 2026
**Status:** Research complete
**Product Reference:** [Khaata](https://khaata.pranaygupta.in/) — existing free trading journal

---

## The Problem

- **91% of F&O traders lost money in FY25** (SEBI data)
- Aggregate losses: **₹1.05 lakh crore** in FY25 (up 41% YoY)
- Average loss per trader: **₹1.1 lakh/year**
- Journaling is the #1 differentiator between profitable and losing traders
- Yet **<1% of Indian traders** maintain any formal trade journal
- Reason: **friction** — manual data entry kills discipline

---

## Market Size

| Metric | Number | Source |
|--------|--------|--------|
| Demat accounts (Dec 2025) | **216 million** | NSE |
| Unique investors | **136 million** | SEBI |
| Active F&O traders | **~11 million** | SEBI |
| Groww active users | **12.6 million** | Entrackr |
| Zerodha active users | **7.2 million** | Startuppedia |
| New demat accounts/month | **~2.6 million** | Angel One |
| Growth (2020→2025) | **5x** (4 Cr → 21.6 Cr) | NSE |

### Demographics
- **40%+ of F&O traders are under 30**
- **75% of F&O traders earn less than ₹5 lakh/year**
- **60%+ of new accounts** from Tier 2/3 cities
- **85% of Indian internet traffic** is mobile

---

## Competitive Landscape

### India-Focused Tools

| Tool | Pricing | Broker Integration | Users | Weakness |
|------|---------|-------------------|-------|----------|
| **TradesViz** | Free / $19-29/mo (USD) | Zerodha, Upstox | 50K+ | USD pricing, no AI |
| **JournalPlus** | ₹6,599 lifetime | Indian brokers | Unknown | Early stage |
| **SyncTrade** | Free (beta) | Indian brokers | ~1K | Very early |
| **Stolo** | ₹599/mo | Options only | Unknown | Options-only |
| **StockCal** | Free (Android) | None | 49K downloads | No broker sync |
| **Zerodha Console** | Free (built-in) | Zerodha only | Millions | No win rate, no equity curve, no strategy analysis |

### Global Tools (None Support Indian Brokers)

| Tool | Pricing | Indian Support |
|------|---------|----------------|
| TraderSync | $30-80/mo | None |
| TradeZella | $29-49/mo | None |
| Edgewonk | $197/yr | None |
| Tradervue | $29-49/mo | None |

### What Most Traders Actually Use
Google Sheets / Excel / Notion templates — manual entry, no automation, no analytics.

**No India-focused trading journal has ever launched on ProductHunt.**

---

## Willingness to Pay

**Extreme price sensitivity.** 75% of F&O traders earn <₹5L/year.

| Indian Tool | Monthly Price |
|-------------|--------------|
| Tickertape Pro | ₹118 |
| StockEdge | ₹399-499 |
| Chartink Premium | ₹780 |

Sweet spot for paid tier: **₹199-399/month**

---

## Mobile vs Web — Platform Decision

### The Data

| Metric | Mobile | Desktop/Web |
|--------|--------|-------------|
| India web traffic share | **77-82%** | 18-23% |
| NSE cash turnover via mobile | **20.7%** | Rest |
| NSE options turnover via mobile | **23.7%** | — |
| Mobile trading CAGR (decade) | **66%** | — |
| Fintech app session duration | **~5-6 min** | Longer |
| Active traders with mobile app | **~75-100%** | Most also use web |

### Behavioral Split

| Activity | Platform | Why |
|----------|----------|-----|
| Log trade after exit | **Mobile** | Capture emotion + reasoning immediately |
| Tag trade with strategy | **Mobile** | Quick tap while memory fresh |
| Check daily P&L | **Mobile** | Quick glance |
| Deep trade review | **Desktop** | Multi-chart, notes, patterns |
| Strategy analytics | **Desktop** | Tables, charts, comparisons |
| Monte Carlo / equity curve | **Desktop** | Complex visualizations |
| Upload chart screenshots | **Mobile** | Screenshot → attach |

### Recommendation: **PWA (Next.js) — Web-First, Mobile-Optimized**

**Why NOT native app:**
- App Store discovery is broken, no Indian journal has broken through
- Deep analysis needs screen space
- 3x development cost (iOS + Android + web)
- App Store review slows iteration

**Why NOT desktop-only:**
- 77% of Indian traffic is mobile
- Trade logging must happen immediately
- P&L checking is a mobile behavior
- Tier 2/3 traders are mobile-only

**Why PWA wins:**
- One codebase (Next.js)
- Installable on phone home screen
- Works offline (service worker)
- Push notifications
- No App Store fees
- SEO-indexable
- Instant deploys

---

## Recommended Funnel

```
SEO / Social / Word of Mouth
  │
  ▼
[Landing Page] — "See your real win rate in 2 minutes"
  │
  ▼
[Upload Broker CSV] — No signup, instant gratification
  │                   (Zerodha/Groww/INDmoney/Motilal)
  │
  ▼
[Instant P&L Dashboard] — AHA moment: "You won only 43% of trades"
  │
  ▼
[Sign up to save] — Now they WANT an account
  │
  ▼
[Free tier] — Basic journal + P&L, build daily habit
  │
  ▼
[Premium ₹199-399/mo] — Advanced analytics, AI insights,
                         Monte Carlo, strategy optimizer
```

---

## Demand Verdict

| Signal | Score |
|--------|-------|
| Problem severity | **10/10** — 91% losing, journaling proven to help |
| Market size | **10/10** — 11M F&O traders, 136M investors |
| Competition | **Low** — no dominant India-first solution |
| Willingness to pay | **3/10** — extremely price-sensitive |
| Mobile-first requirement | **Critical** — 85% mobile |
| Regulatory tailwind | **Strong** — SEBI pushing trader protection |

**The demand is real and massive. The challenge is monetization, not demand.**

---

## Sources

- SEBI F&O trader study FY25: moneylife.in
- NSE demat accounts Dec 2025: vmpl.scnwire.com
- NSE route-wise turnover: in.investing.com
- Groww vs Zerodha users: entrackr.com, startuppedia.in
- India mobile traffic: similarweb.com
- Fintech adoption 87%: PIB India
- TradesViz: tradesviz.com
- Mobile vs desktop trading behavior: Quora, TradingQnA, CyberTradingUniversity
