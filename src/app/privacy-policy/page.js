import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import MetaTags from "@/components/layout/common/MetaTags";
import LegalContent from "@/components/sections/legal/LegalContent";
import { privacy } from "@/data/legal";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /policies/privacy-policy -> { policy: { title, slug, content (HTML), meta_title, meta_description, meta_keywords, other_meta_tags, banner } }
// cache() lets generateMetadata and the page share one request.
const getPolicy = cache(() => apiGet("/policies/privacy-policy"));

export async function generateMetadata() {
  const { data, error } = await getPolicy();
  if (error || !data) notFound();
  const { policy } = data;
  return buildMetadata(
    {
      title: policy.meta_title,
      description: policy.meta_description,
      keywords: policy.meta_keywords,
      otherMetaTags: policy.other_meta_tags,
    },
    "/privacy-policy",
  );
}

export default async function page() {
  const { data, error } = await getPolicy();
  if (error || !data) notFound();
  const { policy } = data;

  return (
    <>
      <MetaTags html={policy.other_meta_tags} />
      <InnerBanner data={policy.banner} />
      <Breadcrumb items={privacy.breadcrumb} />
      <LegalContent data={{ body: policy.content }} />
    </>
  );
}
