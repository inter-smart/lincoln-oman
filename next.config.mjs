const allowIndexing = process.env.NEXT_PUBLIC_APP_ENV === "production";

const isDev = process.env.NODE_ENV === "development";

// Static CSP (no nonce). Inline script/style are needed for Next's bootstrap scripts and style attributes.
// Google hosts are for reCAPTCHA v3; https: media covers the CMS image/video host.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google.com",
  "frame-src https://www.google.com https://www.recaptcha.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    agentUpgrade: "security",
    optimizePackageImports: ["lucide-react", "radix-ui", "date-fns"],
    // The CMS host answers 508 (resource limit) under parallel requests, so prerender one page at a time.
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 100,
    staticGenerationRetryCount: 2,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // CMS-hosted media, once the API serves absolute image URLs.
    remotePatterns: process.env.NEXT_PUBLIC_MEDIA_URL
      ? [{ protocol: "https", hostname: process.env.NEXT_PUBLIC_MEDIA_URL }]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: allowIndexing
          ? securityHeaders
          : [
              ...securityHeaders,
              { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
            ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
