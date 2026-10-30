// Legal pages. Text, banner and SEO come from the API (GET /policies/{slug}); only the breadcrumb is local.
const crumbs = (pages, id, label) => [
  { id: "home", label: pages.home, href: "/" },
  { id, label },
];

export const getTerms = ({ pages }) => ({
  breadcrumb: crumbs(pages, "terms", pages.termsAndConditions),
});

export const getPrivacy = ({ pages }) => ({
  breadcrumb: crumbs(pages, "privacy", pages.privacyPolicy),
});
