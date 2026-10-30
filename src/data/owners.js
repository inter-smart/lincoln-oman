// Owners page content the API does not send: breadcrumb, nav label and the enquiry form fields.
// Banner, meta and the service sections come from GET /owners (see src/app/owners/page.js).
export function getOwners(dict) {
  const { form, pages } = dict;
  return {
    breadcrumb: [
      { id: "home", label: pages.home, href: "/" },
      { id: "owners", label: pages.owners },
    ],
    navLabel: pages.ownerServices,
    // Form fields only: the title and image come from owners_cms (enquiry_title / enquiry_image).
    // Submits to POST /page-enquiries with type "owners" (name, email, subject, message).
    enquiry: {
      formKey: "owners",
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
  };
}
