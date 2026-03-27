const SITE_URL = "https://hisaab.trymetis.app";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hisaab",
  url: SITE_URL,
  description:
    "A zero-friction trading journal for Indian traders. Upload your broker CSV, see your real win rate in 2 minutes. No signup, no server, no data leaves your browser.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  featureList: [
    "Zerodha CSV import",
    "Groww CSV import",
    "Upstox CSV import",
    "Angel One CSV import",
    "Win rate analysis",
    "P&L calendar",
    "Trade journal",
    "100% browser-based",
    "Open source",
  ],
  creator: {
    "@type": "Person",
    name: "Devansh Tiwari",
    url: "https://github.com/Devansh-365",
  },
  license: "https://opensource.org/licenses/MIT",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
