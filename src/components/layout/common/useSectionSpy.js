"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAP = 24;

// Shared behaviour for sticky in-page navs (SectionTabs, SectionSideNav):
// - keeps `--spy-offset` on <html> in step with the fixed header,
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
  const fallbackRef = useRef(null);
  const stackedRef = useRef(isStacked);
  const lastScrollY = useRef(0);
  const scrollDir = useRef("down");
  const isInteractingRef = useRef(false);
  const touchTimeoutRef = useRef(null);
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    stackedRef.current = isStacked;
  }, [isStacked]);

  // Keep track of user touches on the horizontal list so programmatic scroll doesn't fight the user's gesture
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onPointerDown = () => {
      isInteractingRef.current = true;
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };

    const onPointerUp = () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 400);
    };

    list.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      list.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      delete document.documentElement.dataset.jumping;
    };
  }, []);

  // Sync active index with URL hash on mount and when hash changes
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const targetId = hash.slice(1);
      const idx = items.findIndex(
        (item) => item.href === hash || item.id === targetId,
      );
      if (idx >= 0) {
        setActive(idx);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [items]);

  // Update --spy-offset on root for scroll-mt of section targets.
  // Only runs on resize / container change or when jumping, avoiding style recalculation during scroll.
  const updateSpyOffset = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const isStacked = stackedRef.current();
    const header = document.querySelector("header");
    const headerH = header?.offsetHeight ?? 0;
    const navH = nav.offsetHeight || 60;
    const offset = isStacked ? navH : headerH + GAP;
    document.documentElement.style.setProperty("--spy-offset", `${offset}px`);
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    const nav = navRef.current;
    if (!header || !nav) return;

    updateSpyOffset();

    const observer = new ResizeObserver(() => {
      updateSpyOffset();
    });
    observer.observe(header);
    observer.observe(nav);
    window.addEventListener("resize", updateSpyOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSpyOffset);
      document.documentElement.style.removeProperty("--spy-offset");
    };
  }, [updateSpyOffset]);

  // Scrollspy & stuck state detection (throttled by requestAnimationFrame)
  useEffect(() => {
    const targets = items.map((item) =>
      document.getElementById(item.href.slice(1)),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const nav = navRef.current;
      const header = document.querySelector("header");
      if (!nav) return;

      const scrollY = window.scrollY;
      if (scrollY < lastScrollY.current) {
        scrollDir.current = "up";
      } else if (scrollY > lastScrollY.current) {
        scrollDir.current = "down";
      }
      lastScrollY.current = scrollY;

      const isStacked = stackedRef.current();
      const headerBottom = header
        ? Math.max(0, header.getBoundingClientRect().bottom)
        : 0;

      // The line below which a section is considered in reading view
      const line = isStacked
        ? nav.getBoundingClientRect().bottom
        : headerBottom + GAP;

      // Offset buffer so a section becomes active when entering the upper reading view.
      // Small hysteresis between scrolling down and up to prevent flicker at boundaries.
      const isUp = scrollDir.current === "up";
      const baseBuffer = Math.min(
        220,
        Math.max(80, (window.innerHeight - line) * 0.25),
      );
      const effectiveLine = line + baseBuffer + (isUp ? 30 : 0);

      const targets = items.map((item) =>
        document.getElementById(item.href.slice(1)),
      );

      let current = 0;
      targets.forEach((target, index) => {
        if (target && target.getBoundingClientRect().top <= effectiveLine) {
          current = index;
        }
      });

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = targets.length - 1;
      }

      if (!jumping.current) {
        setActive((prev) => (prev !== current ? current : prev));
      }

      // Sticky detection with hysteresis to prevent subpixel flickering:
      // It sticks when the nav top touches or passes stickyTop, and un-sticks when scrolled back past stickyTop + 3.
      const stickyTop = isStacked ? headerBottom : headerBottom + GAP;
      const navRect = nav.getBoundingClientRect();
      const isStuck =
        navRect.top <= stickyTop + 1.5 && navRect.bottom > stickyTop;

      setStuck((prev) => {
        if (!prev && isStuck) return true;
        if (prev && navRect.top > stickyTop + 3) return false;
        return prev;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  // Indicator measurement and intelligent centering without horizontal snapping fighting
  const place = useCallback(() => {
    const link = linkRefs.current[active];
    const list = listRef.current;
    if (!link || !list) return;

    // Calculate layout offset coordinates relative to list container (independent of scrollLeft)
    let x = link.offsetLeft;
    let y = link.offsetTop;
    let el = link.offsetParent;
    while (el && el !== list) {
      x += el.offsetLeft;
      y += el.offsetTop;
      el = el.offsetParent;
    }

    const w = link.offsetWidth;
    const h = link.offsetHeight;

    setIndicator({ x, y, w, h });

    // Smoothly scroll horizontal list only if item is partially hidden or offscreen,
    // and only if user is not currently touching/swiping the strip.
    if (list.scrollWidth > list.clientWidth && !isInteractingRef.current) {
      const itemLeft = x;
      const itemRight = x + w;
      const viewLeft = list.scrollLeft;
      const viewRight = viewLeft + list.clientWidth;
      const margin = 20;

      if (itemLeft < viewLeft + margin || itemRight > viewRight - margin) {
        list.scrollTo({
          left: Math.max(0, itemLeft - (list.clientWidth - w) / 2),
          behavior: "smooth",
        });
      }
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

    // Ensure spy-offset is fresh before jump lands
    updateSpyOffset();

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = reduce ? "auto" : "smooth";

    document.documentElement.dataset.jumping = "true";
    setActive(index);
    jumping.current = { target, behavior };

    const release = (e) => {
      if (e && e.target !== document && e.target !== window) return;
      delete document.documentElement.dataset.jumping;
      jumping.current = false;
      if (fallbackRef.current) {
        clearTimeout(fallbackRef.current);
        fallbackRef.current = null;
      }
      window.removeEventListener("scrollend", release);
      document.removeEventListener("scrollend", release);
    };

    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    fallbackRef.current = setTimeout(release, 1000);
    window.addEventListener("scrollend", release);
    document.addEventListener("scrollend", release);

    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(target, {
        immediate: reduce,
        onComplete: () => release(),
      });
    } else {
      target.scrollIntoView({ behavior });
    }
    history.replaceState(null, "", href);
  };

  const setLinkRef = (index) => (node) => {
    linkRefs.current[index] = node;
  };

  return { navRef, listRef, setLinkRef, active, indicator, stuck, jump };
}
