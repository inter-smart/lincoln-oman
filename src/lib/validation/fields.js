import { z } from "zod";
import { isPlainText, normalizeText } from "./patterns.js";

export const PLAIN_TEXT_MESSAGE =
  "Only plain text is allowed — remove HTML tags, code or special syntax.";

// Collapse runs of spaces/tabs, trim, normalise unicode. Newlines survive (message textarea).
function clean(value) {
  return normalizeText(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const required = (message) => z.string({ error: message }).transform(clean);

export const name = required("Please enter your name").pipe(
  z
    .string()
    .min(1, "Please enter your name")
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be 60 characters or fewer")
    .regex(
      /^[\p{L}\p{M}]+(?:(?:\.? |['’-])[\p{L}\p{M}]+)*\.?$/u,
      "Use letters only (spaces, apostrophes, hyphens and dots are fine)",
    )
    .refine(isPlainText, PLAIN_TEXT_MESSAGE),
);

export const email = required("Please enter your email").pipe(
  z
    .string()
    .min(1, "Please enter your email")
    .max(254, "Email is too long")
    .refine((v) => !v.includes(".."), "Enter a valid email address")
    .refine((v) => !/\s/.test(v), "Enter a valid email address")
    .pipe(z.email("Enter a valid email address"))
    .refine(isPlainText, PLAIN_TEXT_MESSAGE)
    .transform((v) => v.toLowerCase()),
);

// E.164 style: optional "+", 7-15 digits, no leading 0 after "+". Separators are accepted then removed.
export const phone = required("Please enter your phone number").pipe(
  z
    .string()
    .min(1, "Please enter your phone number")
    .regex(/^\+?[\d\s().-]+$/, "Use digits only (an optional + at the start)")
    .transform((v) => v.replace(/[\s().-]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\+?\d{7,15}$/, "Enter a valid phone number (7–15 digits)")
        .refine((v) => !v.startsWith("+0"), "Enter a valid phone number")
        .refine((v) => !/^\+?(\d)\1+$/.test(v), "Enter a valid phone number"),
    ),
);

const URL_LIKE = /(?:https?:\/\/|www\.)\S+/gi;

// Length-independent checks shared by the required and optional message fields.
const messageChecks = (schema) =>
  schema
    .refine(isPlainText, PLAIN_TEXT_MESSAGE)
    .refine(
      (v) => (v.match(URL_LIKE) ?? []).length <= 2,
      "Please include no more than 2 links",
    )
    .refine(
      (v) => !/(.)\1{9,}/su.test(v),
      "Please avoid long runs of repeated characters",
    );

export const subject = required("Please enter a subject").pipe(
  z
    .string()
    .min(1, "Please enter a subject")
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be 100 characters or fewer")
    .refine(isPlainText, PLAIN_TEXT_MESSAGE)
    .refine(
      (v) => (v.match(URL_LIKE) ?? []).length === 0,
      "Subject cannot contain links",
    ),
);

export const message = required("Please enter your message").pipe(
  messageChecks(
    z
      .string()
      .min(1, "Please enter your message")
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be 1000 characters or fewer"),
  ),
);

// Contact form: the message may be left empty, but anything typed is held to the same rules.
export const optionalMessage = z
  .string()
  .optional()
  .transform((v) => clean(v ?? ""))
  .pipe(
    messageChecks(
      z
        .string()
        .max(1000, "Message must be 1000 characters or fewer")
        .refine(
          (v) => v === "" || v.length >= 10,
          "Message must be at least 10 characters",
        ),
    ),
  );

// Dropdown labels (model, interested, time): short safe labels, never free text.
export function label(requiredMessage) {
  return required(requiredMessage).pipe(
    z
      .string()
      .min(1, requiredMessage)
      .max(60, "Selection is too long")
      .regex(/^[\p{L}\p{N}][\p{L}\p{N} &/.:+()-]*$/u, "Choose a valid option")
      .refine(isPlainText, PLAIN_TEXT_MESSAGE),
  );
}

export const optionalLabel = z
  .string()
  .optional()
  .transform((v) => clean(v ?? ""))
  .pipe(
    z
      .string()
      .max(60, "Selection is too long")
      .regex(
        /^(?:[\p{L}\p{N}][\p{L}\p{N} &/.:+()-]*)?$/u,
        "Choose a valid option",
      )
      .refine(isPlainText, PLAIN_TEXT_MESSAGE),
  );

// Vehicle id comes from /vehicle-models: digits only.
export const vehicle = required("Please choose a vehicle model").pipe(
  z
    .string()
    .min(1, "Please choose a vehicle model")
    .regex(/^\d{1,9}$/, "Choose a valid vehicle model"),
);

const DAY = 86_400_000;

// "yyyy-MM-dd" from the date picker. Not in the past, at most one year ahead.
// `now` is injectable for tests; one day of slack covers client/server time-zone differences.
export function bookingDate(now = () => new Date()) {
  return required("Please choose a date").pipe(
    z
      .string()
      .min(1, "Please choose a date")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date")
      .superRefine((value, ctx) => {
        const [y, m, d] = value.split("-").map(Number);
        const picked = Date.UTC(y, m - 1, d);
        const check = new Date(picked);
        if (
          check.getUTCFullYear() !== y ||
          check.getUTCMonth() !== m - 1 ||
          check.getUTCDate() !== d
        ) {
          ctx.addIssue({ code: "custom", message: "Choose a valid date" });
          return;
        }
        const t = now();
        const today = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
        if (picked < today - DAY)
          ctx.addIssue({
            code: "custom",
            message: "Date cannot be in the past",
          });
        else if (picked > today + 366 * DAY)
          ctx.addIssue({
            code: "custom",
            message: "Choose a date within the next year",
          });
      }),
  );
}

export const marketing = z.enum(["yes", "no"], {
  error: "Please choose Yes or No",
});

export const termsAccepted = z.literal(true, {
  error: "You must accept the terms and conditions",
});
