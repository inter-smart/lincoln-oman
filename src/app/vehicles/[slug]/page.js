import Breadcrumb from "@/components/layout/common/Breadcrumb";
import SectionTabs from "@/components/layout/common/SectionTabs";
import VehicleCta from "@/components/sections/vehicle/VehicleCta";
import InnerBanner from "@/components/layout/common/inner-banner";
import ExploreModels from "@/components/sections/home/ExploreModels";
import CaptionCards from "@/components/sections/vehicle/CaptionCards";
import VehicleIntro from "@/components/sections/vehicle/VehicleIntro";
import ModelVariants from "@/components/sections/vehicle/ModelVariants";
import ColorVariants from "@/components/sections/vehicle/ColorVariants";
import VehicleGallery from "@/components/sections/vehicle/VehicleGallery";
import ExteriorDesign from "@/components/sections/vehicle/ExteriorDesign";
import VehicleFeatures from "@/components/sections/vehicle/VehicleFeatures";
import InteriorExperience from "@/components/sections/vehicle/InteriorExperience";
import PerformanceHighlights from "@/components/sections/vehicle/PerformanceHighlights";

export const metadata = {
  title: "Lincoln Navigator",
  description:
    "The Lincoln Navigator in Oman: prices from AED 369,495. Explore model variants, interior, colours, performance, media connectivity and safety.",
  alternates: { canonical: "/vehicles/navigator" },
};

