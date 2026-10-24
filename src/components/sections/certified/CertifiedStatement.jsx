import ButtonLink from "@/components/layout/common/ButtonLink";

// Centred title + copy (Warranty, History Guarantee, Finance Options), with optional actions.
// measure = the design's line length in 1920 px, so each block wraps where the design does.
export default function CertifiedStatement({ data, measure = 790 }) {
  return (
    <section
      id={data?.id}
      className="scroll-mt-(--spy-offset,96px) py-(--section-space) text-center"
      style={{ "--measure": measure }}
    >
      <div data-reveal className="container">
        <h2 className="title text-ink">{data?.title}</h2>
        <p className="mx-auto mt-3 max-w-[calc(var(--measure)*1px)] text-sm leading-[26px] sm:text-[15px] xl:mt-[calc(18*var(--rr))] xl:max-w-[calc(var(--measure)*var(--rr))] xl:text-fluid-16">
          {data?.text}
        </p>
        {data?.actions?.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 xl:mt-[calc(36*var(--rr))]">
            {data.actions.map((action) => (
              <ButtonLink key={action.id} data={action} variant="dark" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
