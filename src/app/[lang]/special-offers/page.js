import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OfferList from "@/components/sections/offers/OfferList";
import { getOffers as offersText } from "@/data/offers";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

const PATH = "/special-offers";

// GET /special-offers[?location_id=<id>][&page=<n>]
//   -> { special_offers: [{ id, slug, title, dealership, service_center, expires_at, image, location }], banner, pagination }
// cache() lets generateMetadata and the page share one request.
const getOffers = cache((locationId = "", page = 1) =>
  apiGet("/special-offers", {
    params: {
      ...(locationId && { location_id: locationId }),
      ...(page > 1 && { page }),
    },
  }),
);

export async function generateMetadata() {
  const { data, error } = await getOffers();
  if (error || !data) notFound();
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

// A query value is used only when it is a positive whole number ("2"), otherwise it is ignored.
const positiveInt = (value) => (/^[1-9]\d*$/.test(value ?? "") ? value : "");

// One entry per location found on the offers, in the order they appear.
const locationsOf = (items) => [
  ...new Map(
    items
      .filter((item) => item.location)
      .map((item) => [item.location.id, item.location]),
  ).values(),
];

export default async function page({ searchParams }) {
  const offers = offersText(await getCurrentDictionary());
  const query = await searchParams;
  const locationId = positiveInt(query.location_id);
  const requestedPage = Number(positiveInt(query.page)) || 1;

  // The unfiltered list gives the banner and the location choices.
  const all = await getOffers();
  if (all.error || !all.data) notFound();
  const { banner } = all.data;

  const first = locationId ? await getOffers(locationId) : all;
  if (first.error || !first.data) notFound();

  // "Load more" is a link to ?page=N, which shows pages 1..N. Pages past the last one are ignored.
  const lastPage = first.data.pagination?.last_page ?? 1;
  const shownPages = Math.min(requestedPage, lastPage);
  const more = await Promise.all(
    Array.from({ length: shownPages - 1 }, (_, index) =>
      getOffers(locationId, index + 2),
    ),
  );
  if (more.some(({ error, data }) => error || !data)) notFound();

  const items = [first, ...more].flatMap(({ data }) => data.special_offers);
  const nextQuery = new URLSearchParams({
    ...(locationId && { location_id: locationId }),
    page: shownPages + 1,
  });

  return (
    <>
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={offers.breadcrumb} />
      <OfferList
        labels={offers}
        data={{
          items,
          locations: locationsOf(all.data.special_offers),
          locationId,
          basePath: PATH,
          loadMore:
            shownPages < lastPage ? { href: `${PATH}?${nextQuery}` } : null,
        }}
      />
      <EnquiryForm data={offers.enquiry} />
    </>
  );
}