const local_data = {
  banner: {
    title: "The Lincoln Navigator",
    text: "Prices starting from AED 369,495",
    link: { label: "Download Brochure", href: "#" },
    actions: [
      { id: "test-drive", label: "Test Drive", href: "#" },
      { id: "enquire", label: "Enquire Now", href: "#" },
    ],
    media: { url: "/images/vehicle/banner.jpg", alternativeText: "" },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "navigator", label: "Lincoln Navigator" },
  ],
  features: [
    {
      id: "engine",
      label: "Powerful\nEcoBoost V6",
      icon: { src: "/icons/vehicle/engine.png", width: 62, height: 42 },
    },
    {
      id: "interior",
      label: "Luxury Interior\n& 7-8 Seats",
      icon: { src: "/icons/vehicle/interior.png", width: 57, height: 52 },
    },
    {
      id: "driver-assist",
      label: "Advanced\nDriver Assist",
      icon: { src: "/icons/vehicle/driver-assist.png", width: 59, height: 57 },
    },
    {
      id: "infotainment",
      label: "Connected\nInfotainment",
      icon: { src: "/icons/vehicle/infotainment.png", width: 52, height: 52 },
    },
  ],
  intro: {
    title: "Lincoln Certified Program",
    text: "24-inch high-gloss Ebony-painted wheels and black exterior elements, including the grille, roof-rack side rails, and others,* add to the already impressive appeal of Lincoln Black Label Navigator models.**",
    list: [
      { id: "rejuvenate", label: "Rejuvenate" },
      { id: "display", label: "Panoramic Display" },
      { id: "audio", label: "Revel® Ultima 3D Audio System" },
    ],
    video: {
      src: "/videos/navigator-1080.mp4",
      poster: "/images/home/video-poster.jpg",
      label: "Lincoln Navigator film",
    },
  },
  tabs: [
    { id: "variants", label: "Model Variants", href: "#variants" },
    { id: "interior", label: "Interior Experience", href: "#interior" },
    { id: "colors", label: "Color variants", href: "#colors" },
    { id: "exterior", label: "Exterior Design", href: "#exterior" },
    {
      id: "performance",
      label: "Performance Highlights",
      href: "#performance",
    },
    { id: "media", label: "Media connectivity", href: "#media" },
    { id: "themes", label: "Themes", href: "#gallery" },
    { id: "luxury", label: "Luxury & Convenience", href: "#safety" },
  ],
  variants: {
    title: "Model Variants",
    word: "Navigator",
    startIndex: 1,
    items: [
      {
        id: "grey",
        name: "Lincoln Black Label Navigator with\nSpecial Edition Package",
        image: {
          src: "/images/vehicle/variant-1.jpg",
          width: 2160,
          height: 945,
        },
      },
      {
        id: "copper",
        name: "Lincoln Black Label Navigator with\nSpecial Edition Package",
        image: {
          src: "/images/vehicle/variant-2.png",
          width: 887,
          height: 563,
        },
      },
      {
        id: "white",
        name: "Lincoln Black Label Navigator with\nSpecial Edition Package",
        image: {
          src: "/images/vehicle/variant-3.jpg",
          width: 2160,
          height: 946,
        },
      },
    ],
  },
  interior: {
    title: "Interior Experience",
    items: [
      {
        id: "rejuvenate",
        title: "Lincoln Rejuvenate",
        text: "Your Spa on Wheels",
        image: { src: "/images/vehicle/interior-1.jpg", alt: "" },
      },
      {
        id: "display",
        title: "Panoramic Display",
        text: "Your Spa on Wheels",
        image: { src: "/images/vehicle/interior-2.jpg", alt: "" },
      },
      {
        id: "sunroof",
        title: "Panoramic Sunroof",
        text: "Your Spa on Wheels",
        image: { src: "/images/vehicle/interior-3.jpg", alt: "" },
      },
      {
        id: "display",
        title: "Panoramic Display",
        text: "Your Spa on Wheels",
        image: { src: "/images/vehicle/interior-2.jpg", alt: "" },
      },
    ],
  },
  colors: {
    title: "Color Variants",
    label: "Exterior Paint",
    items: [
      {
        id: "black-velvet",
        name: "Black Velvet",
        hex: "#0a0f10",
        image: {
          src: "/images/vehicle/color-black-velvet.jpg",
          alt: "Lincoln Navigator in Black Velvet",
        },
      },
      {
        id: "white",
        name: "White",
        hex: "#efeef0",
        image: {
          src: "/images/vehicle/color-black-velvet.jpg",
          alt: "Lincoln Navigator",
        },
      },
      {
        id: "beige",
        name: "Beige",
        hex: "#c7bdb5",
        image: {
          src: "/images/vehicle/color-black-velvet.jpg",
          alt: "Lincoln Navigator",
        },
      },
      {
        id: "silver",
        name: "Silver",
        hex: "#b0b4b8",
        image: {
          src: "/images/vehicle/color-black-velvet.jpg",
          alt: "Lincoln Navigator",
        },
      },
      {
        id: "red",
        name: "Red",
        hex: "#67241d",
        image: {
          src: "/images/vehicle/color-black-velvet.jpg",
          alt: "Lincoln Navigator",
        },
      },
    ],
  },
  exterior: {
    title: "Exterior Design",
    startIndex: 1,
    items: [
      {
        id: "front",
        image: {
          src: "/images/vehicle/exterior-1.jpg",
          alt: "Lincoln Navigator parked on a lawn",
        },
      },
      {
        id: "rear",
        image: {
          src: "/images/vehicle/exterior-2.jpg",
          alt: "Lincoln Navigator rear three-quarter view",
        },
      },
      {
        id: "grille",
        image: {
          src: "/images/vehicle/exterior-3.jpg",
          alt: "Lincoln Navigator front grille and wheel",
        },
      },
    ],
  },
  performance: {
    title: "Performance Highlights",
    items: [
      { id: "seats", label: "Max Seating Capacity", value: "8 Seat" },
      {
        id: "warranty",
        label: "Warranty (Bumper to Bumper)*",
        value: "4 years or 50,000 miles",
      },
      { id: "drive", label: "Drive Type", value: "Four-Wheel Drive" },
      { id: "wheelbase", label: "Wheelbase", value: "122.5 inches" },
      { id: "torque", label: "Torque", value: "510 lb-ft" },
      { id: "horsepower", label: "Horsepower", value: "440 hp" },
      { id: "towing", label: "Maximum Towing Capacity", value: "8,700 pounds" },
      { id: "cargo", label: "Cargo Capacity", value: "107 cubic feet" },
    ],
  },
  media: {
    title: "Media Connectivity",
    items: [
      {
        id: "panoramic",
        title: "48-inch Panoramic Display",
        image: { src: "/images/vehicle/media-1.jpg", alt: "" },
      },
      {
        id: "touchscreen",
        title: "11.1-inch center touchscreen",
        image: { src: "/images/vehicle/media-2.jpg", alt: "" },
      },
      {
        id: "connectivity",
        title: "Advanced Media Connectivity",
        image: { src: "/images/vehicle/media-3.jpg", alt: "" },
      },
      {
        id: "hotspot",
        title: "5G LTE Wi-Fi hotspot",
        image: { src: "/images/vehicle/media-4.jpg", alt: "" },
      },
    ],
  },
  gallery: {
    title: "Gallery",
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
    ],
  },
  safety: {
    title: "Safety",
    tagline: "Strong, Smart, and Capable",
    items: [
      {
        id: "towing",
        title: "Towing",
        image: {
          src: "/images/vehicle/safety-1.jpg",
          position: "59% 50%",
          alt: "",
        },
      },
      {
        id: "comfort",
        title: "Ride Comfort",
        image: {
          src: "/images/vehicle/safety-2.jpg",
          position: "2% 50%",
          alt: "",
        },
      },
      {
        id: "assist",
        title: "Driver Assist Technology",
        image: {
          src: "/images/vehicle/safety-3.jpg",
          position: "69% 50%",
          alt: "",
        },
      },
      {
        id: "power",
        title: "Power and Capabilities",
        image: {
          src: "/images/vehicle/safety-4.jpg",
          position: "61% 50%",
          alt: "",
        },
      },
    ],
  },
  cta: {
    title: "Experience Lincoln",
    text: "Your next Lincoln is just one click away.",
    actions: [
      { id: "test-drive", label: "Test Drive", href: "#" },
      { id: "enquire", label: "Enquire Now", href: "#" },
      { id: "brochure", label: "Download Brochure", href: "#" },
    ],
  },
  models: {
    title: "Explore More Models",
    items: [
      {
        id: "l100",
        name: "L100 Concept",
        href: "#",
        image: "/images/vehicle/model-l100.jpg",
        position: "67% 50%",
        video: "/videos/navigator-720.mp4",
        specs: [
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
            icon: {
              src: "/icons/spec-wheel.svg",
              width: 22.4353,
              height: 22.4269,
            },
          },
        ],
      },
      {
        id: "aviator",
        name: "Aviator",
        href: "#",
        image: "/images/home/model-aviator.png",
        position: "50% 50%",
        video: "/videos/navigator-720.mp4",
        specs: [
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
            icon: {
              src: "/icons/spec-wheel.svg",
              width: 22.4353,
              height: 22.4269,
            },
          },
        ],
      },
      {
        id: "corsair",
        name: "Corsair",
        href: "#",
        image: "/images/home/model-corsair.png",
        position: "52% 50%",
        video: "/videos/navigator-720.mp4",
        specs: [
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
            icon: {
              src: "/icons/spec-wheel.svg",
              width: 22.4353,
              height: 22.4269,
            },
          },
        ],
      },
      {
        id: "nautilus",
        name: "Nautilus",
        href: "#",
        image: "/images/home/model-nautilus.png",
        position: "75% 50%",
        video: "/videos/navigator-720.mp4",
        specs: [
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
            icon: {
              src: "/icons/spec-wheel.svg",
              width: 22.4353,
              height: 22.4269,
            },
          },
        ],
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data?.banner} />
      <Breadcrumb items={local_data?.breadcrumb} />
      <VehicleFeatures items={local_data?.features} />
      <VehicleIntro data={local_data?.intro} />
      <div>
        <SectionTabs items={local_data?.tabs} label="Navigator sections" />
        <ModelVariants data={local_data?.variants} />
        <InteriorExperience data={local_data?.interior} />
        <ColorVariants data={local_data?.colors} />
        <ExteriorDesign data={local_data?.exterior} />
        <PerformanceHighlights data={local_data?.performance} />
        <CaptionCards id="media" data={local_data?.media} arrows />
        <VehicleGallery data={local_data?.gallery} />
        <CaptionCards
          id="safety"
          data={local_data?.safety}
          ratio="aspect-384/596"
          gap="xl:[--slide-gap:calc(35*var(--rr))]"
        />
      </div>
      <VehicleCta data={local_data?.cta} />
      <ExploreModels data={local_data?.models} variant="about" />
    </>
  );
}
