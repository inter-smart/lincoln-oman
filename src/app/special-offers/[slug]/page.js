import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OfferDetail from "@/components/sections/offers/OfferDetail";
import { offers } from "@/data/offers";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /special-offers/{slug} -> { special_offer: { title, slug, description (HTML), image, … }, banner, meta_tags }
// cache() lets generateMetadata and the page share one request.
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
      // The CMS can send no meta title; fall back to the offer's own title so the page is never untitled.
      title: meta_tags.meta_title ?? special_offer.title,
      description: meta_tags.meta_description,
      keywords: meta_tags.meta_keywords,
      otherMetaTags: meta_tags.other_meta_tags,
    },
    `/special-offers/${special_offer.slug}`,
  );
}

export default async function page({ params }) {
  const { slug } = await params;
  const { data, error } = await getOffer(slug);
  if (error || !data) notFound();
  const { special_offer, banner } = data;

  return (
    <>
      <InnerBanner
        data={{
          title: banner.banner_title,
          media: {
            url: banner.banner,
            alternativeText: banner.banner_alt_text,
          },
        }}
      />
      <Breadcrumb
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "offers", label: "Special Offers", href: "/special-offers" },
          { id: "offer", label: special_offer.title },
        ]}
      />
      <EnquiryForm data={offers.detailEnquiry} />
      <OfferDetail offer={special_offer} labels={offers} />
    </>
  );
}
