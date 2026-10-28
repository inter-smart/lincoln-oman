import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import NewsDetail from "@/components/sections/newsroom/NewsDetail";

export const metadata = {
  title: "Lincoln Nautilus nominated for Middle East Car of the Year 2020",
  description:
    "Your vote will make the difference! The new Lincoln Nautilus has been nominated for the Middle East Car of the Year 2020.",
  alternates: {
    canonical: "/newsroom/nautilus-nominated-middle-east-car-of-the-year-2020",
  },
};

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const local_data = {
  banner: {
    title: "Newsroom",
    media: {
      url: "/images/vehicle/interior-1.jpg",
      alternativeText: "Lincoln interior with the centre touchscreen",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "newsroom", label: "Newsroom", href: "/newsroom" },
    { id: "article", label: "Lincoln Nautilus nominated" },
  ],
  article: {
    title: "Lincoln Nautilus nominated for Middle East Car of the Year 2020",
    date: "09.03.2020",
    datetime: "2020-03-09",
    image: {
      src: "/images/home/news-1.png",
      position: "50% 60%",
      alt: "A silver Lincoln Nautilus at sunset",
    },
    body: [
      '<p>Your vote will make the difference! The new Lincoln Nautilus has been nominated for the Middle East Car of the Year 2020 and it’s your vote that counts. Vote for Lincoln Nautilus now at <a href="https://mecoty.com" target="_blank" rel="noopener noreferrer">mecoty.com</a>!</p>',
      `<p>${lorem} ${lorem} ${lorem}</p>`,
      `<p>${lorem.slice(lorem.indexOf("Lorem Ipsum has been"))}</p>`,
      `<p>${lorem}</p>`,
      `<p>${lorem} ${lorem}</p>`,
    ].join(""),
  },
  recent: {
    title: "Recent Newsroom",
    items: [
      {
        id: "r1",
        published_on: "09 Mar 2020",
        title: "Extraordinary Lincoln Now With Exclusive Delights",
        slug: "extraordinary-lincoln-now-with-exclusive-delights",
        media: { image: "/images/home/news-4.png" },
      },
      {
        id: "r2",
        published_on: "09 Mar 2020",
        title: "Experience Exceptional Lincoln Luxury with Exclusive Offers",
        slug: "exceptional-lincoln-luxury",
        media: { image: "/images/home/news-3.png" },
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} />
      <Breadcrumb items={local_data.breadcrumb} />
      <NewsDetail data={local_data} />
    </>
  );
}
