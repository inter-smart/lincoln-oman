import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import ContactCta from "@/components/layout/common/ContactCta";
import InnerBanner from "@/components/layout/common/inner-banner";
import MetaTags from "@/components/layout/common/MetaTags";
import SectionTabs from "@/components/layout/common/SectionTabs";
import CertifiedBand from "@/components/sections/certified/CertifiedBand";
import CertifiedBenefits from "@/components/sections/certified/CertifiedBenefits";
import CertifiedInspection from "@/components/sections/certified/CertifiedInspection";
import CertifiedIntro from "@/components/sections/certified/CertifiedIntro";
import CertifiedStatement from "@/components/sections/certified/CertifiedStatement";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /certified -> { certified_cms: { section_one, section_two: { tab_one … tab_seven }, section_three }, banner }
// cache() lets generateMetadata and the page share one request.
const getCertified = cache(() => apiGet("/certified"));

export async function generateMetadata() {
  const { data, error } = await getCertified();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/lincoln-certified",
  );
}

const breadcrumb = [
  { id: "home", label: "Home", href: "/" },
  { id: "certified", label: "Lincoln Certified" },
];

const divider = (
  <div className="container" aria-hidden>
    <hr className="border-black/10" />
  </div>
);

// A section (and its tab) is shown only when the CMS gave it a title.
const hasTitle = (section) => Boolean(section?.title?.trim());

export default async function page() {
  const { data, error } = await getCertified();
  if (error || !data) notFound();
  const { banner, certified_cms } = data;

  // Give the CMS fields the names the page uses.
  const { section_one: intro, section_three: cta } = certified_cms;
  const {
    tab_one: benefits,
    tab_two: maintenance,
    tab_three: warranty,
    tab_four: inspection,
    tab_five: history,
    tab_six: exchange,
    tab_seven: finance,
  } = certified_cms.section_two;

  // Tab bar: one tab per section, in page order. Each key is also the section's anchor id.
  const tabs = Object.entries({
    benefits,
    maintenance,
    warranty,
    inspection,
    history,
    exchange,
    finance,
  })
    .filter(([, section]) => hasTitle(section))
    .map(([id, section]) => ({ id, label: section.title, href: `#${id}` }));

  const financeButtons = [finance?.button_one, finance?.button_two]
    .filter((button) => button?.title)
    .map((button) => ({
      id: button.title,
      label: button.title,
      href: button.link,
    }));

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <InnerBanner data={banner} />
      <Breadcrumb items={breadcrumb} />

      {hasTitle(intro) && <CertifiedIntro data={intro} />}

      <div>
        {tabs.length > 0 && (
          <SectionTabs items={tabs} label="Lincoln Certified sections" />
        )}
        {hasTitle(benefits) && <CertifiedBenefits data={benefits} />}
        {hasTitle(maintenance) && (
          <CertifiedBand id="maintenance" data={maintenance} />
        )}
        {hasTitle(warranty) && (
          <CertifiedStatement id="warranty" data={warranty} measure={790} />
        )}
        {hasTitle(inspection) && (
          <>
            {divider}
            <CertifiedInspection id="inspection" data={inspection} />
          </>
        )}
        {hasTitle(history) && (
          <>
            {divider}
            <CertifiedStatement id="history" data={history} measure={620} />
          </>
        )}
        {hasTitle(exchange) && (
          <CertifiedBand
            id="exchange"
            data={exchange}
            emblem
            imageRatio="aspect-762/242"
          />
        )}
        {hasTitle(finance) && (
          <CertifiedStatement
            id="finance"
            data={{ ...finance, actions: financeButtons }}
            measure={620}
          />
        )}
      </div>

      {hasTitle(cta) && <ContactCta data={cta} />}
    </>
  );
}
