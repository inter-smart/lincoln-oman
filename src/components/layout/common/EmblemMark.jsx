export default function EmblemMark({ className = "" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none block aspect-275/796 mask-[url(/images/special-offers.svg)] mask-contain mask-center mask-no-repeat ${className}`}
    />
  );
}
