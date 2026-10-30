# Lincoln Project — Web API Reference

Reference for integrating the Lincoln storefront (Next.js) with the Laravel 12 JSON REST API.

- **Base URL (dev):** `https://lincoln.dev2.intersmarthosting.in/api`
- **Response format:** `application/json`
- **Auth:** Bearer token (see the auth notes below; some form endpoints may not require it)
- **Forms:** all POST endpoints require a Google reCAPTCHA token (`g-recaptcha-response`)

> Response shapes are **not documented** in the source sheet. Do not invent field names. Inspect real responses (or ask the backend) before writing types for them.

> Never commit the API token or paste it into this file. It lives only in `.env.local`.

---

## Authentication & headers

GET requests:

```
Accept: application/json
Authorization: Bearer <API_TOKEN>
```

POST requests also send:

```
Content-Type: application/json
```

The source sheet's cURL examples for `/vehicle-enquiries`, `/test-drive-bookings` and `/page-enquiries` omit the `Authorization` header. It is unconfirmed whether these endpoints are public (reCAPTCHA-protected) or whether the omission is a documentation slip. **Default: send the Bearer token on every request** (an extra header is harmless).

### Integration rules (Next.js)

1. **Never expose the API token to the browser.** Store it in a server-only env variable and never prefix it with `NEXT_PUBLIC_`.
   ```
   LINCOLN_API_BASE_URL=https://lincoln.dev2.intersmarthosting.in/api
   LINCOLN_API_TOKEN=xxxxxxxx
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxxxxx   # public site key, safe for the browser
   ```
   The reCAPTCHA **secret** key belongs to the Laravel backend. The frontend only needs the public site key.
2. **Fetch GET endpoints server-side**, in Server Components or server functions. Mostly-static content (CMS pages, news, offers, settings) suits ISR/`revalidate`.
3. **Proxy form POSTs through Next.js Route Handlers** (e.g. `app/api/forms/<name>/route.ts`):
   - The browser generates the reCAPTCHA token and posts the form data plus the token to the Route Handler.
   - The Route Handler attaches the Bearer token and forwards the request to Laravel, including `g-recaptcha-response`.
   - The Route Handler returns Laravel's status and body to the browser, so 422 validation errors reach the form.
   - The browser must never call the Laravel API directly.
4. Centralize all calls in a single API client module with one fetch wrapper that sets the headers and handles errors.

---

## Endpoint summary

| # | Method | Endpoint | Purpose | Query params |
|---|--------|----------|---------|--------------|
| 1 | GET | `/home` | Homepage sliders, CMS, news, banner metadata, 4 vehicle summaries | — |
| 2 | GET | `/about-us` | About CMS, banner, news, vehicle info (image, video, feature icon/title) | — |
| 3 | GET | `/news` | News listing | `page` (optional) |
| 4 | GET | `/news/{slug}` | News detail | — |
| 5 | GET | `/certified` | Lincoln Certified page | — |
| 6 | GET | `/owners` | Owners page | — |
| 7 | GET | `/special-offers` | Special offers listing | `location_id` (optional) |
| 8 | GET | `/special-offers/{slug}` | Special offer detail | — |
| 9 | GET | `/galleries` | Gallery items | `page`, `per_page` (optional) |
| 10 | GET | `/contact-us` | Contact page | — |
| 11 | GET | `/policies` | Policy listing | — |
| 12 | GET | `/policies/{slug}` | Policy detail | — |
| 13 | GET | `/site-settings` | Global site settings (header/footer) | — |
| 14 | GET | `/social-links` | Social media links | — |
| 15 | GET | `/vehicles/{slug}` | Vehicle detail | — |
| 16 | GET | `/vehicle-models` | Vehicle model listing (source for vehicle dropdowns) | — |
| 17 | GET | `/request-quote` | Request a Quote page CMS | — |
| 18 | GET | `/test-drive` | Test Drive page CMS, banner metadata, vehicle models | — |
| 19 | POST | `/contact-enquiry` | Contact form | — |
| 20 | POST | `/special-offer-enquiries` | Special offer enquiry form | — |
| 21 | POST | `/vehicle-enquiries` | Request a Quote form | — |
| 22 | POST | `/test-drive-bookings` | Test drive booking form | — |
| 23 | POST | `/page-enquiries` | Shared enquiry form for Owners and Special Offers pages (`type`) | — |

### Suggested page → endpoint mapping

