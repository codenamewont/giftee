import { Pressable, SectionList, Text, View } from 'react-native';
import type { GifticonListItemData } from '@/features/gifticon/types';
import GifticonListItem from '@/features/gifticon/components/GifticonListItem';

export type CouponBoxSection = {
  title: string;
  data: GifticonListItemData[];
};

type Props = {
  sections: CouponBoxSection[];
  sortLabel?: string;
  onPressSort?: () => void;
};

export default function CouponBoxList({ sections, sortLabel = '추천순', onPressSort }: Props) {
  return (
    <SectionList
      className="flex-1"
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 40,
      }}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderSectionHeader={({ section }) => {
        return (
          <View
            className={`${section === sections[0] ? '' : 'mt-10'} mb-2 flex-row items-center justify-between`}>
            <Text className="p-[10px] font-pretBold text-[16px] leading-[19px] text-black">
              {section.title}
            </Text>

            {section.title === '사용 가능 쿠폰' && (
              // TODO: 정렬 옵션 UI 구현 시 별도 컴포넌트로 분리
              <Pressable onPress={onPressSort}>
                <Text>{sortLabel}</Text>
              </Pressable>
            )}
          </View>
        );
      }}
      renderItem={({ item }) => (
        <View className="px-1">
          <GifticonListItem item={item} />
        </View>
      )}
      ListEmptyComponent={<Text>TODO: 쿠폰 없음 UI</Text>}></SectionList>
  );
}
