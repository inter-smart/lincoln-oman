/** "Switch language to {language}" + { language: "العربية" } -> "Switch language to العربية". */
export function format(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}
