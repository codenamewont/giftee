import type { GifticonCategory } from '../types';

const RULES: Array<{ category: GifticonCategory; keywords: string[] }> = [
  { category: 'voucher', keywords: ['금액권', '상품권', '기프트카드'] },
  { category: 'convenience', keywords: ['편의점', 'cu', 'gs25', '세븐일레븐', '이마트24'] },
  {
    category: 'chicken/pizza',
    keywords: ['치킨', '피자', 'bbq', '교촌', 'bhc', '굽네', '도미노', '피자헛', '파파존스'],
  },
  {
    category: 'cafe/dessert',
    keywords: [
      '스타벅스',
      '투썸',
      '이디야',
      '메가커피',
      '빽다방',
      '배스킨',
      '설빙',
      '하겐다즈',
      '커피',
      '아메리카노',
      '라떼',
      '케이크',
      '빙수',
      '아이스크림',
    ],
  },
];

export function inferGifticonCategory(brand: string, productName: string): GifticonCategory {
  const text = `${brand} ${productName}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => text.includes(k))) return rule.category;
  }
  return 'etc';
}
