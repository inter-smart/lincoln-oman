// Plain-text guards for every free-text form field. Pure (no server-only, no "@/" imports) so node --test runs it.
// Callers get a boolean; the message shown to the visitor lives in fields.js.

const ZERO_WIDTH = /[​-‏‪-‮⁠-⁤﻿]/g;
// Control characters except \t \n \r
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const NAMED_ENTITIES = { lt: "<", gt: ">", quot: '"', apos: "'", amp: "&" };

// Undo entity / percent encoding (twice, for double-encoded payloads) so "&lt;script&gt;" and "%3Cscript%3E" are tested as "<script>".
function decode(value) {
  let out = value;
  for (let i = 0; i < 2; i += 1) {
    out = out
      .replace(/&#x([0-9a-f]+);?/gi, (_, hex) =>
        String.fromCodePoint(parseInt(hex, 16) || 0),
      )
      .replace(/&#(\d+);?/g, (_, dec) => String.fromCodePoint(Number(dec) || 0))
      .replace(
        /&(lt|gt|quot|apos|amp);?/gi,
        (_, name) => NAMED_ENTITIES[name.toLowerCase()],
      );
    try {
      out = decodeURIComponent(out);
    } catch {
      // malformed percent sequence: keep what we have
    }
  }
  return out;
}

/** NFKC-normalise (folds full-width "＜script＞" to ASCII) and drop invisible characters. */
export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(ZERO_WIDTH, "");
}

const MARKUP = [
  /<\s*\/?\s*[a-z!?]/i, // <tag, </tag, <!-- , <?php
  /\bjavascript\s*:/i,
  /\bvbscript\s*:/i,
  /\bdata\s*:\s*text\/html/i,
  /\bon[a-z]{3,}\s*=/i, // onerror=, onclick= …
  /\bsrcdoc\s*=/i,
  /expression\s*\(/i,
];

const CODE = [
  /\{\{|\}\}|\$\{|<%|%>|\{%|%\}/, // template engines
  /`/, // template literals / shell substitution
  /\b(?:eval|settimeout|setinterval|alert|prompt|confirm|atob)\s*\(/i,
  /\bfunction\s*\w*\s*\(/i,
  /=>/,
  /\b(?:const|let|var)\s+[\w$]+\s*=/i,
  /\b(?:import|require)\s*\(|\bimport\s+[\w{*].*\bfrom\b/i,
  /\b(?:document|window|process|global)\s*\.\s*\w+/i,
  /\bconsole\s*\.\s*\w+/i,
  /\b(?:system|exec|passthru|shell_exec|popen)\s*\(/i,
  /\$_(?:GET|POST|REQUEST|SERVER|COOKIE)\b/i,
  /\.\.[\\/]/, // path traversal
  /\\x[0-9a-f]{2}|\\u[0-9a-f]{4}/i, // escape-sequence smuggling
  // SQL
  /['"]\s*(?:or|and)\s+['"\w(]+\s*(?:=|like|>|<)/i, // ' OR 1=1
  /\bunion\s+(?:all\s+)?select\b/i,
  /\bselect\s+(?:\*|[\w.]+(?:\s*,\s*[\w.]+)*)\s+from\s+[\w.]+/i,
  /\b(?:drop|truncate|alter)\s+(?:table|database|schema)\b/i,
  /\binsert\s+into\b|\bdelete\s+from\b|\bupdate\s+\w+\s+set\b/i,
  /;\s*(?:drop|select|insert|update|delete|exec|shutdown)\b/i,
  /['"]\s*;?\s*(?:--|#)|\/\*[\s\S]*?\*\//, // quote followed by comment, /* */
  /\bsleep\s*\(\s*\d+|\bbenchmark\s*\(|\bwaitfor\s+delay\b/i,
];

/** True when the text carries HTML/XML tags, script URLs or inline event handlers (also when entity/percent encoded). */
export function containsMarkup(value) {
  const text = decode(normalizeText(value));
  return MARKUP.some((re) => re.test(text));
}

/** True when the text looks like source code, template syntax, SQL, shell or path-traversal input, or holds control characters. */
export function containsCode(value) {
  const text = decode(normalizeText(value));
  return CONTROL.test(text) || CODE.some((re) => re.test(text));
}

/** Shared "plain text only" check used by every free-text field. */
export function isPlainText(value) {
  return !containsMarkup(value) && !containsCode(value);
}
