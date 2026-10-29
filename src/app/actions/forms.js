"use server";

import { apiPost } from "@/lib/api/post";
import { ApiError } from "@/lib/api/request";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { schemas } from "@/lib/validation/forms";

// One entry per form: the Laravel endpoint and how validated UI values become its payload (lincoln-api.md).
// Field names differ per endpoint on purpose (phone_number, vehicle_id, consent flags): map them here only.
const forms = {
  contact: {
    endpoint: "/contact-enquiry",
    toPayload: (v) => ({
      name: v.name,
      email: v.email,
      phone_number: v.phone,
      message: v.message,
    }),
    fromApi: { phone_number: "phone" },
  },
  // Owners and Special Offers list share /page-enquiries; `type` tells the backend which page it came from.
  owners: {
    endpoint: "/page-enquiries",
    toPayload: (v) => ({
      name: v.name,
      email: v.email,
      subject: v.subject,
      message: v.message,
      type: "owners",
    }),
    fromApi: {},
  },
  offers: {
    endpoint: "/page-enquiries",
    toPayload: (v) => ({
      name: v.name,
      email: v.email,
      subject: v.subject,
      message: v.message,
      type: "offer",
    }),
    fromApi: {},
  },
  offer: {
    endpoint: "/special-offer-enquiries",
    toPayload: (v) => ({
      name: v.name,
      email: v.email,
      phone: v.phone,
      model: v.model,
      interested: v.interested,
      message: v.message,
    }),
    fromApi: {},
  },
  quote: {
    endpoint: "/vehicle-enquiries",
    toPayload: (v) => ({
      name: v.name,
      email: v.email,
      phone: v.phone,
      vehicle_id: Number(v.vehicle),
      message: v.message,
      commercial_consent: v.marketing === "yes",
      terms_accepted: v.agree,
    }),
    fromApi: {
      vehicle_id: "vehicle",
      commercial_consent: "marketing",
      terms_accepted: "agree",
    },
  },
  testDrive: {
    endpoint: "/test-drive-bookings",
    toPayload: (v) => ({
      name: v.name,
      email: v.email,
      phone: v.phone,
      vehicle_id: Number(v.vehicle),
      preferred_date: v.date,
      ...(v.time && { preferred_time: v.time }),
      message: v.message,
      receive_commercial_messages: v.marketing === "yes",
      agreed_to_terms: v.agree,
    }),
    fromApi: {
      vehicle_id: "vehicle",
      preferred_date: "date",
      preferred_time: "time",
      receive_commercial_messages: "marketing",
      agreed_to_terms: "agree",
    },
  },
};

const GENERIC = "Something went wrong. Please try again in a moment.";

// Laravel 422 body: { message, errors: { field: ["..."] } } -> { uiField: "first message" }
function fieldErrors(details, fromApi) {
  const out = {};
  for (const [key, messages] of Object.entries(details?.errors ?? {})) {
    const first = Array.isArray(messages) ? messages[0] : messages;
    if (typeof first === "string") out[fromApi[key] ?? key] = first;
  }
  return out;
}

/**
 * Submit a form. Re-validates with the same zod schema the browser used (never trust the client),
 * verifies the reCAPTCHA v3 token, then forwards to the PHP API (with the token as "g-recaptcha-response") with the server-only bearer token.
 * Returns { ok: true } or { ok: false, message, fieldErrors? }; never throws.
 */
export async function submitForm(formKey, values, token) {
  const form = forms[formKey];
  const schema = schemas[formKey];
  if (!form || !schema) return { ok: false, message: GENERIC };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join(".")] ??= issue.message;
    }

    console.log(`submitForm ${formKey} validation failed:`, errors);

    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: errors,
    };
  }

  // The token is forwarded to the API as "g-recaptcha-response". A v3 token can be verified only once, so
  // Next verifies it here only when RECAPTCHA_SECRET_KEY is set (leave it unset when the backend verifies).
  const verifyHere = Boolean(process.env.RECAPTCHA_SECRET_KEY);
  if (!token || (verifyHere && !(await verifyRecaptcha(token, formKey)))) {
    return {
      ok: false,
      message: "We couldn't verify you're human. Please refresh and try again.",
    };
  }

  try {
    await apiPost(form.endpoint, {
      ...form.toPayload(parsed.data),
      "g-recaptcha-response": token,
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof ApiError && error.status === 422) {
      console.warn(
        `submitForm ${formKey} rejected by API (422):`,
        error.details,
      );
      const errors = fieldErrors(error.details, form.fromApi);
      // Errors for keys the form has no input for (e.g. "g-recaptcha-response") would show nowhere: put them in the message.
      const shown = {};
      const unmatched = [];
      for (const [key, text] of Object.entries(errors)) {
        if (key in schema.shape) shown[key] = text;
        else unmatched.push(text);
      }
      return {
        ok: false,
        message: unmatched.length
          ? unmatched.join(" ")
          : Object.keys(shown).length
            ? "Please correct the highlighted fields."
            : (error.details?.message ??
              "Please correct the highlighted fields."),
        ...(Object.keys(shown).length && { fieldErrors: shown }),
      };
    }
    console.error(`submitForm ${formKey} failed:`, error.message);
    return { ok: false, message: GENERIC };
  }
}
