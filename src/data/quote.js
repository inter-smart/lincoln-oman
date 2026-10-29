// Request a Quote content the API does not send: breadcrumb, field labels, terms copy and submit label.
// Title, intro, banner, meta and vehicle models come from GET /request-quote (see src/app/request-a-quote/page.js).
export const quote = {
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "quote", label: "Request a Quote" },
  ],
  // Form fields only: the title and intro come from cms (enquiry_title / enquiry_description).
  // The vehicle options are filled from vehicle_models by withVehicleOptions.
  form: {
    formKey: "quote",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
      { name: "vehicle", label: "Vehicle Model", options: [] },
    ],
    message: { name: "message", label: "Message", optional: true },
    // Copy is as designed (it names Ford Motor Company): flagged for the client.
    terms: {
      choices: ["Yes", "No"],
      text: "Terms and Conditions. I am happy to receive commercial messages from Ford Motor Company and affiliated authorized partners.",
      agree:
        "I agree to the terms and conditions and privacy policy of this website.",
    },
    submit: "Submit Request",
  },
};
