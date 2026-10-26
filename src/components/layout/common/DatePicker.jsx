"use client";

import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker({ name, label, className }) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${label} (required)`}
          className={`${className} flex items-center justify-between text-left ${date ? "" : "text-ink"}`}
        >
          {date ? format(date, "dd-MM-yyyy") : `${label}*`}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-4 shrink-0 text-ember"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <rect x="2" y="3" width="12" height="11" rx="1.5" />
            <path d="M2 6.5h12M5 1.5v3M11 1.5v3" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto bg-white p-0 text-ink">
        <Calendar
          mode="single"
          selected={date}
          disabled={{ before: today }}
          onSelect={(d) => {
            setDate(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
      {/* Native required check can't run on a button: the hidden input carries the value. */}
      <input
        name={name}
        value={date ? format(date, "yyyy-MM-dd") : ""}
        required
        readOnly
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
    </Popover>
  );
}
