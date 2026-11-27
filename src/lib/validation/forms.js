import { z } from "zod";
import {
  bookingDate,
  email,
  label,
  marketing,
  message,
  name,
  optionalLabel,
  phone,
  subject,
  termsAccepted,
  vehicle,
} from "./fields.js";

// Value shapes use the UI field names; src/app/actions/forms.js maps them to the Laravel payloads (lincoln-api.md).
export const contactSchema = z.object({
  name,
  email,
  phone,
  message,
});

// Owners and Special Offers list: POST /page-enquiries (no phone; `type` is added in the action).
export const pageEnquirySchema = z.object({
  name,
  email,
  subject,
  message,
});

export const offerSchema = z.object({
  name,
  email,
  phone,
  model: label("Please choose a model"),
  interested: label("Please choose what you are interested in"),
  message,
});

export const quoteSchema = z.object({
  name,
  email,
  phone,
  vehicle,
  message,
  marketing,
  agree: termsAccepted,
});

export const testDriveSchema = z.object({
  name,
  email,
  phone,
  vehicle,
  date: bookingDate(),
  time: optionalLabel,
  message,
  marketing,
  agree: termsAccepted,
});

export const schemas = {
  contact: contactSchema,
  owners: pageEnquirySchema,
  offers: pageEnquirySchema,
  offer: offerSchema,
  quote: quoteSchema,
  testDrive: testDriveSchema,
};
