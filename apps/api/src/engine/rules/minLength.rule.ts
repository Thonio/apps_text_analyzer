//Give 20 points if caracters is more thant 100

export function minLengthRule(text: string): number {
  return text.length >= 100 ? 20 : 0
}
