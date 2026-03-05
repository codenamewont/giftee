import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import CouponBoxScreen from '@/screens/CouponBoxScreen';
import { View, Text } from 'react-native';
import TabBar from './TabBar';

export type MainTabParamList = {
  홈: undefined;
  쿠폰함: { initialTab?: 'active' | 'used' } | undefined;
  '+': undefined;
  '내 활동': undefined;
  설정: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
function Dummy({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{title}</Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="쿠폰함" component={CouponBoxScreen}></Tab.Screen>
      <Tab.Screen name="+">{() => <Dummy title="+" />}</Tab.Screen>
      <Tab.Screen name="내 활동">{() => <Dummy title="내 활동" />}</Tab.Screen>
      <Tab.Screen name="설정">{() => <Dummy title="설정" />}</Tab.Screen>
    </Tab.Navigator>
  );
}
