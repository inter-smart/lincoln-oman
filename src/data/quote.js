// Request a Quote content the API does not send: breadcrumb, field labels, terms copy and submit label.
// Title, intro, banner, meta and vehicle models come from GET /request-quote (see src/app/request-a-quote/page.js).
export function getQuote(dict) {
  const { form, pages } = dict;
  return {
    breadcrumb: [
      { id: "home", label: pages.home, href: "/" },
      { id: "quote", label: pages.requestQuote },
    ],
    // Form fields only: the title and intro come from cms (enquiry_title / enquiry_description).
    // The vehicle options are filled from vehicle_models by withVehicleOptions.
    form: {
      formKey: "quote",
      fields: [
        { name: "name", label: form.name, type: "text", autoComplete: "name" },
        {
          name: "email",
          label: form.email,
          type: "email",
          autoComplete: "email",
        },
        { name: "phone", label: form.phone, type: "tel", autoComplete: "tel" },
        { name: "vehicle", label: form.vehicleModel, options: [] },
      ],
      message: { name: "message", label: form.message, optional: true },
      // Copy is as designed (it names Ford Motor Company): flagged for the client.
      terms: {
        choices: [form.yes, form.no],
        text: form.termsText,
        agree: form.agree,
      },
      submit: form.submitRequest,
    },
  };
}
