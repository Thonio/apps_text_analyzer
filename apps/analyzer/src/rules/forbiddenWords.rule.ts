// Remove 10 points if text was forbidden words

export function forbiddenWordsRule(text: string): number {
  const forbiddenWords = ['fraude', 'illégal', 'faux']

  return forbiddenWords.some((w) => text.includes(w)) ? -10 : 0
}