| Storefront page | Endpoint(s) |
|---|---|
| Layout (header/footer) | `/site-settings`, `/social-links` |
| Home | `/home` |
| About | `/about-us` |
| News list / detail | `/news?page=N`, `/news/{slug}` |
| Certified | `/certified` |
| Owners | `/owners` + form `/page-enquiries` (`type: "owners"`) |
| Offers list / detail | `/special-offers?location_id=N`, `/special-offers/{slug}` + form `/special-offer-enquiries` and/or `/page-enquiries` (`type: "offer"`). Which form goes where is unconfirmed; see open questions. |
| Gallery | `/galleries?page=N&per_page=N` |
| Contact | `/contact-us` + form `/contact-enquiry` |
| Policies list / detail | `/policies`, `/policies/{slug}` |
| Vehicle detail | `/vehicles/{slug}` |
| Request a Quote | `/request-quote`, `/vehicle-models` + form `/vehicle-enquiries` |
| Test Drive | `/test-drive` (includes vehicle models) + form `/test-drive-bookings` |

---

## GET endpoints — examples

```bash
curl --location 'https://lincoln.dev2.intersmarthosting.in/api/home' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN'
```

The same pattern applies to every GET endpoint. Examples with params:

```
GET /news?page=1
GET /news/example-slug
GET /special-offers?location_id=1
GET /special-offers/example-slug
GET /galleries?page=1&per_page=20
GET /policies/example-slug
GET /vehicles/example-slug
```

---

## Form endpoints (POST)

Every form payload includes:

| Field | Type | Notes |
|---|---|---|
| `g-recaptcha-response` | string | Token generated client-side by Google reCAPTCHA. Required on all forms. The sheet does not say whether it is v2 or v3. |

### 1. Contact Enquiry — `POST /contact-enquiry`

| Field | Type | Example |
|---|---|---|
| `name` | string | `"John Doe"` |
| `email` | string | `"john@example.com"` |
| `phone_number` | string | `"9876543210"` |
| `message` | string | `"I would like more information about your services."` |
| `g-recaptcha-response` | string | reCAPTCHA token |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone_number": "9876543210",
  "message": "I would like more information about your services.",
  "g-recaptcha-response": "YOUR_GENERATED_RECAPTCHA_TOKEN"
}
```

> ⚠️ This form uses `phone_number`. All other forms use `phone`.

### 2. Special Offer Enquiry — `POST /special-offer-enquiries`

| Field | Type | Example |
|---|---|---|
| `name` | string | `"John Doe"` |
| `email` | string | `"john@example.com"` |
| `phone` | string | `"9876543210"` |
| `model` | string | `"Lincoln Model A"` |
| `interested` | string | `"Special Offer"` |
| `message` | string | `"Please share more details about this special offer."` |
| `g-recaptcha-response` | string | reCAPTCHA token |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "model": "Lincoln Model A",
  "interested": "Special Offer",
  "message": "Please share more details about this special offer.",
  "g-recaptcha-response": "YOUR_GENERATED_RECAPTCHA_TOKEN"
}
```

### 3. Request a Quote — `POST /vehicle-enquiries`

| Field | Type | Example |
|---|---|---|
| `name` | string | `"John Doe"` |
| `email` | string | `"john@example.com"` |
| `phone` | string | `"9876543210"` |
| `vehicle_id` | integer | `1` |
| `message` | string | `"I would like more information about this vehicle."` |
| `commercial_consent` | boolean | `true` |
| `terms_accepted` | boolean | `true` |
| `g-recaptcha-response` | string | reCAPTCHA token |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "vehicle_id": 1,
  "message": "I would like more information about this vehicle.",
  "commercial_consent": true,
  "terms_accepted": true,
  "g-recaptcha-response": "YOUR_GENERATED_RECAPTCHA_TOKEN"
}
```

### 4. Test Drive Booking — `POST /test-drive-bookings`

| Field | Type | Example |
|---|---|---|
| `name` | string | `"John Doe"` |
| `email` | string | `"john@example.com"` |
| `phone` | string | `"9876543210"` |
| `vehicle_id` | integer | `1` |
| `preferred_date` | string, `YYYY-MM-DD` | `"2026-11-15"` |
| `preferred_time` | string | `"10:00 AM"` |
| `message` | string | `"I would like to book a test drive."` |
| `receive_commercial_messages` | boolean | `true` |
| `agreed_to_terms` | boolean | `true` |
| `g-recaptcha-response` | string | reCAPTCHA token |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "vehicle_id": 1,
  "preferred_date": "2026-11-15",
  "preferred_time": "10:00 AM",
  "message": "I would like to book a test drive.",
  "receive_commercial_messages": true,
  "agreed_to_terms": true,
  "g-recaptcha-response": "YOUR_GENERATED_RECAPTCHA_TOKEN"
}
```

