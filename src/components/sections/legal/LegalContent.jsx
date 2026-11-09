import { currentLocale } from "@/lib/api/locale";
import { formatLongDate } from "@/lib/format-date";

export default async function LegalContent({ data }) {
  const updated = data?.lastUpdated
    ? formatLongDate(data.lastUpdated, await currentLocale())
    : null;

  return (
    <section className="py-(--section-space)">
      <div className="container">
        {updated && (
          <p data-reveal className="mb-5 text-sm text-ash sm:mb-7 xl:text-base">
            Last updated:{" "}
            <time dateTime={updated.dateTime}>{updated.label}</time>
          </p>
        )}
        {/* CMS rich text: the `typography` utility styles every tag, so the editor needs no classes */}
        <div
          data-reveal
          className="typography [&_a]:text-slate [&_a]:underline [&_ol]:marker:text-slate [&_ul]:marker:text-slate"
          dangerouslySetInnerHTML={{ __html: data?.body }}
        />
      </div>
    </section>
  );
}
