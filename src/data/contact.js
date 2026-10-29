// Contact Us page content the API does not send: breadcrumb and the form fields.
// Banner, meta, working hours, addresses and departments come from GET /contact-us (see src/app/contact-us/page.js).
export const contact = {
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "contact", label: "Contact Us" },
  ],
  // Submits to POST /contact-enquiry (formKey "contact"): see src/app/actions/forms.js.
  form: {
    formKey: "contact",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        autoComplete: "tel",
        wide: true,
      },
    ],
    message: { name: "message", label: "Message", optional: true },
    submit: "Submit",
  },
};
