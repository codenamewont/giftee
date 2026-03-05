export type DateString = `${number}-${number}-${number}`;
export type DateTimeString = string;
export type GifticonStatus = 'active' | 'used' | 'expired';
export type GifticonCategory = 'cafe/dessert' | 'chicken/pizza' | 'convenience' | 'voucher' | 'etc';

export type Gifticon = {
  id: string;
  userId: string;

  brand: string;
  productName: string;
  category: GifticonCategory;

  price: number;
  expiresAt: DateString;

  status: GifticonStatus;
  usedAt?: DateTimeString;

  isFavorite: boolean;

  imageUrl: string;
  imageHash: string; // 완전 동일 이미지 방지

  createdAt: DateTimeString;
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

export type GifticonListItemData = Pick<
  Gifticon,
  'id' | 'brand' | 'productName' | 'expiresAt' | 'status' | 'imageUrl'
>;
