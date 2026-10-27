import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import CertifiedStatement from "@/components/sections/certified/CertifiedStatement";

export const metadata = {
  title: "Thank You",
  description: "Your Lincoln test drive request has been received.",
  alternates: { canonical: "/book-a-test-drive/thank-you" },
};

const local_data = {
  banner: {
    title: "Thank You",
    media: {
      url: "/images/test-drive/banner.png",
      alternativeText: "Lincoln sedan driving through a sunlit tunnel",
    },
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "test-drive", label: "Book a Test Drive", href: "/book-a-test-drive" },
    { id: "thank-you", label: "Thank You" },
  ],
  statement: {
    id: "thank-you",
    title: "Your test drive request has been received",
    text: "Thank you for choosing Lincoln. Our team will contact you shortly to confirm your date, time and vehicle.",
    actions: [
      { id: "home", label: "Back to Home", href: "/" },
      { id: "vehicles", label: "Explore Vehicles", href: "/vehicles/navigator" },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerBanner data={local_data.banner} />
      <Breadcrumb items={local_data.breadcrumb} />
      <CertifiedStatement data={local_data.statement} measure={640} />
    </>
  );
}
