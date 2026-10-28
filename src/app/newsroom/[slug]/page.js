import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import PageMeta from "@/components/layout/common/page-meta";
import NewsDetail from "@/components/sections/newsroom/NewsDetail";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

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
    },
    `/newsroom/${news.slug}`,
  );
}

export default async function page({ params }) {
  const { slug } = await params;
  const { data, error } = await getNewsItem(slug);
  if (error || !data) notFound();
  const { news, recent_news } = data;

  return (
    <>
      <PageMeta html={news.meta_tags.other_meta_tags} />
      <InnerBanner
        data={{
          title: news.banner.banner_title,
          media: {
            url: news.banner.banner,
            alternativeText: news.banner.banner_alt_text,
          },
        }}
      />
      <Breadcrumb
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "newsroom", label: "Newsroom", href: "/newsroom" },
          { id: "article", label: news.title },
        ]}
      />
      <NewsDetail news={news} recent={recent_news} recent_news_title="Recent Newsroom" />
    </>
  );
}
