import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/layout/common/ButtonLink";
import HeaderShell from "@/components/layout/common/HeaderShell";
import Logo from "@/components/layout/common/Logo";
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

// Sticky header. The row is pointer-transparent because the mega-menu panel sits behind it.
// Desktop: nav with the Vehicles mega menu (shadcn NavigationMenu, opens on hover).
// Below lg the nav moves into the Menu sheet. The full-screen Menu overlay has no Figma design, so the sheet is a link list.
export default function Header({ data }) {
  return (
    <HeaderShell>
      <div className="pointer-events-none container grid grid-cols-[1fr_auto_1fr] items-start pt-[20px] pb-[14px] transition-[padding] duration-500 group-data-scrolled/header:pt-[14px] lg:pt-[38px]">
        <NavigationMenu
          viewport={false}
          className="pointer-events-auto static hidden max-w-none flex-none justify-start lg:flex"
          aria-label="Main"
        >
          <NavigationMenuList className="mt-[20px] gap-[36px] text-[14px] tracking-[0.8px] xl:gap-[calc(52*var(--rr))] xl:text-fluid-16">
            {data?.nav?.map((item) =>
              item.menu ? (
                <NavigationMenuItem key={item.id} className="static">
                  <NavigationMenuTrigger
                    type="button"
                    className="relative h-auto rounded-none bg-transparent p-0 text-[length:inherit] font-normal after:absolute after:-bottom-[6px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:outline-solid data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:after:scale-x-100 data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:hidden"
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="inset-x-0 -z-10 p-0 pr-0 group-data-[viewport=false]/navigation-menu:top-0 group-data-[viewport=false]/navigation-menu:mt-0 group-data-[viewport=false]/navigation-menu:rounded-none group-data-[viewport=false]/navigation-menu:border-0 group-data-[viewport=false]/navigation-menu:bg-night group-data-[viewport=false]/navigation-menu:text-white group-data-[viewport=false]/navigation-menu:shadow-none group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-100 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-100 md:fixed md:w-full">
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
          aria-label="Lincoln home"
          className="pointer-events-auto col-start-2 origin-top scale-[0.7] lg:scale-100"
        >
          <Logo />
        </Link>

        <div className="pointer-events-auto col-start-3 mt-[8px] flex items-center justify-end gap-[20px] xl:gap-[27px]">
          <ButtonLink
            data={data?.testDrive}
            className="me-[13px] hidden lg:inline-flex"
          />
          <Link
            href={data?.language?.href ?? "#"}
            aria-label={data?.language?.label}
            className="flex h-[24px] items-center gap-[5px] transition-opacity hover:opacity-70"
          >
            <Image src="/icons/globe.svg" alt="" width={15} height={15} />
            <Image src="/icons/caret-down.svg" alt="" width={8} height={5} />
          </Link>

          <Sheet>
            <SheetTrigger className="flex h-[24px] items-center gap-[13px] text-[14px] tracking-[0.7px] uppercase transition-opacity hover:opacity-70">
              <span className="max-sm:sr-only">Menu</span>
              <Image src="/icons/menu.svg" alt="" width={31} height={7} />
            </SheetTrigger>
            <SheetContent
              aria-describedby={undefined}
              className="overflow-y-auto border-none bg-night px-[32px] pt-[80px] pb-[32px] text-white [&>button]:text-white [&>button]:focus-visible:outline-2 [&>button]:focus-visible:outline-white [&>button]:focus-visible:outline-solid"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Menu">
                <ul className="flex flex-col gap-[24px] text-[22px]">
                  {data?.nav?.map((item) => (
                    <li key={item.id}>
                      <SheetClose asChild>
                        <Link href={item.href} className={navLink}>
                          {item.label}
                        </Link>
                      </SheetClose>
                      {item.menu && (
                        <ul className="mt-[14px] flex flex-col gap-[12px] ps-[16px] text-[16px]">
                          {item.menu.items?.map((model) => (
                            <li key={model.id}>
                              <SheetClose asChild>
                                <Link href={model.href} className={navLink}>
                                  {model.label}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <ButtonLink
                data={data?.testDrive}
                className="mt-[16px] self-start"
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </HeaderShell>
  );
}
