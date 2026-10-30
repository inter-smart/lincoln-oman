import Link from "@/components/ui/locale-link";
import Image from "next/image";
import { XIcon } from "lucide-react";
import Logo from "@/components/layout/common/Logo";
import ButtonLink from "@/components/layout/common/ButtonLink";
import LanguageSwitch from "@/components/layout/common/LanguageSwitch";
import HeaderShell from "@/components/layout/common/HeaderShell";
import VehicleMenu from "@/components/layout/common/VehicleMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLink = "relative transition-opacity hover:opacity-70";

export default function Header({ data }) {
  return (
    <HeaderShell>
      <div className="pointer-events-none container grid grid-cols-[1fr_auto_1fr] items-start pt-[20px] pb-[14px] transition-[padding] duration-500 group-data-scrolled/header:pt-[14px] lg:pt-[38px]">
        <NavigationMenu
          viewport={false}
          className="pointer-events-auto static hidden max-w-none flex-none justify-start lg:flex"
          aria-label={data.labels.mainNav}
        >
          <NavigationMenuList className="mt-[20px] gap-[36px] text-[14px] tracking-[0.8px] xl:gap-[calc(52*var(--rr))] xl:text-fluid-16">
            {data?.nav?.map((item) =>
              item.menu ? (
                <NavigationMenuItem key={item.id} className="static">
                  <NavigationMenuTrigger
                    type="button"
                    className="relative h-auto rounded-none bg-transparent p-0 text-[length:inherit] font-normal after:absolute after:start-0 after:-bottom-[6px] after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:outline-solid data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:after:scale-x-100 data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:hidden"
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="inset-x-0 -z-10 p-0 pe-0 group-data-[viewport=false]/navigation-menu:top-0 group-data-[viewport=false]/navigation-menu:mt-0 group-data-[viewport=false]/navigation-menu:rounded-none group-data-[viewport=false]/navigation-menu:border-0 group-data-[viewport=false]/navigation-menu:bg-night group-data-[viewport=false]/navigation-menu:text-white group-data-[viewport=false]/navigation-menu:shadow-none group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-100 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-100 md:fixed md:w-full">
                    <VehicleMenu menu={item.menu} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.id} className="static">
                  <Link href={item.href} className={navLink}>
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href="/"
          aria-label={data.labels.lincolnHome}
          className="pointer-events-auto col-start-2 origin-top scale-[0.7] lg:scale-100"
        >
          <Logo />
        </Link>

        <div className="pointer-events-auto col-start-3 mt-[8px] flex items-center justify-end gap-[20px] xl:gap-[27px]">
          <ButtonLink
            data={data?.testDrive}
            className="me-[13px] hidden lg:inline-flex"
          />
          <LanguageSwitch labels={data.language} />

          <Sheet>
            <SheetTrigger className="flex h-[24px] items-center gap-[13px] text-[14px] tracking-[0.7px] uppercase transition-opacity hover:opacity-70">
              <span className="max-sm:sr-only">{data.labels.menu}</span>
              <Image src="/icons/menu.svg" alt="" width={31} height={7} />
            </SheetTrigger>
            <SheetContent
              side="top-lg-right"
              data-lenis-prevent
              showCloseButton={false}
              overlayClassName="bg-transparent lg:bg-black/50"
              aria-describedby={undefined}
              className="max-h-dvh gap-0 overflow-y-auto border-none bg-night/80 pb-9 text-white backdrop-blur-md"
            >
              <SheetTitle className="sr-only">{data.labels.menu}</SheetTitle>
              <div className="mx-auto w-full max-w-[720px] px-9">
                <div className="grid grid-cols-[1fr_auto_1fr] items-start pt-[20px]">
                  <Link
                    href="/"
                    aria-label={data.labels.lincolnHome}
                    className="col-start-2 origin-top scale-[0.7]"
                  >
                    <Logo />
                  </Link>
                  <div className="col-start-3 mt-[8px] flex items-center justify-end gap-[20px]">
                    <LanguageSwitch labels={data.language} />
                    <SheetClose className="grid size-[24px] place-items-center transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-solid">
                      <XIcon
                        className="size-[22px]"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{data.labels.closeMenu}</span>
                    </SheetClose>
                  </div>
                </div>
                <nav aria-label={data.labels.menu} className="-mt-4">
                  <ul className="text-[18px] tracking-[0.9px]">
                    {data?.nav?.map((item) => (
                      <li
                        key={item.id}
                        className="relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-[#3F3F3F] after:to-transparent last:after:hidden"
                      >
                        {item.menu ? (
                          <details className="group/vehicles">
                            <summary className="flex h-[52px] cursor-pointer list-none items-center justify-between focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-solid [&::-webkit-details-marker]:hidden">
                              {item.label}
                              <Image
                                src="/icons/chevron-accent.svg"
                                alt=""
                                width={7}
                                height={4}
                                className="transition-transform duration-300 group-open/vehicles:rotate-180"
                              />
                            </summary>
                            <ul className="flex flex-col gap-[4px] ps-[16px] pb-[14px] text-[16px]">
                              {item.menu.items?.map((model) => (
                                <li key={model.id}>
                                  <SheetClose asChild>
                                    <Link
                                      href={model.href}
                                      className={`${navLink} block py-[6px]`}
                                    >
                                      {model.label}
                                    </Link>
                                  </SheetClose>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={`${navLink} flex h-[52px] items-center`}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <ButtonLink data={data?.testDrive} className="mt-[32px]" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </HeaderShell>
  );
}
