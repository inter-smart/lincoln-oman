import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";
import ContactLocations from "@/components/sections/contact/ContactLocations";
import DepartmentContact from "@/components/sections/contact/DepartmentContact";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Lincoln Oman by phone, email or in person: working hours, showroom addresses and department contacts.",
  alternates: { canonical: "/contact-us" },
};

const email = "lincolnacm@omantel.net.om";
const phone = "92880658";

const local_data = {
  banner: {
    title: "Contact Us",
    media: {
      // Figma banner (interior shot) was not in the supplied assets: existing interior photo stands in.
      url: "/images/vehicle/interior-1.jpg",
      alternativeText: "Lincoln interior with the centre touchscreen",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "contact", label: "Contact Us" },
  ],
  intro: {
    title: "Contact Us",
    lead: "Easily connect with us online, by phone, or by visiting our office.",
    hours: {
      title: "Working Hours",
      items: [
        { id: "sun", label: "Sunday to Thursday: From 9:00 am to 7:00 pm" },
        { id: "sat", label: "Saturday: from 10:00 am to 1:00 pm" },
        { id: "fri", label: "Friday: closed", closed: true },
      ],
    },
    form: {
      title: "Connect with Us",
      action: "#",
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
      message: { name: "message", label: "Message" },
      submit: "Submit",
    },
  },
  locations: {
    label: "Lincoln Oman showrooms",
    direction: { label: "Get Direction", href: "#" },
    // Figma repeats the same address three times; the 4th "Arabian Car Marketing" line is dropped (as in the footer).
    items: [1, 2, 3].map((n) => ({
      id: `loc-${n}`,
      title: "Arabian Car Marketing Co. LLC",
      lines: ["134 Al Romelah Street", "Wattayah", "Muscat"],
      phone,
      email,
    })),
  },
  departments: {
    title: "Department Contact",
    // Tablet photo was not in the supplied assets: existing interior photo stands in.
    image: {
      src: "/images/vehicle/interior-2.jpg",
      alt: "A passenger relaxing in the Lincoln interior",
    },
    items: [
      "New Vehicles",
      "Lincoln Certified",
      "Fleet",
      "Service",
      "Lincoln Parts",
      "General",
    ].map((title) => ({ id: title, title, email, phone })),
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} as="div" />
      <Breadcrumb items={local_data.breadcrumb} />
      <ContactIntro data={local_data.intro} />
      <ContactLocations data={local_data.locations} />
      <DepartmentContact data={local_data.departments} />
    </>
  );
}
