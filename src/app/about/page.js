import Legacy from "@/components/sections/home/Legacy";
import Newsroom from "@/components/sections/home/Newsroom";
import AboutInfo from "@/components/sections/about/about-info";
import InnerBanner from "@/components/layout/common/inner-banner";
import ExploreModels from "@/components/sections/home/ExploreModels";
import AboutCommitment from "@/components/sections/about/about-commitment";
import Breadcrumb from "@/components/layout/common/Breadcrumb";

const videoCard = "/videos/navigator-720.mp4";
const specs = [
  {
    id: "engine",
    label: "3.5L GTDI\nEngine",
    icon: { src: "/icons/spec-engine.svg", width: 28, height: 20 },
  },
  {
    id: "assist",
    label: "Driver Assist\nTechnology",
    icon: {
      src: "/icons/spec-driver-assist.svg",
      width: 24.5644,
      height: 24.2307,
    },
  },
  {
    id: "wheel",
    label: "Polished 22”\nAluminum Wheel",
    icon: { src: "/icons/spec-wheel.svg", width: 22.4353, height: 22.4269 },
  },
];
const local_data = {
  aboutBanner: {
    title: "About Us",
    media: {
      url: "/images/about-banner.jpg",
      alternativeText: "About Us",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "contact", label: "About Us" },
  ],
  legacy: {
    title: "The Lincoln Legacy",
    text: "At Arabian Car Marketing the satisfaction of our customers has always remained an inspiration for everything we do. Our expert staffs are dedicated to providing the highest possible standards of customer service alongside the latest automotive technology and industry best practices. Drive Lincoln with confidence thanks to the top quality after-sales service and customer support provided by our team.",
    cta: { label: "Hear The Story!", href: "#" },
  },
  about: {
    title: "Lorem Ipsum is simply dummy",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    media: {
      url: "/videos/about-info.mp4",
    },
  },
  models: {
    title: "Featured Models",
    items: [
      {
        id: "navigator",
        name: "Navigator",
        href: "#",
        video: videoCard,
        image: "/images/home/model-navigator.png",
        position: "50% 50%",
        specs,
      },
      {
        id: "aviator",
        name: "Aviator",
        href: "#",
        video: videoCard,
        image: "/images/home/model-aviator.png",
        position: "50% 50%",
        specs,
      },
      {
        id: "corsair",
        name: "Corsair",
        href: "#",
        video: videoCard,
        image: "/images/home/model-corsair.png",
        position: "52% 50%",
        specs,
      },
      {
        id: "nautilus",
        name: "Nautilus",
        href: "#",
        video: videoCard,
        image: "/images/home/model-nautilus.png",
        position: "75% 50%",
        specs,
      },
    ],
  },
  commitment: {
    media: {
      url: "/images/about-commitment.jpg",
      alternativeText: "About Commitment",
    },
    title: "Our Commitment",
    description:
      "Congratulations on your decision to drive a Lincoln. The Lincoln Commitment® is a comprehensive benefits package designed to meet your driving needs. It’s complimentary with the purchase or lease of any Lincoln vehicle and it provides you with valuable support so you can handle the challenges of the road with confidence and ease.",
  },
  news: {
    title: "Lincoln Newsroom",
    more: { label: "View More", href: "#" },
    readMore: "Read More",
    items: [
      {
        id: "n1",
        date: "09.03.2020",
        datetime: "2020-03-09",
        title:
          "Lincoln Nautilus nominated for Middle East Car of the Year 2020",
        href: "#",
        image: "/images/home/news-1.png",
        position: "34% 50%",
      },
      {
        id: "n2",
        date: "09.03.2020",
        datetime: "2020-03-09",
        title: "Lincoln Oman Unveils Exclusive Ramadan Offers",
        href: "#",
        image: "/images/home/news-2.png",
        position: "50% 50%",
      },
      {
        id: "n3",
        date: "09.03.2020",
        datetime: "2020-03-09",
        title: "Experience Exceptional Lincoln Luxury with Exclusive Offers",
        href: "#",
        image: "/images/home/news-3.png",
        position: "50% 50%",
      },
      {
        id: "n4",
        date: "09.03.2020",
        datetime: "2020-03-09",
        title: "Extraordinary Lincoln Now With Exclusive Delights",
        href: "#",
        image: "/images/home/news-4.png",
        position: "50% 50%",
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data?.aboutBanner} />
      <Breadcrumb items={local_data.breadcrumb} />
      <Legacy data={local_data?.legacy} variant="about" />
      <AboutInfo data={local_data?.about} />
      <ExploreModels data={local_data?.models} variant="about" />
      <AboutCommitment data={local_data?.commitment} />
      <Newsroom data={local_data?.news} />
    </>
  );
}