> The source sheet's JSON body example shows `vehicle_id` as the string `"1"`, but the updated cURL sends the integer `1`. Send an integer.

### 5. Page Enquiry (Owners & Special Offers) — `POST /page-enquiries`

| Field | Type | Example |
|---|---|---|
| `name` | string | `"John Doe"` |
| `email` | string | `"john@example.com"` |
| `subject` | string | `"Special Offer Enquiry"` |
| `message` | string | `"Please share more details."` |
| `type` | enum: `"owners"` \| `"offer"` | `"offer"` |
| `g-recaptcha-response` | string | reCAPTCHA token |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Special Offer Enquiry",
  "message": "Please share more details.",
  "type": "offer",
  "g-recaptcha-response": "YOUR_GENERATED_RECAPTCHA_TOKEN"
}
```

> The source sheet does not state the method (POST is implied by the request body), and its example uses the placeholder host `your-domain.com`. Use the configured base URL. This form has no phone field.

### Example cURL (POST)

```bash
curl --request POST 'https://lincoln.dev2.intersmarthosting.in/api/vehicle-enquiries' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data '{"name":"John Doe","email":"john@example.com","phone":"9876543210","vehicle_id":1,"message":"I would like more information about this vehicle.","commercial_consent":true,"terms_accepted":true,"g-recaptcha-response":"YOUR_GENERATED_RECAPTCHA_TOKEN"}'
```

### Form handling notes

- Laravel validation errors are expected to return **HTTP 422** in the default format `{ "message": "...", "errors": { "field": ["..."] } }`. This is not confirmed in the source sheet, so verify it against a real response. A failed reCAPTCHA check will likely surface as a 422 error on `g-recaptcha-response`.
- reCAPTCHA tokens are single-use and expire after about 2 minutes. Generate a fresh token on every submit, and also after a failed submit before retrying.
- Populate vehicle dropdowns from `/vehicle-models` (or the vehicle models returned by `/test-drive`).
- Field names differ between forms. Map them per form and do not assume one shared payload shape.

---

## Known issues / open questions (confirm with backend)

1. **reCAPTCHA version.** The sheet doesn't say whether the backend expects v2 (checkbox) or v3 (invisible, score-based). This decides the frontend implementation, and the backend team must provide the matching site key.
2. **Auth on forms.** The examples for `/vehicle-enquiries`, `/test-drive-bookings` and `/page-enquiries` omit the Bearer token, while `/contact-enquiry` and `/special-offer-enquiries` include it. It is unclear whether that difference is intended.
3. **Special offer forms overlap.** It is unclear which form the Special Offers pages should use, `/special-offer-enquiries` or `/page-enquiries` with `type: "offer"`. One may serve the listing page and the other the detail page.
4. **Inconsistent phone field.** Contact uses `phone_number`, while Special Offer, Quote and Test Drive use `phone`. Page Enquiry has no phone field.
5. **Inconsistent consent fields.** Quote uses `commercial_consent` / `terms_accepted`, while Test Drive uses `receive_commercial_messages` / `agreed_to_terms`.
6. **Undocumented required fields and validation rules.** The sheet gives no required fields, max lengths, or the accepted `preferred_time` format (`"10:00 AM"` vs `"10:00"`).
7. **No response schemas** are given for any endpoint. Image URL format (absolute or relative) and the pagination meta structure are unknown.
8. **Undocumented `location_id` source.** No locations endpoint exists in the sheet; check `/contact-us` or `/site-settings`.
9. **Inconsistent pagination params.** `/news` accepts `page` only, while `/galleries` accepts `page` and `per_page`.
10. **Token required on public GETs.** This forces all content fetching to happen server-side.
11. **Dev host only.** The production base URL is not specified. Confirm methods and middleware against `routes/api.php` before release.

---

## Changelog

- **Sheet revision 2:**
  - Added `g-recaptcha-response` to all POST forms.
  - Added `POST /page-enquiries` (`type`: `owners` | `offer`).
  - Removed the `Authorization` header from the cURL examples for `/vehicle-enquiries` and `/test-drive-bookings`.
  - Changed the Test Drive cURL to send `vehicle_id` (integer) instead of `vehicle_model`.
