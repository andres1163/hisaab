import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/layout/bottom-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const SITE_URL = "https://hisaab.trymetis.app";
const SITE_TITLE = "Hisaab | Trading Journal for Indian Traders";
const SITE_DESCRIPTION =
  "Upload your broker CSV, see your real win rate in 2 minutes. Zero signup, 100% browser-based, open source.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Hisaab",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "trading journal",
    "Indian traders",
    "Zerodha",
    "Groww",
    "Upstox",
    "Angel One",
    "stock trading",
    "win rate",
    "P&L tracker",
    "trade analytics",
    "portfolio tracker",
    "NSE",
    "BSE",
    "open source",
  ],
  authors: [{ name: "Devansh Tiwari", url: "https://github.com/Devansh-365" }],
  creator: "Devansh Tiwari",
  publisher: "Hisaab",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Hisaab",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hisaab",
  },
  category: "finance",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2483ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          {children}
          <BottomNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
