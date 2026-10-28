const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/**
 * Turns the API's "27 Oct 2026" into the design's "27.10.2026".
 * Returns { label, dateTime } where dateTime is the ISO date ("2026-10-27") for <time dateTime>.
 * If the value isn't in that format, label is the raw text and dateTime is undefined.
 */
export function formatDate(value) {
  const match = /^(\d{1,2})\s+([A-Za-z]{3})[A-Za-z]*\s+(\d{4})$/.exec(
    (value ?? "").trim(),
  );
  const month = match ? MONTHS.indexOf(match[2].toLowerCase()) + 1 : 0;
  if (!month) return { label: value, dateTime: undefined };

  const dd = match[1].padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = match[3];
  return { label: `${dd}.${mm}.${yyyy}`, dateTime: `${yyyy}-${mm}-${dd}` };
}


