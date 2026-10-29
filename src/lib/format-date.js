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

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Turns the API's ISO date ("2027-01-07") into the design's "Jan 7, 2027".
 * Returns { label, dateTime } where dateTime is the ISO date for <time dateTime>.
 * If the value isn't an ISO date, label is the raw text and dateTime is undefined.
 */
export function formatExpiry(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec((value ?? "").trim());
  const month = match ? Number(match[2]) : 0;
  const day = match ? Number(match[3]) : 0;
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return { label: value, dateTime: undefined };
  }

  return {
    label: `${MONTH_NAMES[month - 1]} ${day}, ${match[1]}`,
    dateTime: `${match[1]}-${match[2]}-${match[3]}`,
  };
}
