// Owners page content the API does not send: breadcrumb, nav label and the enquiry form fields.
// Banner, meta and the service sections come from GET /owners (see src/app/owners/page.js).
export const owners = {
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "owners", label: "Owners" },
  ],
  navLabel: "Owner services",
  // Form fields only: the title and image come from owners_cms (enquiry_title / enquiry_image).
  // Submits to POST /page-enquiries with type "owners" (name, email, subject, message).
  enquiry: {
    formKey: "owners",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "subject", label: "Subject", type: "text" },
    ],
    message: { name: "message", label: "Message", optional: true },
    submit: "Submit",
  },
};
