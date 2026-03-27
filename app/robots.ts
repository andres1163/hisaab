import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://hisaab.trymetis.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
