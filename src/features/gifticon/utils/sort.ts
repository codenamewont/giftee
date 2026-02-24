import type { Gifticon, GifticonSortOption } from '../types';
import { getDaysRemaining } from './date';

function getRecommendationScore(g: Gifticon): number {
  return -getDaysRemaining(g.expiresAt) * 30 + g.price / 100 + (g.isFavorite ? 20 : 0);
}

export function sortGifticons(list: Gifticon[], sortOption: GifticonSortOption): Gifticon[] {
  const listToSort = [...list];

  switch (sortOption) {
    case 'recommended':
      return listToSort.sort((a, b) => getRecommendationScore(b) - getRecommendationScore(a));
    case 'expiringSoon':
      return listToSort.sort(
        (a, b) => getDaysRemaining(a.expiresAt) - getDaysRemaining(b.expiresAt)
      );
    case 'priceHigh':
      return listToSort.sort((a, b) => b.price - a.price);
    case 'priceLow':
      return listToSort.sort((a, b) => a.price - b.price);
    case 'recent':
      return listToSort.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return listToSort;
  }
}
