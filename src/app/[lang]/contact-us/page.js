import { cache } from "react";
import { apiGet } from "@/lib/api/get";
import { ensureData } from "@/lib/api/ensure";
import { buildMetadata } from "@/lib/seo";
import { getContact as contactText } from "@/data/contact";
import MetaTags from "@/components/layout/common/MetaTags";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import Breadcrumb from "@/components/layout/common/Breadcrumb";
import InnerBanner from "@/components/layout/common/inner-banner";
import ContactIntro from "@/components/sections/contact/ContactIntro";
import ContactLocations from "@/components/sections/contact/ContactLocations";
import DepartmentContact from "@/components/sections/contact/DepartmentContact";

const getContact = cache(() => apiGet("/contact-us"));

export async function generateMetadata() {
  const data = ensureData(await getContact());
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
  const data = ensureData(await getContact());
  const { contact_cms, contact_addresses, department_contacts, banner } = data;

  return (
    <>
      <MetaTags html={banner.other_meta_tags} />
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
