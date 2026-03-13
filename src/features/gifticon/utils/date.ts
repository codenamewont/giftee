import type { DateString } from '../types';

// DateString을 Date로 변환
export function toDate(dateString: DateString): Date {
  const [y, m, d] = dateString.split('-').map(Number);

  if (!y || !m || !d) {
    return new Date(NaN);
  }
  return new Date(y, m - 1, d);
}

// Date를 DateString으로 변환
export function toDateString(date: Date): DateString {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}` as DateString;
}

// UI 표시용: YYYY-MM-DD -> YYYY.MM.DD
export function formatDate(date: DateString): string {
  return date.replaceAll('-', '.');
}

// 만료까지 남은 일수 계산
export function getDaysRemaining(expiresAt: DateString): number {
  const today = new Date().setHours(0, 0, 0, 0);
  const end = toDate(expiresAt).setHours(0, 0, 0, 0);
  return (end - today) / (1000 * 60 * 60 * 24);
}

// 만료 여부 판단
export function isExpired(expiresAt: DateString): boolean {
  return getDaysRemaining(expiresAt) < 0;
}

// n일 이내 만료인지 판단
export function isExpiringSoon(expiresAt: DateString, days: number): boolean {
  const remaining = getDaysRemaining(expiresAt);
  return 0 <= remaining && remaining <= days;
}
