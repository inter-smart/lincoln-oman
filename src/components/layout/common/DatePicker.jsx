"use client";

import { format, parse } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Controlled by the form: `value` is "yyyy-MM-dd" (or ""), onChange gets the same format.
export default function DatePicker({
  id,
  label,
  className,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          aria-label={`${label} (required)`}
          aria-describedby={describedBy}
          className={`${className} flex items-center justify-between text-left ${date ? "" : "text-ink"} ${invalid ? "border-[#b3261e] outline-2 outline-offset-2 outline-[#b3261e]/0" : ""}`}
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
            onChange(d ? format(d, "yyyy-MM-dd") : "");
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
