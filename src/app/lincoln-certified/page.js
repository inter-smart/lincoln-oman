import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import ContactCta from "@/components/layout/common/ContactCta";
import InnerBanner from "@/components/layout/common/inner-banner";
import PageMeta from "@/components/layout/common/page-meta";
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

export default async function page() {
  const { data, error } = await getCertified();
  if (error || !data) notFound();
  const { certified_cms, banner } = data;
  const { section_one, section_two: tabs, section_three } = certified_cms;

  // The design has no tab for the 14 Days Exchange Promise section (tab_six) — flagged to the client.
  const tabItems = [
    { id: "benefits", label: tabs.tab_one.title },
    { id: "maintenance", label: tabs.tab_two.title },
    { id: "warranty", label: tabs.tab_three.title },
    { id: "inspection", label: tabs.tab_four.title },
    { id: "history", label: tabs.tab_five.title },
    { id: "finance", label: tabs.tab_seven.title },
  ].map((tab) => ({ ...tab, href: `#${tab.id}` }));

  const financeActions = [tabs.tab_seven.button_one, tabs.tab_seven.button_two]
    .filter((button) => button?.title)
    .map((button) => ({
      id: button.title,
      label: button.title,
      href: button.link,
    }));

  return (
    <>
      <PageMeta html={banner.other_meta_tags} />
      <InnerBanner
        data={{
          title: banner.banner_title,
          media: {
            url: banner.banner,
            alternativeText: banner.banner_alt_text,
          },
        }}
      />
      <Breadcrumb items={breadcrumb} />
      <CertifiedIntro data={section_one} />
      <div>
        <SectionTabs items={tabItems} label="Lincoln Certified sections" />
        <CertifiedBenefits data={tabs.tab_one} />
        <CertifiedBand id="maintenance" data={tabs.tab_two} />
        <CertifiedStatement id="warranty" data={tabs.tab_three} measure={790} />
        {divider}
        <CertifiedInspection id="inspection" data={tabs.tab_four} />
        {divider}
        <CertifiedStatement id="history" data={tabs.tab_five} measure={620} />
        <CertifiedBand data={tabs.tab_six} emblem imageRatio="aspect-762/242" />
        <CertifiedStatement
          id="finance"
          data={{ ...tabs.tab_seven, actions: financeActions }}
          measure={620}
        />
      </div>
      <ContactCta data={section_three} />
    </>
  );
}
