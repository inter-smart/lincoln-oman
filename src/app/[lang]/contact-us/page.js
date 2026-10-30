import { cache } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";
import ContactLocations from "@/components/sections/contact/ContactLocations";
import DepartmentContact from "@/components/sections/contact/DepartmentContact";
import { getContact as contactText } from "@/data/contact";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import { apiGet } from "@/lib/api/get";
import { buildMetadata } from "@/lib/seo";

// GET /contact-us -> { contact_cms, contact_addresses: [...], department_contacts: [...], banner }
// cache() lets generateMetadata and the page share one request.
const getContact = cache(() => apiGet("/contact-us"));

export async function generateMetadata() {
  const { data, error } = await getContact();
  if (error || !data) notFound();
  const { banner } = data;
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/contact-us",
  );
}

export default async function page() {
  const contact = contactText(await getCurrentDictionary());
  const { data, error } = await getContact();
  if (error || !data) notFound();
  const { contact_cms, contact_addresses, department_contacts, banner } = data;

  return (
    <>
      <InnerBanner as="div" data={banner} />
      <Breadcrumb items={contact.breadcrumb} />
      <ContactIntro data={contact_cms} form={contact.form} />
      <ContactLocations contact_addresses={contact_addresses} />
      <DepartmentContact
        data={contact_cms}
        department_contacts={department_contacts}
      />
    </>
  );
}
