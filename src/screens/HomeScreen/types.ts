import type { Gifticon } from '@/features/gifticon/types';

export type ExpiringSoonGifticon = Pick<
  Gifticon,
  'id' | 'brand' | 'productName' | 'expiresAt' | 'imageUrl'
>;
