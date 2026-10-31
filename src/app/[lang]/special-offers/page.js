import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { ensureData } from "@/lib/api/ensure";
import { buildMetadata } from "@/lib/seo";
import { getOffers as offersText } from "@/data/offers";
import { locationBySlug, slugify } from "@/lib/slugify";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import OfferList from "@/components/sections/offers/OfferList";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";

const PATH = "/special-offers";

const getOffers = cache((locationId = "", page = 1) =>
  apiGet("/special-offers", {
    params: {
      ...(locationId && { location_id: locationId }),
      ...(page > 1 && { page }),
    },
  }),
);

export async function generateMetadata() {
  const data = ensureData(await getOffers());
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
  const offers = offersText(await getCurrentDictionary());
  const query = await searchParams;
  const requestedPage = Number(positiveInt(query.page)) || 1;

  const all = await getOffers();
  ensureData(all);
  const { banner, locations, enquiry_title } = all.data;

  const legacyId = positiveInt(query.location_id);
  const location =
    locationBySlug(locations, query.location) ??
    locations.find(({ id }) => String(id) === legacyId);
  const locationId = location ? String(location.id) : "";
  const locationSlug = location ? slugify(location.name) : "";

  const first = locationId ? await getOffers(locationId) : all;
  ensureData(first);

  const lastPage = first.data.pagination?.last_page ?? 1;
  const shownPages = Math.min(requestedPage, lastPage);
  const more = await Promise.all(
    Array.from({ length: shownPages - 1 }, (_, index) =>
      getOffers(locationId, index + 2),
    ),
  );
  more.forEach(ensureData);

  const items = [first, ...more].flatMap(({ data }) => data.special_offers);
  const nextQuery = new URLSearchParams({
    ...(locationSlug && { location: locationSlug }),
    page: shownPages + 1,
  });

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={offers.breadcrumb} />
      <OfferList
        labels={offers}
        data={{
          items,
          locations,
          locationSlug,
          basePath: PATH,
          loadMore:
            shownPages < lastPage ? { href: `${PATH}?${nextQuery}` } : null,
        }}
      />
      <EnquiryForm
        data={{
          ...offers.enquiry,
          title: enquiry_title || offers.enquiry.title,
        }}
      />
    </>
  );
}
