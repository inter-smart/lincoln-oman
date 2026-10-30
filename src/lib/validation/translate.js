// The zod schemas carry English messages (and their tests assert on them). The visitor sees the same sentence
// translated: dictionaries.validation maps each English message to its text in the active language.
export function translateMessage(messages, message) {
  return messages?.[message] ?? message;
}
