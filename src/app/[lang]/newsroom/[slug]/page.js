import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import NewsDetail from "@/components/sections/newsroom/NewsDetail";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

const getNewsItem = cache((slug) =>
  apiGet(`/news/${encodeURIComponent(slug)}`),
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, error } = await getNewsItem(slug);
  if (error || !data) notFound();
  const { news } = data;
  return buildMetadata(
    {
      title: news.meta_tags.meta_title,
      description: news.meta_tags.meta_description,
      keywords: news.meta_tags.meta_keywords,
      otherMetaTags: news.meta_tags.other_meta_tags,
    },
    `/newsroom/${news.slug}`,
  );
}

export default async function page({ params }) {
  const { pages, ui } = await getCurrentDictionary();
  const { slug } = await params;
  const { data, error } = await getNewsItem(slug);
  if (error || !data) notFound();
  const { news, recent_news } = data;

  return (
    <>
      <InnerBanner data={news.banner} />
      <Breadcrumb
        items={[
          { id: "home", label: pages.home, href: "/" },
          { id: "newsroom", label: ui.newsroom, href: "/newsroom" },
          { id: "article", label: news.title },
        ]}
      />
      <NewsDetail
        news={news}
        recent={recent_news}
        recent_news_title={ui.recentNewsroom}
      />
    </>
  );
}
