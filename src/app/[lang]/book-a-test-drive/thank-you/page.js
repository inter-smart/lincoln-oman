import { buildMetadata } from "@/lib/seo";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import CertifiedStatement from "@/components/sections/certified/CertifiedStatement";

export async function generateMetadata() {
  const { ui } = await getCurrentDictionary();
  return buildMetadata(
    {
      title: ui.thankYou,
      description: ui.thankYouTitle,
      robots: { index: false, follow: false },
    },
    "/book-a-test-drive/thank-you",
  );
}

export default async function page() {
  const { pages, ui, testDrive } = await getCurrentDictionary();
  const banner = {
    banner_title: ui.thankYou,
    banner: "/images/test-drive/banner.png",
    banner_alt_text: testDrive.bannerAlt,
  };
  const breadcrumb = [
    { id: "home", label: pages.home, href: "/" },
    {
      id: "test-drive",
      label: pages.bookTestDrive,
      href: "/book-a-test-drive",
    },
    { id: "thank-you", label: ui.thankYou },
  ];
  const statement = {
    id: "thank-you",
    title: ui.thankYouTitle,
    text: ui.thankYouText,
    actions: [
      { id: "home", label: ui.backToHome, href: "/" },
      {
        id: "vehicles",
        label: ui.exploreVehicles,
        href: "/vehicles/navigator",
      },
    ],
  };

  return (
    <>
      <InnerBanner data={banner} />
      <Breadcrumb items={breadcrumb} />
      <CertifiedStatement data={statement} measure={640} />
    </>
  );
}
