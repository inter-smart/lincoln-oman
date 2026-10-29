// Special Offers page content the API does not send: breadcrumb, labels and the enquiry form.
// Banner, meta and the offers come from GET /special-offers (see src/app/special-offers/page.js).
export const offers = {
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "offers", label: "Special Offers" },
  ],
  title: "Special Offers",
  locationLabel: "Choose location",
  allLocationsLabel: "All locations",
  learnMoreLabel: "Learn More",
  loadMoreLabel: "Load More",
  expiresLabel: "Expires",
  emptyText: "There are no offers available at the moment.",
  // No form backend exists yet: `action` is a placeholder until the client confirms where enquiries go.
  enquiry: {
    title: "Thank you for\nyour Interest\nEnquire our offer",
    action: "#",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "subject", label: "Subject", type: "text" },
    ],
    message: { name: "message", label: "Message" },
    submit: "Submit",
  },
  // Enquiry form on a single offer (/special-offers/[slug]); same placeholder `action` as above.
  detailEnquiry: {
    title: "Thank you for\nyour Interest\nEnquire our offer",
    spaced: true,
    action: "#",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    ],
    selects: [
      {
        name: "model",
        label: "Model",
        options: ["Navigator", "Aviator", "Corsair", "Nautilus"],
      },
      {
        name: "interested",
        label: "Interested",
        options: ["Service", "Test drive", "Quote"],
      },
    ],
    message: { name: "message", label: "Message" },
    submit: "Submit",
  },
};
