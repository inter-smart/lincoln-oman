import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ownersSections } from "@/lib/owners-sections";
import { getOwners as ownersText } from "@/data/owners";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OwnersContent from "@/components/sections/owners/OwnersContent";

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

const textOf = (html) => (html ?? "").replace(/<[^>]*>|&nbsp;/gi, "").trim();

const hasContent = (service) =>
  [service?.title, service?.description_one, service?.description_two].some(
    (value) => textOf(value),
  );

export default async function page() {
  const owners = ownersText(await getCurrentDictionary());
  const { data, error } = await getOwners();
  if (error || !data) notFound();
  const { banner, owners_cms, owners_services } = data;

  const services = Array.isArray(owners_services)
    ? owners_services.filter(hasContent)
    : [];

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
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
