import { useState } from 'react';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';
import ExpiringSoonCard from './ExpiringSoonCard';
import type { ExpiringSoonGifticon } from '../types';

type Props = {
  items: ExpiringSoonGifticon[];
};

export default function ExpiringSoonSection({ items }: Props) {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);

  const CARD_GAP = 14;
  const H_PADDING = 4;
  const snapInterval = 316;

  return (
    <View className="gap-2 px-4">
      <View className="flex-row items-end gap-3">
        <Text className="font-pretBold text-[24px] leading-[29px] text-black">
          곧 만료되는 쿠폰
        </Text>
        <Text className="font-pretMedium text-gray-text text-[14px] leading-[17px]">
          3일 이내 만료 2개
        </Text>
      </View>

      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: H_PADDING,
          gap: CARD_GAP,
        }}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        disableIntervalMomentum
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const nextPage = Math.round(x / snapInterval);
          setPage(nextPage);
        }}
        renderItem={({ item }) => <ExpiringSoonCard {...item} />}
      />
      {/* 캐러셀 페이지 인디케이터 */}
      <View className="flex-row justify-center gap-[6px]">
        {items.map((_, i) => (
          <View
            key={i}
            className={
              i === page ? 'bg-primary h-2 w-2 rounded-full' : 'bg-gray-ui h-2 w-2 rounded-full'
            }
          />
        ))}
      </View>
    </View>
  );
}
