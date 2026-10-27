import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";

export const metadata = {
  title: "Book a Test Drive",
  description:
    "Book a Lincoln test drive in Oman: pick a model, date and time and our team will confirm your drive.",
  alternates: { canonical: "/book-a-test-drive" },
};

const local_data = {
  banner: {
    title: "Book a Test Drive",
    media: {
      url: "/images/test-drive/banner.png",
      alternativeText: "Lincoln sedan driving through a sunlit tunnel",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "test-drive", label: "Book a Test Drive" },
  ],
  intro: {
    title: "Book a Test Drive",
    lead: "Experience your next car from behind the wheel.",
    text: "Discover the comfort, performance, and driving experience firsthand.",
    form: {
      title: "Let’s Get You Driving",
      intro: "Complete the form, and our team will be in touch.",
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
        {
          name: "time",
          label: "Preferred Time",
          optional: true,
          options: ["Morning", "Afternoon", "Evening"],
        },
        { name: "date", label: "dd-mm-yyyy", date: true },
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
      <ContactIntro data={local_data.intro} />
    </>
  );
}
