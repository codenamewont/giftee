import { View, ScrollView } from 'react-native';
import { useMemo, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import HomeHeader from './components/HomeHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExpiringSoonSection from './components/ExpiringSoonSection';
import TotalUsageSection from './components/TotalUsageSection';
import FavoriteGifticonsSection from './components/FavoriteGifticonsSection';
import type { ExpiringSoonGifticon } from './types';
import { isExpiringSoon } from '@/features/gifticon/utils/date';
import type { Gifticon, GifticonListItemData } from '@/features/gifticon/types';
import { gifticonApi } from '@/features/gifticon/api/gifticonApi';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState<string | null>(null);
  const [gifticons, setGifticons] = useState<Gifticon[]>([]);

  const loadHomeData = useCallback(async () => {
    try {
      const [sessionResult, gifticonList] = await Promise.all([
        supabase.auth.getSession(),
        gifticonApi.read(),
      ]);

      const session = sessionResult.data.session;
      const metadata = session?.user.user_metadata;
      const nextUserName = metadata?.full_name?.trim() || null;

      setUserName(nextUserName);
      setGifticons(gifticonList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [loadHomeData])
  );

  const availableCount = useMemo(() => {
    return gifticons.filter((item) => item.status === 'active').length;
  }, [gifticons]);

  const usedThisMonthCount = useMemo(() => {
    const now = new Date();

    return gifticons.filter((item) => {
      if (item.status !== 'used' || !item.usedAt) return false;
      const usedDate = new Date(item.usedAt);
      return usedDate.getFullYear() === now.getFullYear() && usedDate.getMonth() === now.getMonth();
    }).length;
  }, [gifticons]);

  const usedThisMonthAmount = useMemo(() => {
    const now = new Date();

    return gifticons
      .filter((item) => {
        if (item.status !== 'used' || !item.usedAt) return false;

        const usedDate = new Date(item.usedAt);

        return (
          usedDate.getFullYear() === now.getFullYear() && usedDate.getMonth() === now.getMonth()
        );
      })
      .reduce((sum, item) => sum + item.price, 0);
  }, [gifticons]);

  const urgentExpiringItems = useMemo<ExpiringSoonGifticon[]>(() => {
    return gifticons
      .filter((item) => item.status === 'active' && isExpiringSoon(item.expiresAt, 7))
      .sort((a, b) => a.expiresAt.localeCompare(b.expiresAt))
      .map((item) => ({
        id: item.id,
        brand: item.brand,
        productName: item.productName,
        expiresAt: item.expiresAt,
        imageUrl: item.imageUrl,
      }));
  }, [gifticons]);

  const fallbackExpiringItems = useMemo<ExpiringSoonGifticon[]>(() => {
    return gifticons
      .filter((item) => item.status === 'active')
      .sort((a, b) => a.expiresAt.localeCompare(b.expiresAt))
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        brand: item.brand,
        productName: item.productName,
        expiresAt: item.expiresAt,
        imageUrl: item.imageUrl,
      }));
  }, [gifticons]);

  const expiringSoonItems =
    urgentExpiringItems.length > 0 ? urgentExpiringItems : fallbackExpiringItems;
  const expiringSoonTitle = urgentExpiringItems.length > 0 ? '곧 만료되는 쿠폰' : '만료 예정 쿠폰';

  const totalUsedAmount = useMemo(() => {
    return gifticons
      .filter((item) => item.status === 'used')
      .reduce((sum, item) => sum + item.price, 0);
  }, [gifticons]);

  const favoriteItems = useMemo<GifticonListItemData[]>(() => {
    return gifticons
      .filter((item) => item.status === 'active' && item.isFavorite)
      .map((item) => ({
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

  return (
    <View className="flex-1 bg-background">
      {/* 고정 헤더 */}
      <View
        className="absolute left-0 right-0 top-0 z-50 bg-white"
        style={{ paddingTop: insets.top }}>
        <HomeHeader
          userName={userName}
          availableCount={availableCount}
          usedThisMonthCount={usedThisMonthCount}
          usedThisMonthAmount={usedThisMonthAmount}
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
        {expiringSoonItems.length > 0 && (
          <ExpiringSoonSection
            title={expiringSoonTitle}
            items={expiringSoonItems}
            urgentCount={urgentExpiringItems.length}
          />
        )}
        <TotalUsageSection totalUsedAmount={totalUsedAmount} />
        {favoriteItems.length > 0 && <FavoriteGifticonsSection items={favoriteItems} />}
      </ScrollView>
    </View>
  );
}
