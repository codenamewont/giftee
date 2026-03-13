import { useState } from 'react';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';
import ExpiringSoonCard from './ExpiringSoonCard';
import type { ExpiringSoonGifticon } from '../types';

type Props = {
  title: string;
  items: ExpiringSoonGifticon[];
  urgentCount: number;
};

export default function ExpiringSoonSection({ title, items, urgentCount }: Props) {
  const [page, setPage] = useState(0);
  const { width } = useWindowDimensions();

  const CARD_GAP = 14;
  const SECTION_HORIZONTAL_PADDING = 16; // px-4
  const LIST_HORIZONTAL_PADDING = 4;
  const cardWidth = width - SECTION_HORIZONTAL_PADDING * 2 - LIST_HORIZONTAL_PADDING * 2;
  const snapInterval = cardWidth + CARD_GAP;

  return (
    <View className="gap-2 px-4">
      <View className="flex-row items-end gap-3">
        <Text className="font-pretBold text-[24px] leading-[29px] text-black">{title}</Text>
        {urgentCount > 0 && (
          <Text className="font-pretMedium text-[14px] leading-[17px] text-gray-text">
            7일 이내 만료 {urgentCount}개
          </Text>
        )}
      </View>

      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: LIST_HORIZONTAL_PADDING,
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
        renderItem={({ item }) => <ExpiringSoonCard {...item} width={cardWidth} />}
      />
      {/* 캐러셀 페이지 인디케이터 */}
      <View className="flex-row justify-center gap-[6px]">
        {items.map((_, i) => (
          <View
            key={i}
            className={
              i === page ? 'h-2 w-2 rounded-full bg-primary' : 'h-2 w-2 rounded-full bg-gray-ui'
            }
          />
        ))}
      </View>
    </View>
  );
}
