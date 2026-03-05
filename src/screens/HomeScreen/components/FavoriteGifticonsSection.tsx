import { Text, View } from 'react-native';
import type { GifticonListItemData } from '@/features/gifticon/types';
import GifticonListItem from '@/features/gifticon/components/GifticonListItem';

type Props = {
  items: GifticonListItemData[];
  maxItems?: number;
};

export default function FavoriteGifticonsSection({ items, maxItems = 5 }: Props) {
  const activeItems = items.filter((item) => item.status === 'active');
  const visibleItems = activeItems.slice(0, maxItems);

  if (visibleItems.length === 0) {
    return (
      <View className="gap-2 px-4">
        <Text className="font-pretBold text-[24px] leading-[29px] text-black">즐겨찾는 쿠폰</Text>
        <Text>TODO</Text>
      </View>
    );
  }

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
