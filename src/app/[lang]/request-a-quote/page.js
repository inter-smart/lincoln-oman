import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getQuote as quoteText } from "@/data/quote";
import { withVehicleOptions } from "@/lib/vehicle-options";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";

const getQuote = cache(() => apiGet("/request-quote"));

export async function generateMetadata() {
  const { data, error } = await getQuote();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/request-a-quote",
  );
}

export default async function page() {
  const quote = quoteText(await getCurrentDictionary());
  const { data, error } = await getQuote();
  if (error || !data) notFound();
  const { cms, banner, vehicle_models } = data;

  const intro = {
    title: cms.title,
    lead: cms.sub_title,
    textHtml: cms.description,
    form: {
      ...quote.form,
      title: cms.enquiry_title,
      introHtml: cms.enquiry_description,
    },
  };

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={quote.breadcrumb} />
      <ContactIntro data={withVehicleOptions(intro, vehicle_models)} />
    </>
  );
}
