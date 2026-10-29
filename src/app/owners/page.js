import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OwnersContent from "@/components/sections/owners/OwnersContent";
import { owners } from "@/data/owners";
import { apiGet } from "@/lib/api/get";
import { ownersSections } from "@/lib/owners-sections";
import { buildMetadata } from "@/lib/seo";

// GET /owners -> { owners_cms: { top_image }, owners_services: [{ title, description_one, description_two, image }], banner }
// cache() lets generateMetadata and the page share one request.
const getOwners = cache(() => apiGet("/owners"));

export async function generateMetadata() {
  const { data, error } = await getOwners();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/owners",
  );
}

// Text left once tags and non-breaking spaces are removed
const textOf = (html) => (html ?? "").replace(/<[^>]*>|&nbsp;/gi, "").trim();

// A service is shown when the CMS gave it any text (a title or either description).
const hasContent = (service) =>
  [service?.title, service?.description_one, service?.description_two].some(
    (value) => textOf(value),
  );

export default async function page() {
  const { data, error } = await getOwners();
  if (error || !data) notFound();
  const { banner, owners_cms, owners_services } = data;

  const services = Array.isArray(owners_services)
    ? owners_services.filter(hasContent)
    : [];

  return (
    <>
      <InnerBanner data={banner} />
      <Breadcrumb items={owners.breadcrumb} />
      {services.length > 0 && (
        <OwnersContent
          sections={ownersSections(services, owners_cms?.top_image)}
          navLabel={owners.navLabel}
        />
      )}
      {textOf(owners_cms?.enquiry_title) && (
        <EnquiryForm
          data={{
            ...owners.enquiry,
            enquiry_title: owners_cms.enquiry_title,
            enquiry_image: owners_cms.enquiry_image,
          }}
        />
      )}
    </>
  );
}
