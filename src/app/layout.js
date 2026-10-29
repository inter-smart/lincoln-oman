import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import FloatingRail from "@/components/layout/common/FloatingRail";
import RevealObserver from "@/components/layout/common/RevealObserver";
import SmoothScroll from "@/components/layout/common/SmoothScroll";
import { siteUrl } from "@/data/seo";
import { site } from "@/data/site";
import { apiGet } from "@/lib/api/get";
import { addressLines } from "@/lib/address-lines";
import { display, sans } from "./fonts";
import "./globals.css";

export const viewport = { themeColor: "#231f20" };

// Dealer details for search engines, from the site settings.
function dealerJsonLd(settings) {
  const [name, ...street] = addressLines(settings.address);
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name,
    brand: { "@type": "Brand", name: "Lincoln" },
    url: siteUrl,
    telephone: settings.phone_number,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: street.join(", "),
      addressLocality: "Muscat",
      addressCountry: "OM",
    },
  };
}

// GET /site-settings -> { address (HTML), email, phone_number, whatsapp_number, map_link, vehicles: [{ id, name, slug, image }] }
// Shown in the header (Vehicles menu), the footer and the JSON-LD below. whatsapp_number and map_link are not used yet.
// No notFound() here: a failed request must not turn every page (and the 404 page) into an error.
// On failure `settings` is null: the header and footer leave the vehicles and these details out. Cached for an hour.
export default async function RootLayout({ children }) {
  const { data: settings } = await apiGet("/site-settings", {
    revalidate: 3600,
  });

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="pb-[49px] font-sans antialiased md:pb-0">
        <a href="#main" className="sr-only z-50 bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Skip to content
        </a>
        {settings && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd(settings)).replace(/</g, "\\u003c") }} />
        )}
        <Header data={site} vehicles={settings?.vehicles} />
        <main id="main">{children}</main>
        <Footer data={site.footer} settings={settings} />
        <FloatingRail phone={settings?.phone_number} email={settings?.email} items={site.rail} />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}