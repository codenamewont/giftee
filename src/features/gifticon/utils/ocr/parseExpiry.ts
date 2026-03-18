export function parseExpiry(lines: string[]): string {
  const text = lines.join(' ');

  // 기간 날짜
  const rangeMatch = text.match(
    /(20\d{2,3})[.\-/\s,](\d{1,3})[.\-/\s,](\d{1,3})\s*~\s*(20\d{2,3})[.\-/\s,](\d{1,3})[.\-/\s,](\d{1,3})/
  );

  if (rangeMatch) {
    const year = rangeMatch[4].slice(0, 4);
    const month = rangeMatch[5].slice(0, 2).padStart(2, '0');
    const day = rangeMatch[6].slice(0, 2).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // 단일 날짜
  const match = text.match(/(20\d{2,3})[.\-/\s,](\d{1,3})[.\-/\s,](\d{1,3})/);

  if (!match) return '';

  const year = match[1].slice(0, 4);
  const month = match[2].slice(0, 2).padStart(2, '0');
  const day = match[3].slice(0, 2).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
