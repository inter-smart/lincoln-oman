"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { pickVideoSource, playMuted, videoAllowed } from "@/components/layout/common/video";

const StageContext = createContext(null);

// Model showcase background: the section photo crossfades to the video while the video card
// is hovered, or stays on video after a click/tap (click again to return to the photo).
// The server-rendered section content is passed through as children.
export default function ShowcaseStage({ video, children }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const active = (hovered || pinned) && requested;

  useEffect(() => {
    const element = ref.current;
    if (!element || !requested) return;
    if (active) playMuted(element);
    else element.pause();
  }, [active, requested]);

  const stage = {
    active,
    pinned,
    requested,
    hover(on) {
      if (on && !videoAllowed()) return;
      if (on) setRequested(true);
      setHovered(on);
    },
    toggle() {
      setRequested(true);
      setPinned((value) => !value);
    },
  };

  return (
    <StageContext.Provider value={stage}>
      <video
        ref={ref}
        src={requested ? pickVideoSource(video) : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${active && playing ? "opacity-100" : "opacity-0"}`}
      />
      {children}
    </StageContext.Provider>
  );
}

// The "video box" card: poster frame + play/pause control; drives the stage above and plays its own clip.
export function ShowcaseVideoCard({ item, label }) {
  const stage = useContext(StageContext);
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const active = stage?.active;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (active) playMuted(element);
    else element.pause();
  }, [active]);

  return (
    <button
      type="button"
      aria-pressed={stage?.pinned}
      aria-label={`Play ${label} video`}
      onPointerEnter={() => stage?.hover(true)}
      onPointerLeave={() => stage?.hover(false)}
      onClick={() => stage?.toggle()}
      className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
    >
      {item?.poster && <Image src={item.poster} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
      <video
        ref={ref}
        src={stage?.requested ? item?.video : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${active && playing ? "opacity-100" : "opacity-0"}`}
      />
      <span className="absolute top-1/2 left-1/2 grid size-[64px] -translate-1/2 place-items-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition-[opacity,scale] duration-300 group-hover:scale-110 group-aria-pressed:opacity-0 group-aria-pressed:group-hover:opacity-100">
        {stage?.pinned ? <Pause className="size-[22px]" aria-hidden /> : <Play className="ms-[3px] size-[22px]" aria-hidden />}
      </span>
    </button>
  );
}
