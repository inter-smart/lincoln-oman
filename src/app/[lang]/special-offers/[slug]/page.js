import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getOffers as offersText } from "@/data/offers";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OfferDetail from "@/components/sections/offers/OfferDetail";

const getOffer = cache((slug) =>
  apiGet(`/special-offers/${encodeURIComponent(slug)}`),
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, error } = await getOffer(slug);
  if (error || !data) notFound();
  const { special_offer, meta_tags } = data;
  return buildMetadata(
    {
      title: meta_tags.meta_title ?? special_offer.title,
      description: meta_tags.meta_description,
      keywords: meta_tags.meta_keywords,
      otherMetaTags: meta_tags.other_meta_tags,
    },
    `/special-offers/${special_offer.slug}`,
  );
}

export default async function page({ params }) {
  const offers = offersText(await getCurrentDictionary());
  const { slug } = await params;
  const { data, error } = await getOffer(slug);
  if (error || !data) notFound();
  const { special_offer, meta_tags, banner, vehicle_models, interested_in } =
    data;

  const optionNames = { model: vehicle_models, interested: interested_in };
  const enquiry = {
    ...offers.detailEnquiry,
    selects: offers.detailEnquiry.selects.map((select) => ({
      ...select,
      options: optionNames[select.name].map((option) => option.name),
    })),
  };

  return (
    <>
      <MetaTags html={meta_tags.other_meta_tags} />
      <InnerBanner data={banner} />
      <Breadcrumb
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "offers", label: offers.title, href: "/special-offers" },
          { id: "offer", label: special_offer.title },
        ]}
      />
      <EnquiryForm data={enquiry} />
      <OfferDetail offer={special_offer} labels={offers} />
    </>
  );
}
