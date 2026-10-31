// Book a Test Drive content the API does not send: breadcrumb, field labels, terms copy and submit label.
// Title, intro and vehicle models come from GET /test-drive (see src/app/book-a-test-drive/page.js).
export function getTestDrive(dict) {
  const { form, pages, testDrive: t } = dict;
  return {
    // GET /test-drive sends `banner: null` for now, so the banner and meta fall back to these.
    // Once the CMS adds a banner row for this page, its values win and these can go.
    fallback: {
      banner: {
        title: t.bannerTitle,
        url: "/images/test-drive/banner.png",
        alternativeText: t.bannerAlt,
      },
      meta: {
        title: t.metaTitle,
        description: t.metaDescription,
      },
    },
    breadcrumb: [
      { id: "home", label: pages.home, href: "/" },
      { id: "test-drive", label: pages.bookTestDrive },
    ],
    // Form fields only: the title and intro come from cms (enquiry_title / enquiry_description).
    // The vehicle options are filled from vehicle_models by withVehicleOptions.
    form: {
      formKey: "testDrive",
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
        {
          name: "time",
          label: form.preferredTime,
          optional: true,
          options: [form.morning, form.afternoon, form.evening],
        },
        { name: "date", label: form.datePlaceholder, date: true },
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
