import Breadcrumb from "@/components/layout/common/Breadcrumb";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import InnerBanner from "@/components/layout/common/inner-banner";
import OfferList from "@/components/sections/offers/OfferList";

export const metadata = {
  title: "Special Offers",
  description:
    "Current Lincoln special offers in Oman: service specials and Navigator Grand Touring offers at Lincoln dealerships and service centres.",
  alternates: { canonical: "/special-offers" },
};

const offer = (id, title, image, alt) => ({
  id,
  title,
  image: `/images/offers/offer-${image}.jpg`,
  alt,
  details: [
    "All Lincoln Dealerships",
    "UAE Service Centers",
    "Expires Jan 20, 2025",
  ],
  cta: { label: "Learn More", href: "#" },
});

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
    { id: "offers", label: "Special Offers" },
  ],
  offers: {
    title: "Special Offers",
    location: {
      label: "Choose location",
      options: ["Muscat", "Sohar", "Salalah"],
    },
    items: [
      offer(
        "o1",
        "Lincoln Service\nSpecial",
        1,
        "A red Lincoln SUV parked in a city street",
      ),
      offer(
        "o2",
        "Lincoln Navigator\nGrand Touring",
        2,
        "A blue Lincoln Navigator driving towards the camera",
      ),
      offer(
        "o3",
        "Lincoln Navigator\nGrand Touring",
        3,
        "A grey Lincoln Corsair outside a Lincoln dealership",
      ),
      offer(
        "o4",
        "Lincoln Service\nSpecial",
        4,
        "A gold Lincoln sedan on a city street",
      ),
      offer(
        "o5",
        "Lincoln Service\nSpecial",
        5,
        "A dark Lincoln Navigator emerging from fog",
      ),
      offer(
        "o6",
        "Lincoln Navigator\nGrand Touring",
        6,
        "Lincoln steering wheel and digital dashboard",
      ),
      offer(
        "o7",
        "Lincoln Navigator\nGrand Touring",
        7,
        "A teal Lincoln Corsair at night in a city",
      ),
      offer(
        "o8",
        "Lincoln Service\nSpecial",
        8,
        "Lincoln door panel with speaker and window controls",
      ),
    ],
  },
  enquiry: {
    title: "Thank you for\nyour Interest\nEnquire our offer",
    action: "#",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "subject", label: "Subject", type: "text" },
    ],
    message: { name: "message", label: "Message" },
    submit: "Submit",
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} as="div" />
      <Breadcrumb items={local_data.breadcrumb} />
      <OfferList data={local_data.offers} />
      <EnquiryForm data={local_data.enquiry} />
    </>
  );
}
