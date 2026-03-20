import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

export default withSerwist({
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {},
});
