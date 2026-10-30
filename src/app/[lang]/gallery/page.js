import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

// GET /galleries -> { galleries: [{ id, media_type: "video" | "image", video?, image? }], banner }
// cache() lets generateMetadata and the page share one request.
const getGalleries = cache(() => apiGet("/galleries"));

export async function generateMetadata() {
  const { data, error } = await getGalleries();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/gallery",
  );
}

export default async function page() {
  const { pages, ui } = await getCurrentDictionary();
  const breadcrumb = [
    { id: "home", label: pages.home, href: "/" },
    { id: "gallery", label: ui.gallery },
  ];
  const { data, error } = await getGalleries();
  if (error || !data) notFound();
  const { galleries, banner } = data;

  return (
    <>
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={breadcrumb} />
      <GalleryGrid title={banner.banner_title} galleries={galleries} />
    </>
  );
}
