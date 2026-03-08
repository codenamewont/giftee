import { ScrollView, Pressable, Text, View } from 'react-native';
import type { GifticonCategory } from '@/features/gifticon/types';
import type { ReactNode } from 'react';
import ChevronRight from '@/assets/icons/chevron-right.svg';

const CATEGORY_OPTIONS = [
  { key: 'cafe/dessert', label: '카페/디저트' },
  { key: 'chicken/pizza', label: '치킨/피자' },
  { key: 'convenience', label: '편의점' },
  { key: 'voucher', label: '상품권' },
  { key: 'etc', label: '기타' },
] as const satisfies { key: GifticonCategory; label: string }[];

type Props = {
  favoriteOnly: boolean;
  selectedCategories: GifticonCategory[];
  onToggleFavorite: () => void;
  onToggleCategory: (category: GifticonCategory) => void;
  onSelectAll: () => void;
};

export default function CouponFilterChips({
  favoriteOnly,
  selectedCategories,
  onToggleFavorite,
  onToggleCategory,
  onSelectAll,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 18,
        gap: 8,
        alignItems: 'center',
      }}>
      {/* favorite */}
      <FilterChip
        selected={favoriteOnly}
        onPress={onToggleFavorite}
        icon={<ChevronRight width={20} height={20} />}
      />
      {/* divider */}
      <View className="h-6 w-[1px] bg-gray-ui" />
      {/* 전체 */}
      <FilterChip
        selected={!favoriteOnly && selectedCategories.length === 0}
        onPress={onSelectAll}
        label="전체"
      />
      {/* 카테고리 */}
      {CATEGORY_OPTIONS.map((option) => (
        <FilterChip
          key={option.key}
          selected={selectedCategories.includes(option.key)}
          onPress={() => onToggleCategory(option.key)}
          label={option.label}
        />
      ))}
    </ScrollView>
  );
}

type FilterChipProps = {
  selected: boolean;
  onPress: () => void;
  label?: string;
  icon?: ReactNode;
};

function FilterChip({ selected, onPress, label, icon }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-10 flex-row items-center justify-center rounded-full ${
        selected ? 'bg-primary' : 'bg-white'
      } ${icon ? 'px-[10px]' : 'px-[15px]'}`}>
      {icon}
      {label && (
        <Text
          className={`font-pretMedium text-[16px] leading-[19px] ${
            selected ? 'text-white' : 'text-black'
          }`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
