// Shared rules for the decorative videos: they never load during page load, only on demand,
// and they stay off for visitors who ask for reduced motion or reduced data.

export function videoAllowed() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !navigator.connection?.saveData
  );
}

// { mobile, desktop } → the file for this screen, so phones never pull the 1080p encode.
export function pickVideoSource(sources) {
  if (typeof sources === "string") return sources;
  return window.matchMedia("(min-width: 768px)").matches
    ? sources?.desktop
    : sources?.mobile;
}

export function playMuted(video) {
  video.muted = true;
  video.play().catch(() => {});
}
