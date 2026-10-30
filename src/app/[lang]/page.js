import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/home/Hero";
import Offer from "@/components/sections/home/Offer";
import Legacy from "@/components/sections/home/Legacy";
import MetaTags from "@/components/layout/common/MetaTags";
import Newsroom from "@/components/sections/home/Newsroom";
import Ownership from "@/components/sections/home/Ownership";
import ExploreModels from "@/components/sections/home/ExploreModels";
import ModelShowcase from "@/components/sections/home/ModelShowcase";

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
