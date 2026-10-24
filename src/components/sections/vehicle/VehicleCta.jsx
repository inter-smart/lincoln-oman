import ButtonLink from "@/components/layout/common/ButtonLink";

// "Experience Lincoln" card: title and line on the left, the pill buttons on the right.
export default function VehicleCta({ data }) {
  return (
    <section className="pt-(--section-space)">
      <div className="container">
        <div
          data-reveal
          className="flex flex-col gap-6 rounded-[10px] bg-night px-5 py-10 text-white sm:rounded-[15px] sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between xl:px-[calc(60*var(--rr))] xl:py-[calc(75*var(--rr))] 2xl:rounded-[20px]"
        >
          <div>
            <h2 className="title">{data?.title}</h2>
            <p className="mt-1 text-sm tracking-[0.05em] sm:text-base xl:text-fluid-22">
              {data?.text}
            </p>
          </div>
          {data?.actions?.length > 0 && (
            <div className="flex flex-wrap gap-3 xl:gap-[calc(16*var(--rr))]">
              {data.actions.map((action) => (
                <ButtonLink key={action.id} data={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
