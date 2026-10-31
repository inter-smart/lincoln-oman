import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { ensureData } from "@/lib/api/ensure";
import { buildMetadata } from "@/lib/seo";
import { getPrivacy } from "@/data/legal";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import LegalContent from "@/components/sections/legal/LegalContent";

const getPolicy = cache(() => apiGet("/policies/privacy-policy"));

export async function generateMetadata() {
  const data = ensureData(await getPolicy());
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
  const [dict, result] = await Promise.all([
    getCurrentDictionary(),
    getPolicy(),
  ]);
  const privacy = getPrivacy(dict);
  const data = ensureData(result);
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
