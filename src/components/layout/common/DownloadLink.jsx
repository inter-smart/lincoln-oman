"use client";

import { useSyncExternalStore } from "react";
import { useLabels } from "@/components/layout/common/I18nProvider";
import { cn } from "@/lib/utils";

// "busy" or "failed" per URL, shared by every link to the same file, so one file downloads once at a time.
const statuses = new Map();
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setStatus(href, status) {
  if (status) statuses.set(href, status);
  else statuses.delete(href);
  listeners.forEach((listener) => listener());
}

// Fetched here rather than by the browser, so we know when the file has arrived (or failed).
async function download(href) {
  if (statuses.get(href) === "busy") return;
  setStatus(href, "busy");
  try {
    const response = await fetch(href);
    if (!response.ok) throw new Error(`${response.status}`);
    const name = response.headers
      .get("content-disposition")
      ?.match(/filename="([^"]+)"/)?.[1];
    const url = URL.createObjectURL(await response.blob());
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name ?? "download.pdf";
    anchor.click();
    // Not revoked at once: the browser may still be reading it.
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    setStatus(href);
  } catch (error) {
    console.error(`Download ${href} failed:`, error.message);
    setStatus(href, "failed");
  }
}

// A real <a download> (works without JS) that shows progress and ignores repeat clicks. `children` is the icon.
export default function DownloadLink({ href, label, className, children }) {
  const labels = useLabels();
  const status = useSyncExternalStore(
    subscribe,
    () => statuses.get(href),
    () => undefined,
  );
  const busy = status === "busy";

  function onClick(event) {
    // Modified clicks keep the browser's own behaviour.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    download(href);
  }

  return (
    <a
      href={href}
      download
      onClick={onClick}
      aria-busy={busy || undefined}
      aria-disabled={busy || undefined}
      className={cn(className, "aria-busy:cursor-wait")}
    >
      <span aria-live="polite">
        {busy
          ? labels.downloading
          : status === "failed"
            ? labels.downloadFailed
            : label}
      </span>
      {children}
    </a>
  );
}
