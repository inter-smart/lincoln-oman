import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { ensureData } from "@/lib/api/ensure";
import { buildMetadata } from "@/lib/seo";
import Legacy from "@/components/sections/home/Legacy";
import Newsroom from "@/components/sections/home/Newsroom";
import MetaTags from "@/components/layout/common/MetaTags";
import AboutInfo from "@/components/sections/about/about-info";
import InnerBanner from "@/components/layout/common/inner-banner";
import ExploreModels from "@/components/sections/home/ExploreModels";
import AboutCommitment from "@/components/sections/about/about-commitment";

const getAbout = cache(() => apiGet("/about-us"));

export async function generateMetadata() {
  const data = ensureData(await getAbout());
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/about",
  );
}

export default async function page() {
  const data = ensureData(await getAbout());
  const { about_cms, banner, featured_models, news } = data;

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <InnerBanner data={banner} />
      <Legacy data={about_cms.section_one} variant="about" />
      <AboutInfo data={about_cms.section_two} />
      <ExploreModels
        title={about_cms.section_three.title}
        models={featured_models}
        variant="about"
      />
      <AboutCommitment data={about_cms.section_four} />
      <Newsroom title={about_cms.section_five.title} news={news} />
    </>
  );
}
