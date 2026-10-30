import Image from "next/image";

export default function SiteLoader() {
  return (
    <div aria-hidden className="site-loader">
      <span className="site-loader-panel site-loader-panel-top" />
      <span className="site-loader-panel site-loader-panel-bottom" />
      <div className="site-loader-mark">
        <Image
          src="/images/lincoln-logo.svg"
          alt=""
          width={135}
          height={120}
          priority
          className="h-auto w-27 sm:w-33.75"
        />
        <span className="site-loader-sheen" />
      </div>
      <span className="site-loader-line" />
    </div>
  );
}
