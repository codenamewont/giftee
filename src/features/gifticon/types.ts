export type ISODateString = string;
export type GifticonStatus = 'active' | 'used' | 'expired';
export type GifticonCategory = 'cafe/dessert' | 'chicken/pizza' | 'convenience' | 'voucher' | 'etc';

export type Gifticon = {
  id: string;
  userId: string;

  brand: string;
  productName: string;
  category: GifticonCategory;

  price: number;
  expiresAt: ISODateString;

  status: GifticonStatus;
  usedAt?: ISODateString;

  isFavorite: boolean;

  imageUrl: string;
  imageHash: string; // 완전 동일 이미지 방지

  createdAt: ISODateString;
};

export type GifticonFilter = {
  status: GifticonStatus;
  favoriteOnly: boolean;
  categories: GifticonCategory[];
};
export type GifticonSortOption =
  | 'recommended'
  | 'expiringSoon'
  | 'priceHigh'
  | 'priceLow'
  | 'recent';
