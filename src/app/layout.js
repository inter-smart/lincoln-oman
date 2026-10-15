import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import FloatingRail from "@/components/layout/common/FloatingRail";
import RevealObserver from "@/components/layout/common/RevealObserver";
import { allowIndexing, siteUrl } from "@/data/seo";
import { site } from "@/data/site";
import { display, sans } from "./fonts";
import "./globals.css";

const title = "Lincoln Oman — Arabian Car Marketing";
const description =
  "Explore the Lincoln line-up — Navigator, Aviator, Corsair and Nautilus — with ownership, offers and news from Arabian Car Marketing, Muscat.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Lincoln Oman" },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Lincoln Oman", locale: "en_OM", url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: allowIndexing
    ? undefined
    : { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noarchive: true } },
};

export const viewport = { themeColor: "#231f20" };

// Dealer details for search engines, from the footer content.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: site.footer.address.lines[0],
  brand: { "@type": "Brand", name: "Lincoln" },
  url: siteUrl,
  telephone: site.footer.phone,
  email: site.footer.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.footer.address.lines[1],
    addressLocality: "Muscat",
    addressCountry: "OM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="pb-[49px] font-sans antialiased md:pb-0">
        <a href="#main" className="sr-only z-50 bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Header data={site} />
        <main id="main">{children}</main>
        <Footer data={site.footer} />
        <FloatingRail items={site.rail} />
        <RevealObserver />
      </body>
    </html>
  );
}
