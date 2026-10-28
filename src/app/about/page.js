import Legacy from "@/components/sections/home/Legacy";
import Newsroom from "@/components/sections/home/Newsroom";
import AboutInfo from "@/components/sections/about/about-info";
import InnerBanner from "@/components/layout/common/inner-banner";
import ExploreModels from "@/components/sections/home/ExploreModels";
import AboutCommitment from "@/components/sections/about/about-commitment";
import { getAbout } from "@/lib/api/pages/about";
import { ROUTES } from "@/lib/constants/routes";

// Title, description and keywords come straight from the `banner` block of the about-us API.
export async function generateMetadata() {
  const { title, description, keywords } = (await getAbout()).seo;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      siteName: "Lincoln Oman",
      locale: "en_OM",
      url: ROUTES.ABOUT,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function page() {
  const api = await getAbout();
  
  return (
    <>
      <InnerBanner data={api.banner} />
      <Legacy data={api.legacy} variant="about" />
      <AboutInfo data={api.info} />
      <ExploreModels data={api.models} variant="about" />
      <AboutCommitment data={api.commitment} />
      <Newsroom data={api.news} />
    </>
  );
}
