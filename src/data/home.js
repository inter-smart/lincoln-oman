// Home page content, shaped like a future CMS response.
// ponytail: every video slot uses the one supplied Navigator clip for now — swap per model when real footage arrives.
const video = {
  mobile: "/videos/navigator-720.mp4",
  desktop: "/videos/navigator-1080.mp4",
};
const videoCard = "/videos/navigator-720.mp4";
// Figma gives every model card the same three specs (Navigator's) — kept as designed, flagged for real data.
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

export const home = {
  hero: {
    title: "Immerse Yourself in Captivating Elegance",
    poster: "/images/home/hero-poster.jpg",
    video,
    cta: { label: "Explore Models", href: "#" },
  },

  models: {
    title: "Explore Lincoln Line",
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

  legacy: {
    title: "The Lincoln Legacy",
    text: "At Arabian Car Marketing the satisfaction of our customers has always remained an inspiration for everything we do. Our expert staffs are dedicated to providing the highest possible standards of customer service alongside the latest automotive technology and industry best practices. Drive Lincoln with confidence thanks to the top quality after-sales service and customer support provided by our team.",
    cta: { label: "Hear The Story!", href: "#" },
  },

  // The video panel (Figma "Rectangle 12"/"Rectangle 15" video fills) swaps the section background to `video` on hover/click.
  continental: {
    title: "The Lincoln Continental",
    subtitle: "Command the Road in Comfort",
    text: "Crafted for those who expect more from every mile.",
    word: "Continental",
    background: "/images/home/continental-bg.png",
    video,
    media: [
      {
        id: "c1",
        image: "/images/home/continental-card.png",
        alt: "Lincoln Continental parked at dusk",
      },
      { id: "c2", video: videoCard, poster: "/images/home/video-poster.jpg" },
    ],
  },

  navigator: {
    title: "The Lincoln Navigator",
    subtitle: "Power Meets Prestige",
    text: "Command attention. Experience first-class travel in every journey.",
    word: "Navigator",
    background: "/images/home/navigator-bg.png",
    video,
    media: [
      { id: "n1", video: videoCard, poster: "/images/home/video-poster.jpg" },
      {
        id: "n2",
        image: "/images/home/navigator-card.png",
        alt: "Lincoln Navigator in motion",
      },
    ],
  },

  offer: {
    title: "Upgrade to Lincoln\nLuxury Has Never Been\nThis Attainable",
    text: "Attractive exchange bonuses and loyalty rewards available.",
    note: "Offer ends on: August 31st 2025",
    image: { src: "/images/home/offer.png", alt: "White Lincoln Aviator" },
    actions: [
      { id: "connect", label: "Connect with Us", href: "#" },
      { id: "more", label: "View More", href: "#" },
    ],
  },

  ownership: {
    title: "Ownership Experience",
    items: [
      { id: "maintenance", label: "Vehicle Maintenance" },
      { id: "warranty", label: "Warranty Coverage" },
      { id: "protect", label: "Lincoln Protect" },
      { id: "rsa", label: "Lincoln Road Assist (RSA)" },
    ],
    cta: { label: "Learn More", href: "#" },
    image: {
      src: "/images/home/ownership.png",
      alt: "Lincoln SUV parked in a lit courtyard at night",
    },
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
