import Legacy from "@/components/sections/home/Legacy";
import Newsroom from "@/components/sections/home/Newsroom";
import AboutInfo from "@/components/sections/about/about-info";
import InnerBanner from "@/components/layout/common/inner-banner";
import ExploreModels from "@/components/sections/home/ExploreModels";
import AboutCommitment from "@/components/sections/about/about-commitment";
import { getAbout } from "@/lib/api/pages/about";
import PageMeta from "@/components/layout/common/page-meta";
import { ROUTES } from "@/lib/constants/routes";
import { buildMetadata } from "@/lib/seo";

// Title, description and keywords come straight from the `banner` block of the about-us API.
export async function generateMetadata() {
  return buildMetadata((await getAbout()).seo, ROUTES.ABOUT);
}

export default async function page() {
  const api = await getAbout();

  return (
    <>
      <PageMeta tags={api.seo.otherMetaTags} />
      <InnerBanner data={api.banner} />
      <Legacy data={api.legacy} variant="about" />
      <AboutInfo data={api.info} />
      <ExploreModels data={api.models} variant="about" />
      <AboutCommitment data={api.commitment} />
      <Newsroom data={api.news} />
    </>
  );
}
