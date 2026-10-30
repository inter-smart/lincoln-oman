// Contact Us page content the API does not send: breadcrumb and the form fields.
// Banner, meta, working hours, addresses and departments come from GET /contact-us (see src/app/contact-us/page.js).
export function getContact(dict) {
  const { form, pages } = dict;
  return {
    breadcrumb: [
      { id: "home", label: pages.home, href: "/" },
      { id: "contact", label: pages.contactUs },
    ],
    // Submits to POST /contact-enquiry (formKey "contact"): see src/app/actions/forms.js.
    form: {
      formKey: "contact",
      fields: [
        { name: "name", label: form.name, type: "text", autoComplete: "name" },
        {
          name: "email",
          label: form.email,
          type: "email",
          autoComplete: "email",
        },
        {
          name: "phone",
          label: form.phone,
          type: "tel",
          autoComplete: "tel",
          wide: true,
        },
      ],
      message: { name: "message", label: form.message, optional: true },
      submit: form.submit,
    },
  };
}
