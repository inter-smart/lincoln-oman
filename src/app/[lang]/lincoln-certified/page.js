import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { ensureData } from "@/lib/api/ensure";
import { buildMetadata } from "@/lib/seo";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import ContactCta from "@/components/layout/common/ContactCta";
import SectionTabs from "@/components/layout/common/SectionTabs";
import InnerBanner from "@/components/layout/common/inner-banner";
import CertifiedBand from "@/components/sections/certified/CertifiedBand";
import CertifiedIntro from "@/components/sections/certified/CertifiedIntro";
import CertifiedBenefits from "@/components/sections/certified/CertifiedBenefits";
import CertifiedStatement from "@/components/sections/certified/CertifiedStatement";
import CertifiedInspection from "@/components/sections/certified/CertifiedInspection";

const getCertified = cache(() => apiGet("/certified"));

export async function generateMetadata() {
  const data = ensureData(await getCertified());
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

const divider = (
  <div className="container" aria-hidden>
    <hr className="border-black/10" />
  </div>
);

const hasTitle = (section) => Boolean(section?.title?.trim());

export default async function page() {
  const { pages, ui } = await getCurrentDictionary();
  const breadcrumb = [
    { id: "home", label: pages.home, href: "/" },
    { id: "certified", label: ui.lincolnCertified },
  ];
  const data = ensureData(await getCertified());
  const { banner, certified_cms } = data;

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
          <SectionTabs items={tabs} label={ui.certifiedSections} />
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
