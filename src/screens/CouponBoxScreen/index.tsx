import { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import CouponBoxTabs from './components/CouponBoxTabs';
import type { CouponBoxTabKey } from './components/CouponBoxTabs';
import type { MainTabParamList } from '@/navigation/TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CouponFilterChips from './components/CouponFilterChips';
import type { Gifticon, GifticonCategory, GifticonListItemData } from '@/features/gifticon/types';
import CouponBoxList from './components/CouponBoxList';
import { gifticonApi } from '@/features/gifticon/api/gifticonApi';

type CouponBoxRoute = RouteProp<MainTabParamList, '쿠폰함'>;

export default function CouponBoxScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<CouponBoxRoute>();
  const navigation = useNavigation();

  const [tab, setTab] = useState<CouponBoxTabKey>(route.params?.initialTab ?? 'active');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<GifticonCategory[]>([]);
  const [gifticons, setGifticons] = useState<Gifticon[]>([]);

  const loadGifticons = useCallback(async () => {
    try {
      const data = await gifticonApi.read();
      setGifticons(data);
    } catch (error) {
      console.error(error);
      Alert.alert('쿠폰 목록을 불러오는 중 오류가 발생했습니다.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGifticons();

      const nextTab = route.params?.initialTab;

      if (nextTab) {
        setTab(nextTab);
        navigation.setParams({ initialTab: undefined } as any);
      }
    }, [loadGifticons, route.params?.initialTab, navigation])
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

  const listItems = useMemo<GifticonListItemData[]>(() => {
    return gifticons.map((item) => ({
      id: item.id,
      brand: item.brand,
      productName: item.productName,
      expiresAt: item.expiresAt,
      status: item.status,
      imageUrl: item.imageUrl,
      category: item.category,
      isFavorite: item.isFavorite,
    }));
  }, [gifticons]);

  const filteredItems = useMemo(() => {
    const baseItems = listItems.filter((item) => {
      return tab === 'active'
        ? item.status === 'active' || item.status === 'expired'
        : item.status === 'used';
    });

    if (favoriteOnly) {
      return baseItems.filter((item) => item.isFavorite);
    }
    if (selectedCategories.length) {
      return baseItems.filter((item) => selectedCategories.includes(item.category));
    }
    return baseItems;
  }, [tab, favoriteOnly, selectedCategories, listItems]);

  const sections = useMemo(() => {
    if (tab === 'active') {
      return [
        {
          title: '사용 가능 쿠폰',
          data: filteredItems.filter((item) => item.status === 'active'),
        },
        {
          title: '만료된 쿠폰',
          data: filteredItems.filter((item) => item.status === 'expired'),
        },
      ].filter((section) => section.data.length > 0);
    }

    return [
      {
        title: '사용 완료 쿠폰',
        data: filteredItems,
      },
    ].filter((section) => section.data.length > 0);
  }, [tab, filteredItems]);

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
      <CouponBoxList sections={sections} />
    </View>
  );
}
