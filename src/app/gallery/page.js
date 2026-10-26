import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";

export const metadata = {
  title: "Gallery",
  description:
    "Lincoln Oman gallery: photos and video of the Lincoln Navigator, from desert tracks to the hand-finished interior.",
  alternates: { canonical: "/gallery" },
};

const local_data = {
  banner: {
    title: "Gallery",
    media: {
      url: "/images/gallery/banner.jpg",
      alternativeText:
        "A blue Lincoln Corsair parked outside a modern building",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "gallery", label: "Gallery" },
  ],
  gallery: {
    title: "Gallery",
    // Design shows a black video block (no video exported): the Navigator clip stands in.
    video: {
      src: "/videos/navigator-720.mp4",
      poster: "/images/home/video-poster.jpg",
      label: "Lincoln Navigator film",
    },
    items: [
      {
        id: "g1",
        span: "half",
        image: {
          src: "/images/vehicle/gallery-1.jpg",
          alt: "Lincoln Navigator on a desert track",
        },
      },
      {
        id: "g2",
        span: "half",
        image: {
          src: "/images/vehicle/gallery-2.jpg",
          position: "44% 91%",
          alt: "Lincoln Navigator driving on an open road",
        },
      },
      {
        id: "g3",
        span: "third",
        image: {
          src: "/images/vehicle/gallery-3.jpg",
          position: "96% 50%",
          alt: "Lincoln Navigator centre touchscreen",
        },
      },
      {
        id: "g4",
        span: "third",
        image: {
          src: "/images/vehicle/gallery-4.jpg",
          position: "38% 50%",
          alt: "Lincoln Navigator front seats",
        },
      },
      {
        id: "g5",
        span: "third",
        image: {
          src: "/images/vehicle/gallery-5.jpg",
          position: "94% 50%",
          alt: "Lincoln Navigator centre console controls",
        },
      },
      {
        id: "g6",
        span: "wide",
        image: {
          src: "/images/gallery/wide.jpg",
          alt: "Lincoln Navigator driving through a forest road",
        },
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} />
      <Breadcrumb items={local_data.breadcrumb} />
      <GalleryGrid data={local_data.gallery} />
    </>
  );
}
