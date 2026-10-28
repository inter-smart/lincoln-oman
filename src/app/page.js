import ExploreModels from "@/components/sections/home/ExploreModels";
import Hero from "@/components/sections/home/Hero";
import Legacy from "@/components/sections/home/Legacy";
import ModelShowcase from "@/components/sections/home/ModelShowcase";
import Newsroom from "@/components/sections/home/Newsroom";
import Offer from "@/components/sections/home/Offer";
import Ownership from "@/components/sections/home/Ownership";
import PageMeta from "@/components/layout/common/page-meta";
import { getHome } from "@/lib/api/pages/home";
import { ROUTES } from "@/lib/constants/routes";
import { buildMetadata } from "@/lib/seo";

// Title, description and keywords come straight from the `banner` block of the home API.
export async function generateMetadata() {
  return buildMetadata((await getHome()).seo, ROUTES.HOME);
}

export default async function page() {
  const api = await getHome();

  return (
    <>
      <PageMeta tags={api.seo.otherMetaTags} />
      <Hero data={api.hero} />
      <ExploreModels data={api.models} />
      <Legacy data={api.legacy} />
      <ModelShowcase data={api.continental} />
      <ModelShowcase data={api.navigator} />
      <Offer data={api.offer} />
      <Ownership data={api.ownership} />
      <Newsroom data={api.news} />
    </>
  );
}
