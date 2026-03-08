import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import GifticonCreateScreen from '@/screens/GifticonCreateScreen';
import GifticonDetailScreen from '@/screens/GifticonDetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  GifticonCreate: undefined;
  GifticonDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        headerTintColor: '#111111',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'pretBold',
          fontSize: 16,
          color: '#111111',
        },
      }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="GifticonCreate"
        component={GifticonCreateScreen}
        options={{ title: '쿠폰 등록' }}
      />
      <Stack.Screen
        name="GifticonDetail"
        component={GifticonDetailScreen}
        options={{ title: '쿠폰 상세' }}
      />
    </Stack.Navigator>
  );
}
