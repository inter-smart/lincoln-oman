import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
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

const getVehicle = cache((slug) =>
  apiGet(`/vehicles/${encodeURIComponent(slug)}`),
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, error } = await getVehicle(slug);
  if (error || !data) notFound();
  const { vehicle } = data;
  const { meta_tags } = vehicle;
  return buildMetadata(
    {
      title: meta_tags.title,
      description: meta_tags.description,
      keywords: meta_tags.keywords,
      otherMetaTags: meta_tags.other_meta_tags,
    },
    `/vehicles/${vehicle.slug}`,
  );
}

export default async function page({ params }) {
  const { pages, ui } = await getCurrentDictionary();
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
    explore_more_models,
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
    { id: "variants", label: ui.modelVariants, show: model_variants },
    {
      id: "interior",
      label: ui.interiorExperience,
      show: interior_experiences,
    },
    { id: "colors", label: ui.colorVariants, show: color_variants },
    { id: "exterior", label: ui.exteriorDesign, show: exterior_designs },
    {
      id: "performance",
      label: ui.performanceHighlights,
      show: performance_highlights,
    },
    { id: "media", label: ui.tabMedia, show: media_connectivities },
    { id: "gallery", label: ui.gallery, show: galleries },
    { id: "safety", label: ui.safety, show: safeties },
  ]
    .filter((tab) => tab.show?.length > 0)
    .map(({ id, label }) => ({ id, label, href: `#${id}` }));

  return (
    <>
      <MetaTags html={vehicle.meta_tags.other_meta_tags} />
      <InnerBanner
        data={{
          banner_title: banner.title,
          text: banner.description,
          banner_alt_text: banner.alt_text,
          banner: banner.image ?? banner.mobile_image,
          banner_mobile: banner?.mobile_image,
          video: banner.type === "video" ? banner.video : undefined,
          link: brochure && { label: ui.downloadBrochure, href: brochure },
          actions: [
            {
              id: "test-drive",
              label: ui.testDrive,
              href: "/book-a-test-drive",
            },
            { id: "enquire", label: ui.enquireNow, href: "/request-a-quote" },
          ],
        }}
      />
      <Breadcrumb
        items={[
          { id: "home", label: pages.home, href: "/" },
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
              title={ui.mediaConnectivity}
              items={media_connectivities}
              arrows
            />
          )}
          {galleries.length > 0 && <VehicleGallery items={galleries} />}
          {safeties.length > 0 && (
            <CaptionCards
              id="safety"
              title={ui.safety}
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
      {explore_more_models?.length > 0 && (
        <ExploreModels
          title={ui.exploreMoreModels}
          models={explore_more_models}
          variant="about"
        />
      )}
    </>
  );
}
