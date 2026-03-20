<p align="center">
  <a href="https://hisaab.trymetis.app">
    <h1 align="center">Hisaab</h1>
  </a>
</p>

<p align="center">
  <strong>Your trades. Your data. Your edge.</strong>
</p>

<p align="center">
  A zero-friction trading journal for Indian traders.<br />
  Upload your broker CSV. See your real win rate in 2 minutes.<br />
  No signup. No server. No data leaves your browser.
</p>

<p align="center">
  <a href="https://github.com/Devansh-365/hisaab/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Devansh-365/hisaab/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>
  <a href="https://github.com/Devansh-365/hisaab/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Devansh-365/hisaab?style=social" /></a>
  <a href="CONTRIBUTING.md"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>
</p>

<p align="center">
  <a href="https://hisaab.trymetis.app/demo"><strong>Live Demo</strong></a> &nbsp;·&nbsp;
  <a href="#-get-started"><strong>Get Started</strong></a> &nbsp;·&nbsp;
  <a href="CONTRIBUTING.md"><strong>Contributing</strong></a> &nbsp;·&nbsp;
  <a href="#-roadmap"><strong>Roadmap</strong></a>
</p>

<br />

<!-- HERO SCREENSHOT -->
<!-- Replace with an actual screenshot of the dashboard for maximum impact -->
<!-- <p align="center">
  <a href="https://hisaab.trymetis.app">
    <img src="public/screenshot.png" alt="Hisaab Dashboard" width="100%" />
  </a>
</p> -->

## Why

91% of F&O traders lost money last year. The #1 differentiator between profitable and losing traders is **journaling**, yet almost no one does it.

The reason isn't motivation. It's **friction**.

Hisaab removes the friction entirely.

```
1. Export your tradebook from Zerodha or Groww
2. Drop the file on hisaab.trymetis.app
3. See your P&L, win rate, and patterns -- instantly.
```

That's it. No account. No setup. Everything runs in your browser and stays on your device.

<br />

## Features

<table>
<tr>
<td width="50%" valign="top">

### Analytics & Insights

- **Instant P&L** -- Net profit, win rate, profit factor
- **FIFO Matching** -- Auto buy/sell matching with partial fills
- **Visual Analytics** -- Equity curve, monthly P&L, drawdown chart
- **Calendar Heatmap** -- Daily P&L grid across the financial year
- **Advanced Metrics** -- Sharpe ratio, Monte Carlo, Kelly criterion

</td>
<td width="50%" valign="top">

### Journal & Reports

- **Trade Journal** -- Notes, strategy tags, emotion tracking, ratings
- **Tax Reports** -- STCG/LTCG classification, ITR-ready CSV export
- **Multi-Broker** -- Zerodha, Kite, Groww, Upstox, Angel One
- **100% Private** -- IndexedDB storage, zero network requests
- **PWA** -- Installable, works offline after first load

</td>
</tr>
</table>

<br />

## Tech Stack

<table>
<tr>
  <td align="center" width="96">
    <img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
    <br /><sub><b>Next.js</b></sub>
  </td>
  <td align="center" width="96">
    <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
    <br /><sub><b>TypeScript</b></sub>
  </td>
  <td align="center" width="96">
    <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind CSS" />
    <br /><sub><b>Tailwind CSS</b></sub>
  </td>
  <td align="center" width="96">
    <img src="https://ui.shadcn.com/favicon.ico" width="48" height="48" alt="shadcn/ui" />
    <br /><sub><b>shadcn/ui</b></sub>
  </td>
  <td align="center" width="96">
    <img src="https://raw.githubusercontent.com/nicolo-ribaudo/dexie-website-proxy/main/assets/images/dexie-icon.svg" width="48" height="48" alt="Dexie.js" />
    <br /><sub><b>Dexie.js</b></sub>
  </td>
  <td align="center" width="96">
    <img src="https://recharts.org/favicon.ico" width="48" height="48" alt="Recharts" />
    <br /><sub><b>Recharts</b></sub>
  </td>
</tr>
</table>

> Static export. No backend. Deployable anywhere.

<br />

## Get Started

```bash
git clone https://github.com/Devansh-365/hisaab.git
cd hisaab
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) and drop a sample CSV from `public/demo-data/` to test.

<br />

## Philosophy

| Principle | What it means |
|---|---|
| **Zero friction** | Upload CSV, see dashboard. Nothing else required. |
| **Privacy first** | Your financial data never leaves your device. |
| **India native** | INR formatting, Indian brokers, FY awareness, tax-ready. |
| **Open source** | MIT licensed. Read every line. Self-host if you want. |

<br />

## Roadmap

- [x] CSV upload + instant P&L dashboard
- [x] FIFO trade matching with partial fills
- [x] Zerodha, Kite, Groww, Upstox, Angel One parsers
- [x] Trade journal with notes, tags, ratings
- [x] Calendar heatmap with FY view
- [x] Advanced analytics (Sharpe, drawdown, Monte Carlo, Kelly)
- [x] Tax report generation (STCG/LTCG with exemption)
- [x] PWA with offline support
- [ ] AI behavioral nudges (client-side pattern detection)
- [ ] Shareable stats card for social media
- [ ] Dark mode

<br />

## Contributing

**Broker parsers are the highest-impact contribution** -- every new parser unlocks thousands of users.

<table>
<tr>
<td>

**Read the docs:**

- [Contributing Guide](CONTRIBUTING.md) -- setup, project structure, parser template, house rules
- [Code of Conduct](CODE_OF_CONDUCT.md) -- Contributor Covenant v2.1
- [Security Policy](SECURITY.md) -- vulnerability reporting and architecture scope

</td>
<td>

**Quick links:**

- [Open a broker support request](https://github.com/Devansh-365/hisaab/issues/new?template=broker_support.yml)
- [Browse `good first issue`](https://github.com/Devansh-365/hisaab/labels/good%20first%20issue)
- [View open issues](https://github.com/Devansh-365/hisaab/issues)

</td>
</tr>
</table>

<br />

## Contributors

<a href="https://github.com/Devansh-365/hisaab/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Devansh-365/hisaab" />
</a>

<br />

## Star History

<a href="https://star-history.com/#Devansh-365/hisaab&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Devansh-365/hisaab&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Devansh-365/hisaab&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Devansh-365/hisaab&type=Date" width="100%" />
  </picture>
</a>

<br />

## License

MIT -- see [LICENSE](LICENSE) for details.

<br />

<div align="center">

<sub>Built by <a href="https://github.com/Devansh-365">Devansh Tiwari</a> &nbsp;·&nbsp; Get AI-powered stock analysis at <a href="https://trymetis.app?utm_source=hisaab&utm_medium=readme&utm_content=footer">Metis</a></sub>

</div>
