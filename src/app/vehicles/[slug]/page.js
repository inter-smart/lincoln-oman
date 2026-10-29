import { cache } from "react";
import { notFound } from "next/navigation";
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
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /vehicles/{slug} -> { vehicle: { name, slug, banner, brochure, section_one, section_two, section_nine, section_ten },
//   features, model_variants, interior_experiences, exterior_designs, color_variants, media_connectivities,
//   performance_highlights, galleries, safeties }. Every list can be empty (only Navigator is filled so far).
// cache() lets generateMetadata and the page share one request.
const getVehicle = cache((slug) =>
  apiGet(`/vehicles/${encodeURIComponent(slug)}`),
);

// The vehicle endpoint has no related-models list, so "Explore More Models" stays local
// (same fields as the API models list: name, slug, image, video, features).
const modelFeatures = [
  { title: "3.5L GTDI Engine", icon: "/icons/spec-engine.svg" },
  { title: "Driver Assist Technology", icon: "/icons/spec-driver-assist.svg" },
  { title: "Polished 22” Aluminum Wheel", icon: "/icons/spec-wheel.svg" },
];
const models = [
  {
    name: "L100 Concept",
    slug: "l100",
    image: "/images/vehicle/model-l100.jpg",
    position: "67% 50%",
  },
  {
    name: "Aviator",
    slug: "aviator",
    image: "/images/home/model-aviator.png",
    position: "50% 50%",
  },
  {
    name: "Corsair",
    slug: "corsair",
    image: "/images/home/model-corsair.png",
    position: "52% 50%",
  },
  {
    name: "Nautilus",
    slug: "nautilus",
    image: "/images/home/model-nautilus.png",
    position: "75% 50%",
  },
].map((model) => ({
  ...model,
  video: "/videos/navigator-720.mp4",
  features: modelFeatures,
}));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, error } = await getVehicle(slug);
  if (error || !data) notFound();
  const { vehicle } = data;
  // The vehicle endpoint sends no meta fields, so the banner copy stands in.
  return buildMetadata(
    { title: vehicle.banner.title, description: vehicle.banner.description },
    `/vehicles/${vehicle.slug}`,
  );
}

export default async function page({ params }) {
  const { slug } = await params;
  const { data, error } = await getVehicle(slug);
  if (error || !data) notFound();
  const {
    vehicle,
    features,
    model_variants,
    interior_experiences,
    exterior_designs,
    color_variants,
    media_connectivities,
    performance_highlights,
    galleries,
    safeties,
  } = data;
  const {
    banner,
    brochure,
    section_one,
    section_two,
    section_nine,
    section_ten,
  } = vehicle;
  const tabs = [
    { id: "variants", label: "Model Variants", show: model_variants },
    {
      id: "interior",
      label: "Interior Experience",
      show: interior_experiences,
    },
    { id: "colors", label: "Color variants", show: color_variants },
    { id: "exterior", label: "Exterior Design", show: exterior_designs },
    {
      id: "performance",
      label: "Performance Highlights",
      show: performance_highlights,
    },
    { id: "media", label: "Media connectivity", show: media_connectivities },
    { id: "gallery", label: "Themes", show: galleries },
    { id: "safety", label: "Luxury & Convenience", show: safeties },
  ]
    .filter((tab) => tab.show?.length > 0)
    .map(({ id, label }) => ({ id, label, href: `#${id}` }));

  return (
    <>
      <InnerBanner
        data={{
          ...banner,
          link: brochure && { label: "Download Brochure", href: brochure },
          actions: [
            {
              id: "test-drive",
              label: "Test Drive",
              href: "/book-a-test-drive",
            },
            { id: "enquire", label: "Enquire Now", href: "/request-a-quote" },
          ],
        }}
      />
      <Breadcrumb
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "vehicle", label: vehicle.name },
        ]}
      />
      <VehicleFeatures items={features} />
      <VehicleIntro data={section_one} />
      {tabs.length > 0 && (
        <div>
          <SectionTabs items={tabs} label={`${vehicle.name} sections`} />
          {model_variants.length > 0 && (
            <ModelVariants
              items={model_variants}
              word={section_two?.background_title}
            />
          )}
          {interior_experiences.length > 0 && (
            <InteriorExperience items={interior_experiences} />
          )}
          {color_variants.length > 0 && (
            <ColorVariants items={color_variants} />
          )}
          {exterior_designs.length > 0 && (
            <ExteriorDesign items={exterior_designs} />
          )}
          {performance_highlights.length > 0 && (
            <PerformanceHighlights items={performance_highlights} />
          )}
          {media_connectivities.length > 0 && (
            <CaptionCards
              id="media"
              title="Media Connectivity"
              items={media_connectivities}
              arrows
            />
          )}
          {galleries.length > 0 && <VehicleGallery items={galleries} />}
          {safeties.length > 0 && (
            <CaptionCards
              id="safety"
              title="Safety"
              tagline={section_nine?.description}
              items={safeties}
              ratio="aspect-384/596"
              gap="xl:[--slide-gap:calc(35*var(--rr))]"
            />
          )}
        </div>
      )}
      {section_ten?.title && (
        <VehicleCta data={section_ten} brochure={brochure} />
      )}
      <ExploreModels
        title="Explore More Models"
        models={models}
        variant="about"
      />
    </>
  );
}
