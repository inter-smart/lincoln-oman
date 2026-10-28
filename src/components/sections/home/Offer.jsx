import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";

// `data` is home_cms.section_five. Its `description` HTML already carries the paragraph classes.
export default function Offer({ data }) {
  return (
    <section className="py-(--section-space)">
      <div className="container grid items-center gap-[32px] lg:grid-cols-[minmax(0,480px)_minmax(0,904px)] lg:justify-between xl:grid-cols-[minmax(0,calc(480*var(--rr)))_minmax(0,calc(904*var(--rr)))] xl:ps-[8.6%] xl:pe-[5.6%]">
        <div data-reveal>
          <h2 className="title text-ink lg:whitespace-pre-line">
            {data.title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
          <div className="mt-[32px] flex flex-wrap gap-[13px]">
            <ButtonLink
              data={{
                label: data.button_one_title,
                href: data.button_one_link,
              }}
              variant="dark"
            />
            <ButtonLink
              data={{
                label: data.button_two_title,
                href: data.button_two_link,
              }}
              variant="dark"
            />
          </div>
        </div>
        <div
          data-reveal
          style={{ "--reveal-delay": "0.15s" }}
          className="relative aspect-[904/517]"
        >
          <Image
            src={data.image}
            alt={data.alt_tag ?? ""}
            fill
            sizes="(min-width: 992px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
