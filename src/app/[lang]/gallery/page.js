import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { ensureData } from "@/lib/api/ensure";
import { buildMetadata } from "@/lib/seo";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";

const PATH = "/gallery";

const getGalleries = cache((page = 1) =>
  apiGet("/galleries", { params: page > 1 ? { page } : {} }),
);

export async function generateMetadata() {
  const data = ensureData(await getGalleries());
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    PATH,
  );
}

const positiveInt = (value) => (/^[1-9]\d*$/.test(value ?? "") ? value : "");

export default async function page({ searchParams }) {
  const { pages, ui } = await getCurrentDictionary();
  const breadcrumb = [
    { id: "home", label: pages.home, href: "/" },
    { id: "gallery", label: ui.gallery },
  ];
  const query = await searchParams;
  const requestedPage = Number(positiveInt(query.page)) || 1;

  const first = await getGalleries();
  ensureData(first);
  const { banner } = first.data;

  // The API paginates like /special-offers; ?page=N shows pages 1..N. Without a `pagination` block there is one page.
  const lastPage = first.data.pagination?.last_page ?? 1;
  const shownPages = Math.min(requestedPage, lastPage);
  const more = await Promise.all(
    Array.from({ length: shownPages - 1 }, (_, index) =>
      getGalleries(index + 2),
    ),
  );
  more.forEach(ensureData);

  const galleries = [first, ...more].flatMap(({ data }) => data.galleries);

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={breadcrumb} />
      <GalleryGrid
        title={banner.banner_title}
        galleries={galleries}
        loadMore={
          shownPages < lastPage
            ? { href: `${PATH}?page=${shownPages + 1}` }
            : null
        }
      />
    </>
  );
}
