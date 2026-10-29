import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";
import { testDrive } from "@/data/test-drive";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { withVehicleOptions } from "@/lib/vehicle-options";

// GET /test-drive -> { cms: { title, sub_title, description, enquiry_title, enquiry_description }, banner, vehicle_models: [{ id, name }] }
// `banner` is null until the CMS adds one for this page: banner and meta then fall back to src/data/test-drive.js.
// cache() lets generateMetadata and the page share one request.
const getTestDrive = cache(() => apiGet("/test-drive"));

export async function generateMetadata() {
  const { data, error } = await getTestDrive();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner?.meta_title ?? testDrive.fallback.meta.title,
      description:
        banner?.meta_description ?? testDrive.fallback.meta.description,
      keywords: banner?.meta_keywords,
      otherMetaTags: banner?.other_meta_tags,
    },
    "/book-a-test-drive",
  );
}

export default async function page() {
  const { data, error } = await getTestDrive();
  if (error || !data) notFound();
  const { cms, banner, vehicle_models } = data;

  const intro = {
    title: cms.title,
    lead: cms.sub_title,
    textHtml: cms.description,
    form: {
      ...testDrive.form,
    title: cms.enquiry_title,
      introHtml: cms.enquiry_description,
    },
  };

  return (
    <>
      <InnerBanner
        data={{
          title: banner?.banner_title ?? testDrive.fallback.banner.title,
          media: {
            url: banner?.banner ?? testDrive.fallback.banner.url,
            alternativeText:
              banner?.banner_alt_text ??
              testDrive.fallback.banner.alternativeText,
          },
        }}
        as="div"
      />
      <Breadcrumb items={testDrive.breadcrumb} />
      <ContactIntro data={withVehicleOptions(intro, vehicle_models)} />
    </>
  );
}
