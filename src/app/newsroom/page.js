import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import NewsGrid from "@/components/sections/newsroom/NewsGrid";

export const metadata = {
  title: "Newsroom",
  description:
    "Lincoln Oman newsroom: the latest news, awards and exclusive offers from Lincoln in Oman.",
  alternates: { canonical: "/newsroom" },
};

const news = [
  {
    title: "Lincoln Nautilus nominated for Middle East Car of the Year 2020",
    href: "/newsroom/nautilus-nominated-middle-east-car-of-the-year-2020",
    image: "/images/home/news-1.png",
    position: "34% 50%",
  },
  {
    title: "Lincoln Oman Unveils Exclusive Ramadan Offers",
    image: "/images/home/news-2.png",
  },
  {
    title: "Experience Exceptional Lincoln Luxury with Exclusive Offers",
    image: "/images/home/news-3.png",
  },
  {
    title: "Extraordinary Lincoln Now With Exclusive Delights",
    image: "/images/home/news-4.png",
  },
];

const local_data = {
  banner: {
    title: "Newsroom",
    media: {
      // Figma banner (interior shot) was not in the supplied assets: existing interior photo stands in.
      url: "/images/vehicle/interior-1.jpg",
      alternativeText: "Lincoln interior with the centre touchscreen",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "newsroom", label: "Newsroom" },
  ],
  newsroom: {
    title: "Lincoln Newsroom",
    readMore: "Read More",
    loadingLabel: "Loading More...",
    // Figma row 1 is the home order; row 2 starts with the "Exclusive Delights" card.
    items: [...news, news[3], ...news.slice(0, 3)].map((item, i) => ({
      id: `n${i + 1}`,
      date: "09.03.2020",
      datetime: "2020-03-09",
      href: "#",
      position: "50% 50%",
      ...item,
    })),
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} />
      <Breadcrumb items={local_data.breadcrumb} />
      <NewsGrid data={local_data.newsroom} />
    </>
  );
}
