// Spec table: label/value rows in two columns from lg, hairline under each row.
export default function PerformanceHighlights({ items }) {
  return (
    <section
      id="performance"
      className="scroll-mt-(--spy-offset,96px) py-(--section-space)"
    >
      <div className="container">
        <h2 data-reveal className="text-center title text-ink">
          Performance Highlights
        </h2>
        {/* Fills the left column first, as in the design */}
        <dl
          data-reveal
          style={{ "--rows": Math.ceil(items.length / 2) }}
          className="mx-auto mt-6 grid max-w-[1364px] gap-x-5 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-[repeat(var(--rows),auto)] xl:mt-[calc(45*var(--rr))] xl:max-w-[calc(1364*var(--rr))]"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-ink py-4 text-sm text-ink sm:text-base xl:py-[calc(20*var(--rr))] xl:text-fluid-18"
            >
              <dt>{item.specification}</dt>
              <dd className="text-end">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
