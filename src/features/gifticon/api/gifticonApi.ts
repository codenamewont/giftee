import { supabase } from '@/lib/supabase';
import type { Gifticon } from '../types';
import type { GifticonRow } from '../db/types';
import { inferGifticonCategory } from '../utils/category';
import { toGifticon, toGifticonInsertRow, toGifticonUpdateRow } from '../db/mapper';

type CreateGifticonInput = Pick<
  Gifticon,
  'brand' | 'productName' | 'price' | 'expiresAt' | 'imageUrl' | 'imageHash'
>;

// CREATE
async function createGifticon(input: CreateGifticonInput) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!session) throw new Error('로그인이 필요합니다.');

  const category = inferGifticonCategory(input.brand, input.productName);

  const payload = toGifticonInsertRow({
    userId: session.user.id,
    brand: input.brand,
    productName: input.productName,
    category,
    price: input.price,
    expiresAt: input.expiresAt,
    imageUrl: input.imageUrl,
    imageHash: input.imageHash,
  });

  const { error } = await supabase.from('gifticons').insert(payload);
  if (error) throw error;
}

// createSignedImageUrl
async function createSignedImageUrl(imagePath: string) {
  const { data, error } = await supabase.storage.from('images').createSignedUrl(imagePath, 60 * 60);

  if (error) throw error;
  return data.signedUrl;
}

// READ
async function readGifticons() {
  const { data, error } = await supabase.from('gifticons').select('*');
  if (error) throw error;

  const rows = (data ?? []) as GifticonRow[];

  const gifticons = await Promise.all(
    rows.map(async (row) => {
      const signedImageUrl = await createSignedImageUrl(row.image_url);

      return toGifticon({
        ...row,
        image_url: signedImageUrl,
      });
    })
  );

  return gifticons;
}

async function readGifticonDetail(id: string) {
  if (!id) throw new Error('id가 필요합니다.');

  const { data, error } = await supabase.from('gifticons').select('*').eq('id', id).single();
  if (error) throw error;

  const row = data as GifticonRow;
  const signedImageUrl = await createSignedImageUrl(row.image_url);

  return toGifticon({
    ...row,
    image_url: signedImageUrl,
  });
}

// UPDATE
async function updateGifticon(id: string, patch: Parameters<typeof toGifticonUpdateRow>[0]) {
  if (!id) throw new Error('id가 필요합니다.');

  const payload = toGifticonUpdateRow(patch);

  const { error } = await supabase.from('gifticons').update(payload).eq('id', id);
  if (error) throw error;
}

// DELETE
async function deleteGifticon(id: string) {
  if (!id) throw new Error('id가 필요합니다.');

  const { error } = await supabase.from('gifticons').delete().eq('id', id);
  if (error) throw error;
}

export const gifticonApi = {
  create: createGifticon,
  read: readGifticons,
  readDetail: readGifticonDetail,
  update: updateGifticon,
  delete: deleteGifticon,
};
