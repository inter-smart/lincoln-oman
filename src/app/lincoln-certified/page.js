import { certified } from "@/data/certified";
import ContactCta from "@/components/layout/common/ContactCta";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import SectionTabs from "@/components/layout/common/SectionTabs";
import InnerBanner from "@/components/layout/common/inner-banner";
import CertifiedBand from "@/components/sections/certified/CertifiedBand";
import CertifiedIntro from "@/components/sections/certified/CertifiedIntro";
import CertifiedBenefits from "@/components/sections/certified/CertifiedBenefits";
import CertifiedStatement from "@/components/sections/certified/CertifiedStatement";
import CertifiedInspection from "@/components/sections/certified/CertifiedInspection";

export const metadata = {
  title: "Lincoln Certified",
  description:
    "Lincoln Certified pre-owned vehicles in Oman: 200 point inspection, comprehensive warranty, 2 year premium maintenance and a 14 day exchange promise.",
  alternates: { canonical: "/lincoln-certified" },
};

const divider = (
  <div className="container" aria-hidden>
    <hr className="border-black/10" />
  </div>
);

export default function page() {
  return (
    <>
      <InnerBanner data={certified.banner} />
      <Breadcrumb items={certified.breadcrumb} />
      <CertifiedIntro data={certified.intro} />
      <div>
        <SectionTabs
          items={certified.tabs}
          label="Lincoln Certified sections"
        />
        <CertifiedBenefits data={certified.benefits} />
        <CertifiedBand data={certified.maintenance} />
        <CertifiedStatement data={certified.warranty} measure={790} />
        {divider}
        <CertifiedInspection data={certified.inspection} />
        {divider}
        <CertifiedStatement data={certified.history} measure={620} />
        <CertifiedBand
          emblem
          data={certified.exchange}
          imageRatio="aspect-762/242"
        />
        <CertifiedStatement data={certified.finance} measure={620} />
      </div>
      <ContactCta data={certified.cta} />
    </>
  );
}
