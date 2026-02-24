import type { ISODateString } from '../types';

// ISO 문자열을 Date로 변환
export function toDate(dateString: ISODateString): Date {
  return new Date(dateString);
}

// 만료까지 남은 일수 계산
export function getDaysRemaining(expiresAt: ISODateString): number {
  const today = new Date().setHours(0, 0, 0, 0);
  const end = toDate(expiresAt).setHours(0, 0, 0, 0);
  return (end - today) / (1000 * 60 * 60 * 24);
}

// 만료 여부 판단
export function isExpired(expiresAt: ISODateString): boolean {
  return getDaysRemaining(expiresAt) < 0;
}

// n일 이내 만료인지 판단
export function isExpiringSoon(expiresAt: ISODateString, days: number): boolean {
  const remaining = getDaysRemaining(expiresAt);
  return 0 <= remaining && remaining <= days;
}
