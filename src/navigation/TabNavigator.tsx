import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import { View, Text } from 'react-native';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();
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
      <Tab.Screen name="쿠폰함">{() => <Dummy title="쿠폰함" />}</Tab.Screen>
      <Tab.Screen name="+">{() => <Dummy title="+" />}</Tab.Screen>
      <Tab.Screen name="내 활동">{() => <Dummy title="내 활동" />}</Tab.Screen>
      <Tab.Screen name="설정">{() => <Dummy title="설정" />}</Tab.Screen>
    </Tab.Navigator>
  );
}
