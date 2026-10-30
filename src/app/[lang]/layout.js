import "../globals.css";
import { Suspense } from "react";
import { siteUrl } from "@/data/seo";
import { getSite } from "@/data/site";
import { apiGet } from "@/lib/api/get";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { arabic, display, sans } from "../fonts";
import { addressLines } from "@/lib/address-lines";
import { getDictionary } from "@/i18n/get-dictionary";
import { dirOf, hasLocale, locales } from "@/i18n/config";
import I18nProvider from "@/components/layout/common/I18nProvider";
import FloatingRail from "@/components/layout/common/FloatingRail";
import SmoothScroll from "@/components/layout/common/SmoothScroll";
import RevealObserver from "@/components/layout/common/RevealObserver";
import NavigationProgress from "@/components/layout/common/NavigationProgress";

export const viewport = { themeColor: "#231f20" };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

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

export default async function RootLayout({ children }) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const site = getSite(dict);

  const { data: settings } = await apiGet("/site-settings", {
    revalidate: 3600,
  });

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={
        locale === "ar"
          ? arabic.variable
          : `${display.variable} ${sans.variable}`
      }
    >
      <body className="pb-[49px] font-sans antialiased md:pb-0">
        <a
          href="#main"
          className="sr-only z-50 bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:start-2 focus:top-2"
        >
          {dict.common.skipToContent}
        </a>
        {settings && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(dealerJsonLd(settings)).replace(
                /</g,
                "\\u003c",
              ),
            }}
          />
        )}
        <I18nProvider
          dir={dirOf(locale)}
          labels={{ ...dict.common, ...dict.ui, validation: dict.validation }}
        >
          <Header data={site} vehicles={settings?.vehicles} />
          <main id="main">{children}</main>
          <Footer data={site.footer} settings={settings} labels={site.labels} />
          <FloatingRail
            phone={settings?.phone_number}
            email={settings?.email}
            items={site.rail}
          />
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <RevealObserver />
          <SmoothScroll />
        </I18nProvider>
      </body>
    </html>
  );
}
