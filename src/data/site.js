// Shared header / footer / floating-rail content. Shaped like a future CMS response.
export const site = {
  nav: [
    { id: "home", label: "Home", href: "/" },
    {
      id: "vehicles",
      label: "Vehicles",
      href: "#",
      // Mega menu (Figma "Component 9" → Variant3). Only Navigator has a cut-out image in Figma.
      menu: {
        items: [
          {
            id: "navigator",
            label: "Navigator",
            href: "/vehicles/navigator",
            image: {
              src: "/images/menu-navigator.png",
              width: 690,
              height: 254,
            },
          },
          { id: "aviator", label: "Aviator", href: "#" },
          { id: "corsair", label: "Corsair", href: "#" },
          { id: "nautilus", label: "Nautilus", href: "#" },
        ],
        explore: { label: "Explore More" },
        testDrive: { label: "Book a Test Drive", href: "/book-a-test-drive" },
      },
    },
    { id: "owners", label: "Owners", href: "/owners" },
    { id: "contact", label: "Contact", href: "/contact-us" },
  ],
  testDrive: { label: "Book a Test Drive", href: "/book-a-test-drive" },
  language: { label: "Select language", href: "#" },

  // Figma gives the calendar item the same label as the mail item ("Email or Call Me Back") — kept as designed, flagged.
  rail: [
    {
      id: "callback",
      label: "Email or Call Me Back",
      href: "#",
      icon: {
        src: "/icons/rail-calendar.svg",
        width: 19.5198,
        height: 19.5197,
      },
    },
    {
      id: "appointment",
      label: "Book an Appointment",
      href: "#",
      icon: { src: "/icons/rail-service.svg", width: 20.579, height: 24.0083 },
    },
    {
      id: "quote",
      label: "Request a Quote",
      href: "/request-a-quote",
      icon: { src: "/icons/rail-quote.svg", width: 18.1579, height: 20.579 },
    },
    {
      id: "test-drive",
      label: "Book a Test Drive",
      href: "/book-a-test-drive",
      icon: "wheel",
    },
    {
      id: "email",
      label: "Email or Call Me Back",
      href: "#",
      icon: { src: "/icons/rail-mail.svg", width: 21.8614, height: 16.1242 },
    },
  ],

  footer: {
    columns: [
      {
        id: "company",
        title: "Company",
        links: [
          { id: "home", label: "Home", href: "/" },
          { id: "about", label: "About Us", href: "/about" },
          { id: "contact", label: "Contact Us", href: "/contact-us" },
          { id: "owners", label: "Owners", href: "/owners" },
        ],
      },
      {
        id: "vehicles",
        title: "Vehicles",
        links: [
          { id: "navigator", label: "Navigator", href: "/vehicles/navigator" },
          { id: "aviator", label: "Aviator", href: "#" },
          { id: "corsair", label: "Corsair", href: "#" },
          { id: "nautilus", label: "Nautilus", href: "#" },
        ],
      },
      {
        id: "resource",
        title: "Resource",
        links: [
          { id: "offers", label: "Special offers", href: "/special-offers" },
          {
            id: "certified",
            label: "Lincoln certified",
            href: "/lincoln-certified",
          },
          { id: "parts", label: "Parts", href: "#" },
          { id: "news", label: "News & Events", href: "/newsroom" },
        ],
      },
      {
        id: "general",
        title: "General Links",
        links: [
          { id: "terms", label: "Terms & Conditions", href: "/terms-and-conditions" },
          { id: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
          { id: "news", label: "News & Events", href: "/newsroom" },
          { id: "gallery", label: "Gallery", href: "/gallery" },
        ],
      },
    ],
    // Figma repeats "Arabian Car Marketing Co. LLC" as a 4th line — dropped as a copy-paste leftover.
    address: {
      title: "Our Address",
      lines: [
        "Arabian Car Marketing Co. LLC",
        "134 Al Romelah Street",
        "Wattayah Muscat",
      ],
    },
    phone: "92880658",
    email: "lincolnacm@omantel.net.om",
    legal: [
      { id: "terms", label: "Terms & Conditions", href: "/terms-and-conditions" },
      { id: "sitemap", label: "Sitemap", href: "/sitemap.xml" },
      { id: "legal", label: "Legal notice", href: "#" },
    ],
    copyright: "(© izmo Holdings UK Ltd 2010-2026)",
    followLabel: "Follow Us:",
    // ponytail: the five network icons are one Figma SVG, so each link is an equal-width hit area over it.
    social: [
      { id: "facebook", label: "Facebook", href: "#" },
      { id: "youtube", label: "YouTube", href: "#" },
      { id: "instagram", label: "Instagram", href: "#" },
      { id: "linkedin", label: "LinkedIn", href: "#" },
      { id: "x", label: "X", href: "#" },
    ],
    credit: { label: "Crafted by:", name: "Intersmart", href: "#" },
  },
};
