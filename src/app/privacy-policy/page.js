import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import LegalContent from "@/components/sections/legal/LegalContent";
import { privacy } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy",
  description: "How Lincoln Oman collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function page() {
  return (
    <>
      <InnerBanner data={privacy.banner} />
      <Breadcrumb items={privacy.breadcrumb} />
      <LegalContent data={privacy} />
    </>
  );
}
