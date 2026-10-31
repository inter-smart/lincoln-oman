// Thank-you page URL slug per form key (the page lives at /thank-you/<slug>).
export const thankYouSlugs = {
  contact: "contact",
  quote: "quote",
  testDrive: "test-drive",
  owners: "owners",
  offers: "offers",
  offer: "offer",
};

export function thankYouHref(formKey) {
  return `/thank-you/${thankYouSlugs[formKey]}`;
}

export function formKeyOfSlug(slug) {
  return Object.keys(thankYouSlugs).find((key) => thankYouSlugs[key] === slug);
}
