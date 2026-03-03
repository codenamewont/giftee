import { GifticonRow } from './types';
import type { DateString, DateTimeString, Gifticon } from '../types';

// DB Row를 Gifticon 도메인 모델로 매핑
export const toGifticon = (row: GifticonRow): Gifticon => ({
  id: row.id,
  userId: row.user_id,

  brand: row.brand,
  productName: row.product_name,
  category: row.category,

  price: row.price,
  expiresAt: row.expires_at as DateString,

  status: row.status,
  usedAt: row.used_at ?? undefined,

  isFavorite: row.is_favorite,

  imageUrl: row.image_url,
  imageHash: row.image_hash,

  createdAt: row.created_at,
});

// Gifticon 도메인 모델을 DB Insert Row 형태로 매핑
export const toGifticonInsertRow = (input: {
  userId: string;
  brand: Gifticon['brand'];
  productName: Gifticon['productName'];
  category: Gifticon['category'];
  price: Gifticon['price'];
  expiresAt: Gifticon['expiresAt'];
  imageUrl: Gifticon['imageUrl'];
  imageHash: Gifticon['imageHash'];
}): Omit<GifticonRow, 'id' | 'status' | 'used_at' | 'is_favorite' | 'created_at'> => ({
  user_id: input.userId,
  brand: input.brand,
  product_name: input.productName,
  category: input.category,
  price: input.price,
  expires_at: input.expiresAt,
  image_url: input.imageUrl,
  image_hash: input.imageHash,
});

// Gifticon 도메인 모델을 DB Update Row 형태로 매핑
export const toGifticonUpdateRow = (
  patch: Partial<
    Pick<
      Gifticon,
      'brand' | 'productName' | 'category' | 'price' | 'expiresAt' | 'status' | 'isFavorite'
    >
  > & { usedAt?: Gifticon['usedAt'] | null } // 사용완료 취소를 위해 usedAt에 null 허용
): Partial<Omit<GifticonRow, 'id' | 'user_id' | 'image_url' | 'image_hash' | 'created_at'>> => ({
  brand: patch.brand,
  product_name: patch.productName,
  category: patch.category,
  price: patch.price,
  expires_at: patch.expiresAt,
  status: patch.status,
  used_at: patch.usedAt,
  is_favorite: patch.isFavorite,
});
