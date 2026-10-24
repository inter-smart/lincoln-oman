// Lincoln Certified page content (CMS-shaped). Copy is verbatim from the "Lincoln Certified" design.
export const certified = {
  banner: {
    title: "Immerse Yourself in Captivating Elegance",
    media: { url: "/images/certified/banner.jpg", alternativeText: "" },
    position: "50% 42%",
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "certified", label: "Lincoln Certified" },
  ],
  intro: {
    title: "Lincoln Certified Program",
    text: "The Lincoln Certified program is the smart way to move up to luxury, while ensuring the peace of mind that you deserve. Your driving experience will be enhanced by the knowledge and confidence that your vehicle has been thoroughly inspected and includes manufacture-backed comprehensive warranty coverage.",
    image: {
      src: "/images/certified/program.jpg",
      alt: "A Lincoln specialist presenting the Certified program to customers",
    },
  },
  // In-page navigation. The design has no tab for the 14 Days Exchange Promise section — flagged to the client.
  tabs: [
    { id: "benefits", label: "Program Benefits", href: "#benefits" },
    {
      id: "maintenance",
      label: "2 Year Premium Maintenance",
      href: "#maintenance",
    },
    { id: "warranty", label: "Lincoln Certified Warranty", href: "#warranty" },
    {
      id: "inspection",
      label: "200 Point Premium Inspection",
      href: "#inspection",
    },
    { id: "history", label: "Lincoln History Guarantee", href: "#history" },
    { id: "finance", label: "Finance Options", href: "#finance" },
  ],
  benefits: {
    title: "Program Benefits",
    items: [
      {
        id: "warranty",
        label: "Lincoln Certified Warranty",
        icon: { src: "/icons/certified/warranty.svg", width: 48, height: 48 },
      },
      {
        id: "maintenance",
        label: "2 Year Premium Maintenance",
        icon: {
          src: "/icons/certified/maintenance.svg",
          width: 36,
          height: 37,
        },
      },
      {
        id: "inspection",
        label: "200 Point Premium Inspection",
        icon: { src: "/icons/certified/inspection.svg", width: 52, height: 52 },
      },
      {
        id: "exchange",
        label: "14 Day Exchange Promise",
        icon: { src: "/icons/certified/exchange.svg", width: 40, height: 45 },
      },
      {
        id: "history",
        label: "Lincoln History Guarantee",
        icon: { src: "/icons/certified/history.svg", width: 45, height: 45 },
      },
    ],
  },
  maintenance: {
    id: "maintenance",
    title: "2 Year Premium Maintenance",
    points: [
      "Timely care and inspection that can prevent serious and expensive repairs.",
      "Optimal vehicle performance for the long run.",
      "Protection for your vehicle budget.",
      "Our factory trained technicians use only Lincoln genuine parts to keep your vehicle running at its best.",
    ],
    image: {
      src: "/images/certified/maintenance.jpg",
      alt: "A Lincoln technician reviewing a service report with a customer",
      position: "94% 50%",
    },
  },
  warranty: {
    id: "warranty",
    title: "Lincoln Certified Warranty",
    text: "Enjoy the confidence of our comprehensive premium warranty, which gives you coverage on more than 1,000 components, included with every Lincoln Certified vehicle. Ask your dealer for warranty details.",
  },
  inspection: {
    id: "inspection",
    title: "200 Point Premium Inspection",
    text: "In order to qualify as a Lincoln Certified vehicle, each vehicle must pass a stringent 200 point inspection. Factory trained technicians recondition or replace any component that does not meet program standards. Ask your dealer for a copy of the vehicle inspection checklist.",
    image: {
      src: "/images/certified/inspection.png",
      alt: "A technician inspecting a Lincoln engine bay with a checklist",
    },
  },
  history: {
    id: "history",
    title: "Lincoln History Guarantee",
    text: "As part of our 200 point premium inspection, a vehicle history guarantee report is run to identify any vehicle that did not meet our standards.",
  },
  exchange: {
    id: "exchange",
    title: "14 Days Exchange Promise",
    text: "If for any reason you wish to exchange your Lincoln Certified vehicle, you may exchange it within the first 14 days or 500 kilometers.",
    image: {
      src: "/images/certified/exchange.png",
      alt: "A Lincoln key being handed over",
    },
  },
  // Copy repeats the History Guarantee text in the design — placeholder, flagged to the client.
  finance: {
    id: "finance",
    title: "Finance Options",
    text: "As part of our 200 point premium inspection, a vehicle history guarantee report is run to identify any vehicle that did not meet our standards.",
    actions: [
      { id: "test-drive", label: "Book a Test Drive", href: "#" },
      { id: "connect", label: "Connect with Us", href: "#" },
    ],
  },
  cta: {
    title: "Experience Lincoln Luxury",
    text: "Ready to explore a test drive or bespoke ownership options? Our Lincoln specialists are here to help.",
    action: { label: "Contact a Lincoln Specialist", href: "#" },
  },
};
