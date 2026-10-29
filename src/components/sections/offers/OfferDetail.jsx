import Image from "next/image";
import { formatExpiry } from "@/lib/format-date";

// Single offer: title, expiry, copy and eligibility list beside the offer photo.
// `offer` is the API special_offer; `labels` is the static copy from src/data/offers.js.
export default function OfferDetail({ offer, labels }) {
  const expiry = offer?.expires_at ? formatExpiry(offer.expires_at) : null;
  const details = [offer?.dealership, offer?.service_center].filter(Boolean);

  return (
    <section className="pb-(--section-space)">
      <div className="container">
        <div
          className={`grid items-center gap-6 sm:gap-8 xl:gap-[calc(80*var(--rr))] ${offer?.image?.path ? "lg:grid-cols-2" : ""}`}
        >
          <div data-reveal>
            <h2 className="title">{offer?.title}</h2>
            {expiry && (
              <p className="mt-3 flex items-center gap-2 text-sm text-ember sm:text-[15px] xl:mt-[calc(15*var(--rr))] xl:text-fluid-16">
                <span aria-hidden className="size-1 rounded-full bg-ember" />
                <time dateTime={expiry.dateTime}>
                  {labels.expiresLabel} {expiry.label}
                </time>
              </p>
            )}
            {offer?.description && (
              <div
                className="typography mt-4 text-sm leading-[1.8] text-ink sm:text-[15px] xl:mt-[calc(25*var(--rr))] xl:text-fluid-16 [&_p]:leading-[1.8] [&>*]:mb-4 last:[&>*]:mb-0"
                dangerouslySetInnerHTML={{ __html: offer.description }}
              />
            )}
            {details.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base text-ink sm:text-lg xl:mt-[calc(40*var(--rr))] xl:gap-x-[calc(30*var(--rr))] xl:text-fluid-20">
                {details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-ember"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {offer?.image?.path && (
            <div
              data-reveal
              style={{ "--reveal-delay": "0.1s" }}
              className="relative aspect-810/415 overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]"
            >
              <Image
                src={offer.image.path}
                alt={offer.image.alt ?? offer.title ?? ""}
                fill
                sizes="(min-width: 1920px) 810px, (min-width: 992px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
