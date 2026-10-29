import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import NewsGrid from "@/components/sections/newsroom/NewsGrid";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /news -> { news: [{ id, slug, title, published_on, media, … }], banner, pagination }
// cache() lets generateMetadata and the page share one request.
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

const breadcrumb = [
  { id: "home", label: "Home", href: "/" },
  { id: "newsroom", label: "Newsroom" },
];

export default async function page() {
  const { data, error } = await getNews();
  if (error || !data) notFound();
  const { news, banner } = data;

  return (
    <>
      <InnerBanner
        as="div"
        data={{
          title: banner.banner_title,
          media: {
            url: banner.banner,
            alternativeText: banner.banner_alt_text,
          },
        }}
      />
      <Breadcrumb items={breadcrumb} />
      <NewsGrid title="Lincoln Newsroom" news={news} />
    </>
  );
}
