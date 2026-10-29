import ColorPicker from "@/components/layout/common/ColorPicker";

export default function ColorVariants({ items }) {
  return (
    <section
      id="colors"
      className="scroll-mt-(--spy-offset,96px) pt-(--section-space)"
    >
      <div className="container">
        <h2 data-reveal className="text-center title text-ink">
          Color Variants
        </h2>
        <div
          data-reveal
          className="mt-6 xl:mt-[calc(60*var(--rr))] xl:ps-[calc(80*var(--rr))]"
        >
          <ColorPicker items={items} />
        </div>
      </div>
    </section>
  );
}
