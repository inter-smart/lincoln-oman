// Special Offers page content the API does not send: breadcrumb, labels and the enquiry form.
// The form title is the CMS enquiry_title (this dictionary text is the fallback).
// Banner, meta and the offers come from GET /special-offers (see src/app/special-offers/page.js).
export function getOffers(dict) {
  const { form, pages, offers: t } = dict;
  return {
    breadcrumb: [
      { id: "home", label: pages.home, href: "/" },
      { id: "offers", label: pages.specialOffers },
    ],
    title: pages.specialOffers,
    locationLabel: t.chooseLocation,
    allLocationsLabel: t.allLocations,
    learnMoreLabel: t.learnMore,
    loadMoreLabel: t.loadMore,
    expiresLabel: t.expires,
    emptyText: t.empty,
    // Listing-page form: POST /page-enquiries with type "offer" (formKey "offers"), see src/app/actions/forms.js.
    enquiry: {
      title: t.enquiryTitle,
      formKey: "offers",
      fields: [
        { name: "name", label: form.name, type: "text", autoComplete: "name" },
        {
          name: "email",
          label: form.email,
          type: "email",
          autoComplete: "email",
        },
        { name: "subject", label: form.subject, type: "text" },
      ],
      message: { name: "message", label: form.message, optional: true },
      submit: form.submit,
    },
    // Enquiry form on a single offer (/special-offers/[slug]): POST /special-offer-enquiries (formKey "offer").
    detailEnquiry: {
      title: t.enquiryTitle,
      spaced: true,
      formKey: "offer",
      fields: [
        { name: "name", label: form.name, type: "text", autoComplete: "name" },
        {
          name: "email",
          label: form.email,
          type: "email",
          autoComplete: "email",
        },
        { name: "phone", label: form.phone, type: "tel", autoComplete: "tel" },
      ],
      selects: [
        // Options come from vehicle_models / interested_in of GET /special-offers/{slug} (filled in by the page).
        { name: "model", label: form.model, options: [] },
        { name: "interested", label: form.interested, options: [] },
      ],
      message: { name: "message", label: form.message, optional: true },
      submit: form.submit,
    },
  };
}
