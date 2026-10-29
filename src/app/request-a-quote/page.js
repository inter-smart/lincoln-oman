import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";

export const metadata = {
  title: "Request a Quote",
  description:
    "Request a personalised quote from Lincoln Oman: share what you are looking for and our team will help you explore suitable options and pricing.",
  alternates: { canonical: "/request-a-quote" },
};

const local_data = {
  banner: {
    banner_title: "Request a Quote",
    // Figma banner (interior shot) was not in the supplied assets: existing interior photo stands in.
    banner: "/images/vehicle/interior-1.jpg",
    banner_alt_text: "Lincoln interior with the centre touchscreen",
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "quote", label: "Request a Quote" },
  ],
  intro: {
    title: "Request a Quote",
    description: "<p>Get a personalized quote for your requirements.</p>",
    text: "Share what you’re looking for, and our team will help you explore suitable options and pricing.",
    enquiry_title: "Let’s Get Started",
    form: {
      intro: "Complete the form, and we’ll be in touch.",
      action: "#",
      fields: [
        { name: "name", label: "Name", type: "text", autoComplete: "name" },
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
        {
          name: "model",
          label: "Vehicle Model",
          options: ["Navigator", "Aviator", "Corsair", "Nautilus"],
        },
      ],
      message: { name: "message", label: "Message" },
      // Copy is as designed (it names Ford Motor Company): flagged for the client.
      terms: {
        choices: ["Yes", "No"],
        text: "Terms and Conditions. I am happy to receive commercial messages from Ford Motor Company and affiliated authorized partners.",
        agree:
          "I agree to the terms and conditions and privacy policy of this website.",
      },
      submit: "Submit Request",
    },
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} as="div" />
      <Breadcrumb items={local_data.breadcrumb} />
      <ContactIntro data={local_data.intro} form={local_data.intro.form} />
    </>
  );
}
