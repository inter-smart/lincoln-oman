import Image from "next/image";
import Link from "@/components/ui/locale-link";
import Composite, { wheelIcon } from "@/components/layout/common/Composite";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

// Fixed quick-action rail (Figma "Group 51"): each tile slides its label out on hover/focus.
// No mobile design exists: below md it becomes an icon bar along the bottom edge.
// The first tile calls (settings.phone_number), the last one emails (settings.email); both fall back to the item's own href.
export default async function FloatingRail({ items, phone, email }) {
  const { ui } = await getCurrentDictionary();
  if (!items?.length) return null;

  const last = items.length - 1;
  const hrefFor = (item, index) => {
    if (index === 0 && phone) return `tel:${phone.replace(/\s+/g, "")}`;
    if (index === last && email) return `mailto:${email}`;
    return item.href;
  };

  return (
    <nav
      aria-label={ui.quickActions}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-silver bg-white/70 backdrop-blur-[14.7px] md:inset-x-auto md:end-5 md:bottom-[61px] md:border-0 md:bg-transparent md:backdrop-blur-none 2xl:end-8.75"
    >
      <ul className="flex justify-around md:flex-col md:items-end md:gap-2.5 2xl:gap-[17px]">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              href={hrefFor(item, index)}
              className="group flex h-[48px] items-center rounded-[4px] text-[14px] tracking-[0.7px] text-steel focus-visible:outline-2 focus-visible:outline-slate md:h-[46px] md:border md:border-silver md:bg-white/70 md:backdrop-blur-[14.7px] md:hover:bg-white/90 md:focus-visible:bg-white/90"
            >
              <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-out md:group-hover:grid-cols-[1fr] md:group-focus-visible:grid-cols-[1fr]">
                <span className="overflow-hidden whitespace-nowrap">
                  <span className="block ps-[16px]">{item.label}</span>
                </span>
              </span>
              <span className="grid size-[44px] place-items-center">
                {item.icon === "wheel" ? (
                  <Composite {...wheelIcon} />
                ) : (
                  <Image
                    src={item.icon.src}
                    alt=""
                    width={Math.ceil(item.icon.width)}
                    height={Math.ceil(item.icon.height)}
                    style={{ width: item.icon.width, height: item.icon.height }}
                  />
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
