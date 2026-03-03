import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import GifticonDetailScreen from '@/screens/GifticonDetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  GifticonDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="GifticonDetail"
        component={GifticonDetailScreen}
        options={{ title: '쿠폰 상세' }}
      />
    </Stack.Navigator>
  );
}
