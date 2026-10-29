// Book a Test Drive content the API does not send: breadcrumb, field labels, terms copy and submit label.
// Title, intro and vehicle models come from GET /test-drive (see src/app/book-a-test-drive/page.js).
export const testDrive = {
  // GET /test-drive sends `banner: null` for now, so the banner and meta fall back to these.
  // Once the CMS adds a banner row for this page, its values win and these can go.
  fallback: {
    banner: {
      title: "Book a Test Drive",
      url: "/images/test-drive/banner.png",
      alternativeText: "Lincoln sedan driving through a sunlit tunnel",
    },
    meta: {
      title: "Book a Test Drive",
      description:
        "Book a Lincoln test drive in Oman: pick a model, date and time and our team will confirm your drive.",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "test-drive", label: "Book a Test Drive" },
  ],
  // Form fields only: the title and intro come from cms (enquiry_title / enquiry_description).
  // The vehicle options are filled from vehicle_models by withVehicleOptions.
  form: {
    formKey: "testDrive",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
      { name: "vehicle", label: "Vehicle Model", options: [] },
      {
        name: "time",
        label: "Preferred Time",
        optional: true,
        options: ["Morning", "Afternoon", "Evening"],
      },
      { name: "date", label: "dd-mm-yyyy", date: true },
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
