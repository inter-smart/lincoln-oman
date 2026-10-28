import ExploreModels from "@/components/sections/home/ExploreModels";
import Hero from "@/components/sections/home/Hero";
import Legacy from "@/components/sections/home/Legacy";
import ModelShowcase from "@/components/sections/home/ModelShowcase";
import Newsroom from "@/components/sections/home/Newsroom";
import Offer from "@/components/sections/home/Offer";
import Ownership from "@/components/sections/home/Ownership";
import { getHome } from "@/lib/api/pages/home";

// Title, description and keywords come straight from the `banner` block of the home API.
export async function generateMetadata() {
  const { title, description, keywords } = (await getHome()).seo;

  return {
    title,
    description,
    keywords,
    openGraph: { type: "website", siteName: "Lincoln Oman", locale: "en_OM", url: "/", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function page() {
  const api = await getHome();

  return (
    <>
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
