import { cache } from "react";
import { notFound } from "next/navigation";
import Legacy from "@/components/sections/home/Legacy";
import Newsroom from "@/components/sections/home/Newsroom";
import AboutInfo from "@/components/sections/about/about-info";
import InnerBanner from "@/components/layout/common/inner-banner";
import ExploreModels from "@/components/sections/home/ExploreModels";
import AboutCommitment from "@/components/sections/about/about-commitment";
import PageMeta from "@/components/layout/common/page-meta";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /about-us -> { about_cms: { section_one … section_five }, banner, featured_models, news }
// cache() lets generateMetadata and the page share one request.
const getAbout = cache(() => apiGet("/about-us"));

export async function generateMetadata() {
  const { data, error } = await getAbout();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
    },
    "/about",
  );
}

export default async function page() {
  const { data, error } = await getAbout();
  if (error || !data) notFound();
  const { about_cms, banner, featured_models, news } = data;

  return (
    <>
      <PageMeta html={banner.other_meta_tags} />
      <InnerBanner
        data={{
          title: banner.banner_title,
          media: {
            url: banner.banner,
            alternativeText: banner.banner_alt_text,
          },
        }}
      />
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
