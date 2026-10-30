import { cache } from "react";
import { notFound } from "next/navigation";
import MetaTags from "@/components/layout/common/MetaTags";
import ExploreModels from "@/components/sections/home/ExploreModels";
import Hero from "@/components/sections/home/Hero";
import Legacy from "@/components/sections/home/Legacy";
import ModelShowcase from "@/components/sections/home/ModelShowcase";
import Newsroom from "@/components/sections/home/Newsroom";
import Offer from "@/components/sections/home/Offer";
import Ownership from "@/components/sections/home/Ownership";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /home -> { sliders, home_cms: { section_one … section_seven }, explore_lincoln_line, news, banner }
// cache() lets generateMetadata and the page share one request.
const getHome = cache(() => apiGet("/home"));

export async function generateMetadata() {
  const { data, error } = await getHome();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/",
  );
}

export default async function page() {
  const { data, error } = await getHome();
  if (error || !data) notFound();
  const { sliders, home_cms, explore_lincoln_line, news, banner } = data;

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <Hero slides={sliders} />
      <ExploreModels
        title={home_cms.section_one.title}
        models={explore_lincoln_line}
      />
      <Legacy data={home_cms.section_two} />
      <ModelShowcase data={home_cms.section_three} />
      <ModelShowcase data={home_cms.section_four} videoFirst />
      <Offer data={home_cms.section_five} />
      <Ownership data={home_cms.section_six} />
      <Newsroom title={home_cms.section_seven.title} news={news} />
    </>
  );
}
