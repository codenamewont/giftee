import { Text, View } from 'react-native';
import type { GifticonListItemData } from '@/features/gifticon/types';
import GifticonListItem from '@/features/gifticon/components/GifticonListItem';

type Props = {
  items: GifticonListItemData[];
  maxItems?: number;
};

export default function FavoriteGifticonsSection({ items, maxItems = 5 }: Props) {
  const visibleItems = items.slice(0, maxItems);

  return (
    <View className="gap-2 px-4">
      <Text className="font-pretBold text-[24px] leading-[29px] text-black">즐겨찾는 쿠폰</Text>
      <View className="gap-2 px-1">
        {visibleItems.map((item) => (
          <GifticonListItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
