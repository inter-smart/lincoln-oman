import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import LegalContent from "@/components/sections/legal/LegalContent";
import { terms } from "@/data/legal";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Lincoln Oman website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function page() {
  return (
    <>
      <InnerBanner data={terms.banner} />
      <Breadcrumb items={terms.breadcrumb} />
      <LegalContent data={terms} />
    </>
  );
}
