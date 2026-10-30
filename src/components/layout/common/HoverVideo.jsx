"use client";

import { useEffect, useRef, useState } from "react";
import { playMuted, videoAllowed } from "@/components/layout/common/video";

// Plays over its parent card while the card is hovered or focused, then fades out and rewinds.
// Nothing is downloaded until the first hover, so the card costs no page-load bandwidth.
export default function HoverVideo({ src }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!card || !videoAllowed()) return;

    const enter = () => {
      setRequested(true);
      setActive(true);
    };
    const leave = () => setActive(false);
    const events = [
      ["pointerenter", enter],
      ["focus", enter],
      ["pointerleave", leave],
      ["blur", leave],
    ];
    events.forEach(([name, handler]) => card.addEventListener(name, handler));
    return () =>
      events.forEach(([name, handler]) =>
        card.removeEventListener(name, handler),
      );
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !requested) return;
    if (active) playMuted(video);
    else video.pause();
  }, [active, requested]);

  return (
    <video
      ref={ref}
      src={requested ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      // back to the first frame once the fade-out has finished, so the next hover starts fresh
      onTransitionEnd={(event) =>
        !active && (event.currentTarget.currentTime = 0)
      }
      className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${active && playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
