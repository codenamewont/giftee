import type { Gifticon, GifticonFilter } from '../types';

export function applyGifticonFilter(list: Gifticon[], filter: GifticonFilter): Gifticon[] {
  return list.filter((gifticon) => {
    if (filter.status !== gifticon.status) return false;
    if (filter.favoriteOnly && !gifticon.isFavorite) return false;
    if (filter.categories.length > 0 && !filter.categories.includes(gifticon.category))
      return false;

    return true;
  });
}
