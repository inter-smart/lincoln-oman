import ExploreModels from "@/components/sections/home/ExploreModels";
import Hero from "@/components/sections/home/Hero";
import Legacy from "@/components/sections/home/Legacy";
import ModelShowcase from "@/components/sections/home/ModelShowcase";
import Newsroom from "@/components/sections/home/Newsroom";
import Offer from "@/components/sections/home/Offer";
import Ownership from "@/components/sections/home/Ownership";
import { home } from "@/data/home";

export default function page() {
  return (
    <>
      <Hero data={home.hero} />
      <ExploreModels data={home.models} />
      <Legacy data={home.legacy} />
      <ModelShowcase data={home.continental} />
      <ModelShowcase data={home.navigator} />
      <Offer data={home.offer} />
      <Ownership data={home.ownership} />
      <Newsroom data={home.news} />
    </>
  );
}
