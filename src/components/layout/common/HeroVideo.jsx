"use client";

import { useEffect, useRef, useState } from "react";
import {
  pickVideoSource,
  playMuted,
  videoAllowed,
} from "@/components/layout/common/video";

// Hero background video. The poster image (rendered by the server) stays the LCP element.
// The video is only requested after load — on the visitor's first interaction or 4 s later,
// whichever comes first — so it never competes with the page's own loading, then it fades in.
// It pauses while the hero is off screen.
export default function HeroVideo({ sources }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !sources || !videoAllowed()) return;

    const triggers = [
      "pointermove",
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    let observer;
    let timer;
    const start = () => {
      if (observer) return;
      cleanupTriggers();
      video.src = pickVideoSource(sources);
      observer = new IntersectionObserver(([entry]) =>
        entry.isIntersecting ? playMuted(video) : video.pause(),
      );
      observer.observe(video);
    };
    const cleanupTriggers = () => {
      clearTimeout(timer);
      triggers.forEach((name) => window.removeEventListener(name, start));
    };
    const arm = () => {
      triggers.forEach((name) =>
        window.addEventListener(name, start, { once: true, passive: true }),
      );
      timer = setTimeout(start, 4000);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      cleanupTriggers();
      observer?.disconnect();
    };
  }, [sources]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
