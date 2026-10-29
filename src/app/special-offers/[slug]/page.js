import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OfferDetail from "@/components/sections/offers/OfferDetail";

export const metadata = {
  title: "Lincoln Service Special",
  description:
    "Lincoln Service Special in Oman: available at all Lincoln dealerships and service centres. Enquire about this offer online.",
  alternates: { canonical: "/special-offers/lincoln-service-special" },
};

const local_data = {
  banner: {
    title: "Special Offers",
    media: {
      url: "/images/offers/banner.jpg",
      alternativeText: "Lincoln Nautilus side profile",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "offers", label: "Special Offers", href: "/special-offers" },
    { id: "offer", label: "Lincoln Service Special" },
  ],
  enquiry: {
    title: "Thank you for\nyour Interest\nEnquire our offer",
    spaced: true,
    formKey: "offer",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    ],
    selects: [
      {
        name: "model",
        label: "Model",
        options: ["Navigator", "Aviator", "Corsair", "Nautilus"],
      },
      {
        name: "interested",
        label: "Interested",
        options: ["Service", "Test drive", "Quote"],
      },
    ],
    message: { name: "message", label: "Message" },
    submit: "Submit",
  },
  detail: {
    title: "Lincoln Service Special",
    expiry: "Expires Jan 20, 2025",
    description: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    ],
    details: ["All Lincoln Dealerships", "UAE Service Centers"],
    image: {
      src: "/images/offers/offer-1.jpg",
      alt: "A red Lincoln SUV parked in a city street",
    },
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} />
      <Breadcrumb items={local_data.breadcrumb} />
      <EnquiryForm data={local_data.enquiry} />
      <OfferDetail data={local_data.detail} />
    </>
  );
}
