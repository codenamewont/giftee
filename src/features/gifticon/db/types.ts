// Supabase 'gifticons' 테이블 Row 타입
import { Gifticon } from '../types';

export type GifticonRow = {
  id: string;
  user_id: string;

  brand: string;
  product_name: string;
  category: Gifticon['category'];

  price: number;
  expires_at: string;

  status: Gifticon['status'];
  used_at: string | null;

  is_favorite: boolean;

  image_url: string;
  image_hash: string;

  created_at: string;
};
