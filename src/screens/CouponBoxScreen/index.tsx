import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import CouponBoxTabs from './CouponBoxTabs';
import type { CouponBoxTabKey } from './CouponBoxTabs';
import type { MainTabParamList } from '@/navigation/TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

type CouponBoxRoute = RouteProp<MainTabParamList, '쿠폰함'>;

export default function CouponBoxScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<CouponBoxRoute>();
  const isFocused = useIsFocused();

  const [tab, setTab] = useState<CouponBoxTabKey>(route.params?.initialTab ?? 'active');
  useEffect(() => {
    const nextTab = route.params?.initialTab;
    if (nextTab) {
      setTab(nextTab);
    }
  }, [isFocused]);

  return (
    <View className="bg-background flex-1" style={{ paddingTop: insets.top }}>
      <CouponBoxTabs value={tab} onChange={setTab} />
      {/* 탭 내용 */}
      <View className="flex-1 items-center justify-center">
        <Text>{tab === 'active' ? '사용 가능' : '사용 완료'}</Text>
      </View>
    </View>
  );
}
