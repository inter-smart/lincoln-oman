export default function LegalContent({ data }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        {data?.updated && (
          <p data-reveal className="mb-5 text-sm text-ash sm:mb-7 xl:text-base">
            {data.updated}
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
