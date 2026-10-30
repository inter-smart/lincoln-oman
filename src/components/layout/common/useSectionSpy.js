"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAP = 24;

// Shared behaviour for sticky in-page navs (SectionTabs, SectionSideNav):
// - keeps `--header-h` on the nav and `--spy-offset` on <html> in step with the fixed header,
//   so sections can use `scroll-mt-(--spy-offset)` and land clear of the header (and the nav when it sits above them);
// - scroll-spy: the active item is the last section whose top has passed the offset line;
// - measures the active link so one indicator can slide to it, and scrolls a sideways list to keep it in view;
// - jump(): smooth scroll on click that holds the clicked item active until the scroll ends.
// isStacked() says whether the nav currently sits above the content (a bar) rather than beside it (a sidebar).
export default function useSectionSpy(items, isStacked = () => true) {
  const navRef = useRef(null);
  const listRef = useRef(null);
  const linkRefs = useRef([]);
  const jumping = useRef(false);
  const stackedRef = useRef(isStacked);
  const lastScrollY = useRef(0);
  const scrollDir = useRef("down");
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    stackedRef.current = isStacked;
  }, [isStacked]);

  // Sticky offsets follow the header, which shrinks once the page scrolls
  useEffect(() => {
    const header = document.querySelector("header");
    const nav = navRef.current;
    if (!header || !nav) return;

    const updateOffset = () => {
      const visibleHeaderH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-visible-h",
          ),
        ) || header.offsetHeight;
      const headerH = visibleHeaderH;
      nav.style.setProperty("--header-h", `${headerH}px`);
      document.documentElement.style.setProperty(
        "--spy-offset",
        `${headerH + (stackedRef.current() ? nav.offsetHeight : GAP)}px`,
      );
    };

    const update = () => {
      updateOffset();
      // The header compacts mid-jump, so re-aim with the new offset or the jump stops short
      const jump = jumping.current;
      if (jump) jump.target.scrollIntoView({ behavior: jump.behavior });
    };
    const observer = new ResizeObserver(update);
    observer.observe(header);
    observer.observe(nav);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", updateOffset, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", updateOffset);
      document.documentElement.style.removeProperty("--spy-offset");
    };
  }, []);

  useEffect(() => {
    const targets = items.map((item) =>
      document.getElementById(item.href.slice(1)),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;

      const scrollY = window.scrollY;
      if (scrollY < lastScrollY.current) {
        scrollDir.current = "up";
      } else if (scrollY > lastScrollY.current) {
        scrollDir.current = "down";
      }
      lastScrollY.current = scrollY;

      const line =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--spy-offset",
          ),
        ) + 1 || nav.getBoundingClientRect().bottom + 1;

      // On reverse (upward) scroll, add an offset buffer so a section stays active
      // while its header and content are in the upper reading view, rather than
      // prematurely jumping to the section above the moment its top passes the nav.
      const isUp = scrollDir.current === "up";
      const offsetBuffer = Math.min(
        220,
        Math.max(100, (window.innerHeight - line) * 0.3),
      );
      const effectiveLine = isUp ? line + offsetBuffer : line;

      let current = 0;
      targets.forEach((target, index) => {
        if (target && target.getBoundingClientRect().top <= effectiveLine)
          current = index;
      });
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = targets.length - 1;
      }
      if (!jumping.current) setActive(current);
      setStuck(
        Math.abs(
          nav.getBoundingClientRect().top -
          parseFloat(getComputedStyle(nav).top),
        ) < 1,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  const place = useCallback(() => {
    const link = linkRefs.current[active];
    const list = listRef.current;
    if (!link || !list) return;
    // Measure against the list's scrolled content box (links sit in positioned <li>s, so offsetLeft is 0)
    const linkBox = link.getBoundingClientRect();
    const listBox = list.getBoundingClientRect();
    const x = linkBox.left - listBox.left - list.clientLeft + list.scrollLeft;
    setIndicator({
      x,
      y: linkBox.top - listBox.top - list.clientTop + list.scrollTop,
      w: linkBox.width,
      h: linkBox.height,
    });
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({
        left: x - (list.clientWidth - linkBox.width) / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  useEffect(() => {
    place();
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(place);
    observer.observe(list);
    document.fonts?.ready.then(place);
    return () => observer.disconnect();
  }, [place]);

  const jump = (event, href, index) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = reduce ? "auto" : "smooth";
    target.scrollIntoView({ behavior });
    history.replaceState(null, "", href);
    setActive(index);
    jumping.current = { target, behavior };
    // Only the page scroll ending releases the lock, not the nav strip scrolling sideways
    const release = (event) => {
      if (event && event.target !== document) return;
      jumping.current = false;
      clearTimeout(fallback);
      window.removeEventListener("scrollend", release);
    };
    // scrollend isn't in every browser yet, so a timeout releases the lock too
    const fallback = setTimeout(release, 1200);
    window.addEventListener("scrollend", release);
  };

  const setLinkRef = (index) => (node) => {
    linkRefs.current[index] = node;
  };

  return { navRef, listRef, setLinkRef, active, indicator, stuck, jump };
}
