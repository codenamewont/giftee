import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import CouponBoxTabs from './CouponBoxTabs';
import type { CouponBoxTabKey } from './CouponBoxTabs';
import type { MainTabParamList } from '@/navigation/TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CouponBoxRoute = RouteProp<MainTabParamList, '쿠폰함'>;

export default function CouponBoxScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<CouponBoxRoute>();
  const navigation = useNavigation();

  const [tab, setTab] = useState<CouponBoxTabKey>(route.params?.initialTab ?? 'active');

  useFocusEffect(
    useCallback(() => {
      const nextTab = route.params?.initialTab;

      if (nextTab) {
        setTab(nextTab);
        navigation.setParams({ initialTab: undefined } as any);
      }
    }, [route.params?.initialTab, navigation])
  );

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
