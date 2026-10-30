import Image from "next/image";
import Link from "next/link";
import Composite, { creditLogo } from "@/components/layout/common/Composite";

const linkHover =
  "text-[14px] 2xl:text-[16px] leading-[1.2] font-normal text-white transition-opacity hover:opacity-70";

export default function Footer({ data }) {
  return (
    <footer className="relative bg-night text-[15px] text-white xl:text-fluid-16">
      <a
        href="#top"
        aria-label="Back to top"
        className="absolute top-[22px] right-[16px] grid size-[46px] place-items-center rounded-[5px] bg-slate transition-transform hover:-translate-y-1 xl:right-[27px]"
      >
        {/* Arrow is two Figma vectors drawn sideways and rotated, as in the design */}
        <span className="relative block h-[16.87px] w-[15px]">
          <Image
            src="/icons/to-top-a.svg"
            alt=""
            width={17}
            height={9}
            style={{ width: 16.8748, height: 8.34965 }}
            className="absolute top-[4.26px] left-[-4.2px] max-w-none -rotate-90"
          />
          <Image
            src="/icons/to-top-b.svg"
            alt=""
            width={9}
            height={9}
            style={{ width: 8.3598, height: 8.36035 }}
            className="absolute top-0 left-[6.6px] max-w-none -rotate-90"
          />
        </span>
      </a>

      <div className="container pt-10 sm:pt-[50px] lg:pt-[70px] xl:pt-[calc(113*var(--rr))] 2xl:pt-[90px]">
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[40px] md:grid-cols-3 xl:grid-cols-[repeat(4,1fr)_auto_auto] xl:gap-x-[32px] 4xl:grid-cols-[15.6%_15.06%_16.9%_17.8%_auto_1fr] 4xl:gap-x-0">
          {data?.columns?.map((column) => (
            <nav key={column.id} aria-label={column.title}>
              <h2 className="text-sm tracking-[0.8px] uppercase 2xl:text-base">
                {column.title}
              </h2>
              <ul className="mt-[17px] flex flex-col gap-2.5 sm:gap-[19px]">
                {column.links?.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className={linkHover}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm tracking-[0.8px] uppercase 2xl:text-base">
              {data?.address?.title}
            </h2>
            <address className="mt-[17px] text-sm leading-[24px] not-italic sm:text-base">
              {data?.address?.lines?.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="col-span-2 flex flex-col items-start gap-[12px] xl:col-span-1 xl:items-end">
            <Image
              src="/images/logo.png"
              alt="Lincoln"
              width={600}
              height={208}
              className="mb-[47px] h-auto w-[165px]"
            />
            <a href={`tel:${data?.phone}`} className={linkHover}>
              Phone: {data?.phone}
            </a>
            <a href={`mailto:${data?.email}`} className={linkHover}>
              Email: {data?.email}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-[24px] border-t border-white/10 pt-[24px] pb-[40px] text-sm sm:mt-[60px] xl:mt-[calc(146*var(--rr))] xl:flex-row xl:items-center xl:justify-between xl:pt-[44px] xl:pb-[51px] 2xl:text-base">
          <p>
            {data?.legal?.map((link, index) => (
              <span key={link.id}>
                {index > 0 && " | "}
                <Link href={link.href} className={linkHover}>
                  {link.label}
                </Link>
              </span>
            ))}{" "}
            {data?.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-x-[62px] gap-y-[24px]">
            <div className="flex flex-wrap items-center gap-x-[30px] gap-y-[12px]">
              <span className="uppercase">{data?.followLabel}</span>
              <span className="relative block h-[19.42px] w-[213.11px]">
                {data?.social?.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-label={item.label}
                    className="absolute top-[-3px] grid h-[25px] content-start items-center justify-center rounded-[3px] transition-all duration-300 hover:scale-110"
                    style={{
                      left: `${item.left}px`,
                      width: "24px",
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={item.width}
                      height={item.height}
                      style={{ width: item.width, height: item.height }}
                    />
                  </a>
                ))}
              </span>
            </div>
            <a
              href={data?.credit?.href}
              aria-label={`${data?.credit?.label} ${data?.credit?.name}`}
              className={`flex items-center gap-[12px] ${linkHover}`}
            >
              {data?.credit?.label}
              <Composite {...creditLogo} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
