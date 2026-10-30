import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import NewsGrid from "@/components/sections/newsroom/NewsGrid";
import InnerBanner from "@/components/layout/common/inner-banner";

const getNews = cache(() => apiGet("/news"));

export async function generateMetadata() {
  const { data, error } = await getNews();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/newsroom",
  );
}

export default async function page() {
  const { pages, ui } = await getCurrentDictionary();
  const breadcrumb = [
    { id: "home", label: pages.home, href: "/" },
    { id: "newsroom", label: ui.newsroom },
  ];
  const { data, error } = await getNews();
  if (error || !data) notFound();
  const { news, banner } = data;

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={breadcrumb} />
      <NewsGrid title={banner?.page_title || ui.lincolnNewsroom} news={news} />
    </>
  );
}
