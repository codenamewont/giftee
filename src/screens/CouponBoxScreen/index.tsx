import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import CouponBoxTabs from './components/CouponBoxTabs';
import type { CouponBoxTabKey } from './components/CouponBoxTabs';
import type { MainTabParamList } from '@/navigation/TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CouponFilterChips from './components/CouponFilterChips';
import type { GifticonCategory, GifticonListItemData } from '@/features/gifticon/types';
import CouponBoxList from './components/CouponBoxList';

type CouponBoxRoute = RouteProp<MainTabParamList, '쿠폰함'>;

const mockItems: GifticonListItemData[] = [
  {
    id: '1',
    brand: '베스킨라빈스',
    productName: '싱글레귤러 교환권',
    expiresAt: '2026-12-31',
    status: 'active',
    imageUrl: 'https://picsum.photos/200',
    category: 'cafe/dessert',
    isFavorite: true,
  },
  {
    id: '2',
    brand: '스타벅스',
    productName: '아메리카노 T',
    expiresAt: '2025-04-20',
    status: 'expired',
    imageUrl: 'https://picsum.photos/201',
    category: 'cafe/dessert',
    isFavorite: true,
  },
  {
    id: '3',
    brand: '올리브영',
    productName: '기프트카드 2만원권',
    expiresAt: '2026-03-10',
    status: 'active',
    imageUrl: 'https://picsum.photos/202',
    category: 'voucher',
    isFavorite: false,
  },
  {
    id: '4',
    brand: 'BBQ',
    productName: '황금올리브치킨',
    expiresAt: '2026-04-30',
    status: 'used',
    imageUrl: 'https://picsum.photos/203',
    category: 'chicken/pizza',
    isFavorite: true,
  },
  {
    id: '5',
    brand: 'CU',
    productName: '모바일상품권 5천원',
    expiresAt: '2026-05-12',
    status: 'active',
    imageUrl: 'https://picsum.photos/204',
    category: 'convenience',
    isFavorite: false,
  },
  {
    id: '6',
    brand: '교촌치킨',
    productName: '허니콤보',
    expiresAt: '2025-03-01',
    status: 'expired',
    imageUrl: 'https://picsum.photos/205',
    category: 'chicken/pizza',
    isFavorite: false,
  },
  {
    id: '7',
    brand: '교촌치킨',
    productName: '허니콤보',
    expiresAt: '2025-03-01',
    status: 'expired',
    imageUrl: 'https://picsum.photos/205',
    category: 'chicken/pizza',
    isFavorite: false,
  },
];

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

  const filteredItems = useMemo(() => {
    const baseItems = mockItems.filter((item) => {
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
  }, [tab, favoriteOnly, selectedCategories]);

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
