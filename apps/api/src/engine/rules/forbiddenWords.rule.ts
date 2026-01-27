// Remove 10 points if text was forbidden words

export function forbiddenWordsRule(text: string): number {
  const forbiddenWords = ['words1', 'words2', 'words3']

  return forbiddenWords.some((w) => text.includes(w)) ? -10 : 0
}
