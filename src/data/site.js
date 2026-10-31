// Shared header / footer / floating-rail content. Structure, links and icons live here; the
// words come from the dictionary (src/dictionaries/{en,ar}.json) so they follow the active language.
// Footer address, phone and email are not here: they come from GET /site-settings in layout.js.
export function getSite(dict) {
  const { nav, vehicles, rail, footer, language, common } = dict;
  return {
    labels: common,
    nav: [
      { id: "home", label: nav.home, href: "/" },
      {
        id: "vehicles",
        label: nav.vehicles,
        href: "#",
        // Mega menu (Figma "Component 9" → Variant3). Only Navigator has a cut-out image in Figma.
        menu: {
          items: [
            {
              id: "navigator",
              label: vehicles.navigator,
              href: "/vehicles/navigator",
              image: {
                src: "/images/menu-navigator.png",
                width: 690,
                height: 254,
              },
            },
            { id: "aviator", label: vehicles.aviator, href: "#" },
            { id: "corsair", label: vehicles.corsair, href: "#" },
            { id: "nautilus", label: vehicles.nautilus, href: "#" },
          ],
          explore: { label: nav.exploreMore },
          testDrive: { label: nav.bookTestDrive, href: "/book-a-test-drive" },
        },
      },
      { id: "owners", label: nav.owners, href: "/owners" },
      { id: "contact", label: nav.contact, href: "/contact-us" },
    ],
    testDrive: { label: nav.bookTestDrive, href: "/book-a-test-drive" },
    language,

    // Figma gives the calendar item the same label as the mail item ("Email or Call Me Back") — kept as designed, flagged.
    rail: [
      {
        id: "callback",
        label: rail.callback,
        href: "#",
        icon: {
          src: "/icons/rail-calendar.svg",
          width: 19.5198,
          height: 19.5197,
        },
      },
      {
        id: "appointment",
        label: rail.appointment,
        href: "/contact-us",
        icon: {
          src: "/icons/rail-service.svg",
          width: 20.579,
          height: 24.0083,
        },
      },
      {
        id: "quote",
        label: rail.quote,
        href: "/request-a-quote",
        icon: { src: "/icons/rail-quote.svg", width: 18.1579, height: 20.579 },
      },
      {
        id: "test-drive",
        label: rail.testDrive,
        href: "/book-a-test-drive",
        icon: "wheel",
      },
      {
        id: "email",
        label: rail.email,
        href: "#",
        icon: { src: "/icons/rail-mail.svg", width: 21.8614, height: 16.1242 },
      },
    ],

    footer: {
      columns: [
        {
          id: "company",
          title: footer.company,
          links: [
            { id: "home", label: footer.home, href: "/" },
            { id: "about", label: footer.about, href: "/about" },
            { id: "contact", label: footer.contact, href: "/contact-us" },
            { id: "owners", label: footer.owners, href: "/owners" },
          ],
        },
        {
          id: "vehicles",
          title: footer.vehicles,
          links: [
            {
              id: "navigator",
              label: vehicles.navigator,
              href: "/vehicles/navigator",
            },
            { id: "aviator", label: vehicles.aviator, href: "#" },
            { id: "corsair", label: vehicles.corsair, href: "#" },
            { id: "nautilus", label: vehicles.nautilus, href: "#" },
          ],
        },
        {
          id: "resource",
          title: footer.resource,
          links: [
            { id: "offers", label: footer.offers, href: "/special-offers" },
            {
              id: "certified",
              label: footer.certified,
              href: "/lincoln-certified",
            },
            { id: "parts", label: footer.parts, href: "#" },
            { id: "news", label: footer.news, href: "/newsroom" },
          ],
        },
        {
          id: "general",
          title: footer.general,
          links: [
            { id: "terms", label: footer.terms, href: "/terms-and-conditions" },
            { id: "privacy", label: footer.privacy, href: "/privacy-policy" },
            { id: "news", label: footer.news, href: "/newsroom" },
            { id: "gallery", label: footer.gallery, href: "/gallery" },
          ],
        },
      ],
      // The address text, phone and email come from GET /site-settings (see layout.js); only the title is local.
      // Figma repeats "Arabian Car Marketing Co. LLC" as a 4th line — dropped as a copy-paste leftover.
      address: { title: footer.ourAddress },
      legal: [
        {
          id: "terms",
          label: footer.terms,
          href: "/terms-and-conditions",
          isExternal: false,
        },
        {
          id: "sitemap",
          label: footer.sitemap,
          href: "/sitemap.xml",
          isExternal: true,
        },
        {
          id: "legal",
          label: footer.legalNotice,
          href: "/privacy-policy",
          isExternal: false,
        },
      ],
      copyright: footer.copyright,
      followLabel: footer.followUs,
      credit: { label: footer.craftedBy, name: "Intersmart", href: "#" },
    },
  };
}
