import "server-only";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

/**
 * Verify a reCAPTCHA v3 token server-side. Returns true only for a successful, action-matching token
 * with a score of at least MIN_SCORE. Never throws: any failure (missing secret, network) is a rejection.
 */
export async function verifyRecaptcha(token, action) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token || typeof token !== "string") return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    const json = await res.json();
    const ok =
      json.success === true &&
      json.action === action &&
      json.score >= MIN_SCORE;
    if (!ok) {
      console.warn("reCAPTCHA rejected:", {
        success: json.success,
        action: json.action,
        expectedAction: action,
        score: json.score,
        errors: json["error-codes"],
      });
    }
    return ok;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error.message);
    return false;
  }
}
