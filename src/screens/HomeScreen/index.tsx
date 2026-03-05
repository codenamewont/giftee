import { View, ScrollView } from 'react-native';
import HomeHeader from './components/HomeHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExpiringSoonSection from './components/ExpiringSoonSection';
import TotalUsageSection from './components/TotalUsageSection';
import FavoriteGifticonsSection from './components/FavoriteGifticonsSection';
import type { ExpiringSoonGifticon } from './types';
import type { GifticonListItemData } from '@/features/gifticon/types';

const expiringSoonItems: ExpiringSoonGifticon[] = [
  {
    id: '1',
    brand: '올리브영',
    productName: '기프트카드 2만원권',
    expiresAt: '2026-03-10',
    imageUrl: 'https://biz-con.co.kr/upload/images/202306/400_20230621181620939_CouponA10000.png',
  },
  {
    id: '2',
    brand: '스타벅스',
    productName: '아메리카노 T',
    expiresAt: '2026-04-06',
    imageUrl: 'https://sitem.ssgcdn.com/14/82/15/item/1000644158214_i1_332.jpg',
  },
  {
    id: '3',
    brand: 'BBQ',
    productName: '황금올리브치킨',
    expiresAt: '2026-03-08',
    imageUrl: 'https://biz-con.co.kr/upload/images/202406/400_20240607111732818_10.jpg',
  },
];

const favoriteItems: GifticonListItemData[] = [
  {
    id: '1',
    brand: '베스킨라빈스',
    productName: '싱글레귤러 교환권',
    expiresAt: '2026-12-31',
    status: 'active',
    imageUrl: 'https://picsum.photos/200',
  },
  {
    id: '2',
    brand: '스타벅스',
    productName: '아메리카노 T',
    expiresAt: '2025-04-20',
    status: 'expired',
    imageUrl: 'https://picsum.photos/201',
  },
  {
    id: '3',
    brand: '올리브영',
    productName: '기프트카드 2만원권',
    expiresAt: '2026-03-10',
    status: 'active',
    imageUrl: 'https://picsum.photos/202',
  },
  {
    id: '4',
    brand: 'BBQ',
    productName: '황금올리브치킨',
    expiresAt: '2026-04-30',
    status: 'used',
    imageUrl: 'https://picsum.photos/203',
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-background flex-1">
      {/* 고정 헤더 */}
      <View
        className="absolute left-0 right-0 top-0 z-50 bg-white"
        style={{ paddingTop: insets.top }}>
        <HomeHeader
          userName="이채원"
          availableCount={8}
          usedThisMonthCount={3}
          totalUsedAmount={45000}
        />
      </View>
      {/* 스크롤 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 124 + insets.top,
          paddingBottom: 24,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}>
        <ExpiringSoonSection items={expiringSoonItems} />
        <TotalUsageSection />
        <FavoriteGifticonsSection items={favoriteItems} />
      </ScrollView>
    </View>
  );
}
