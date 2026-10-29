// Legal pages. Text, banner and SEO come from the API (GET /policies/{slug}); only the breadcrumb is local.
const crumbs = (id, label) => [
  { id: "home", label: "Home", href: "/" },
  { id: id, label },
];

export const terms = {
  breadcrumb: crumbs("terms", "Terms & Conditions"),
};

export const privacy = {
  breadcrumb: crumbs("privacy", "Privacy Policy"),
};
