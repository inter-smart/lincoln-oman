import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OwnersContent from "@/components/sections/owners/OwnersContent";
import { owners } from "@/data/owners";

export const metadata = {
  title: "Owners",
  description:
    "Lincoln owner services in Oman: aftersales and service centre, genuine parts, vehicle maintenance, Lincoln Protect, Quick Lane and Lincoln Road Assist.",
  alternates: { canonical: "/owners" },
};

export default function page() {
  return (
    <>
      <InnerBanner data={owners.banner} />
      <Breadcrumb items={owners.breadcrumb} />
      <OwnersContent sections={owners.sections} navLabel={owners.navLabel} />
      <EnquiryForm data={owners.enquiry} />
    </>
  );
}
