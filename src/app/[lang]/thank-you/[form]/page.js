import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { formKeyOfSlug, thankYouHref, thankYouSlugs } from "@/data/thank-you";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import CertifiedStatement from "@/components/sections/certified/CertifiedStatement";

export function generateStaticParams() {
  return Object.values(thankYouSlugs).map((form) => ({ form }));
}

export async function generateMetadata({ params }) {
  const { form } = await params;
  const key = formKeyOfSlug(form);
  if (!key) notFound();
  const { thankYouForms } = await getCurrentDictionary();
  const copy = thankYouForms[key];
  return buildMetadata(
    {
      title: copy.title,
      description: copy.text,
      robots: { index: false, follow: false },
    },
    thankYouHref(key),
  );
}

export default async function page({ params }) {
  const { form } = await params;
  const key = formKeyOfSlug(form);
  if (!key) notFound();
  const { pages, ui, testDrive, thankYouForms } = await getCurrentDictionary();
  const copy = thankYouForms[key];
  const banner = {
    banner_title: ui.thankYou,
    banner: "/images/test-drive/banner.png",
    banner_alt_text: testDrive.bannerAlt,
  };
  const breadcrumb = [
    { id: "home", label: pages.home, href: "/" },
    ...(key === "testDrive"
      ? [
          {
            id: "test-drive",
            label: pages.bookTestDrive,
            href: "/book-a-test-drive",
          },
        ]
      : []),
    { id: "thank-you", label: ui.thankYou },
  ];
  const statement = {
    id: "thank-you",
    title: copy.title,
    text: copy.text,
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
