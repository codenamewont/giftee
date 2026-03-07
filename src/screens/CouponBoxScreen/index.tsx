import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import CouponBoxTabs from './components/CouponBoxTabs';
import type { CouponBoxTabKey } from './components/CouponBoxTabs';
import type { MainTabParamList } from '@/navigation/TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CouponFilterChips from './components/CouponFilterChips';
import type { GifticonCategory } from '@/features/gifticon/types';

type CouponBoxRoute = RouteProp<MainTabParamList, '쿠폰함'>;

export default function CouponBoxScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<CouponBoxRoute>();
  const navigation = useNavigation();

  const [tab, setTab] = useState<CouponBoxTabKey>(route.params?.initialTab ?? 'active');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<GifticonCategory[]>([]);

  useFocusEffect(
    useCallback(() => {
      const nextTab = route.params?.initialTab;

      if (nextTab) {
        setTab(nextTab);
        navigation.setParams({ initialTab: undefined } as any);
      }
    }, [route.params?.initialTab, navigation])
  );

  const handleToggleFavorite = () => {
    setFavoriteOnly((prev) => {
      setSelectedCategories([]);
      return !prev;
    });
  };
  const handleToggleCategory = (category: GifticonCategory) => {
    setFavoriteOnly(false);
    setSelectedCategories((prev) => {
      const nextCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];

      if (nextCategories.length === 5) {
        return [];
      }
      return nextCategories;
    });
  };
  const handleSelectAll = () => {
    setFavoriteOnly(false);
    setSelectedCategories([]);
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <CouponBoxTabs value={tab} onChange={setTab} />
      <CouponFilterChips
        favoriteOnly={favoriteOnly}
        selectedCategories={selectedCategories}
        onToggleFavorite={handleToggleFavorite}
        onToggleCategory={handleToggleCategory}
        onSelectAll={handleSelectAll}
      />
      {/* 탭 내용 */}
      <View className="flex-1 items-center justify-center">
        <Text>{tab === 'active' ? '사용 가능' : '사용 완료'}</Text>
      </View>
    </View>
  );
}
