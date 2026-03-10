import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import TabNavigator from './TabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import GifticonCreateScreen from '@/screens/GifticonCreateScreen';
import GifticonDetailScreen from '@/screens/GifticonDetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Login: { redirectTo?: 'GifticonCreate' } | undefined;
  GifticonCreate: undefined;
  GifticonDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // TODO: authState 연결 후 실제 auth 상태로 교체
  const session = null;
  const hasSignedInBefore = false;
  const isAuthResolved = true;

  useEffect(() => {
    if (isAuthResolved) {
      SplashScreen.hideAsync();
    }
  }, [isAuthResolved]);

  if (!isAuthResolved) {
    return null;
  }

  // 기존 사용자이지만 세션이 없으면 앱 진입 시 로그인 화면부터 시작
  const shouldRequireReLogin = !session && hasSignedInBefore;

  return (
    <Stack.Navigator
      initialRouteName={shouldRequireReLogin ? 'Login' : 'MainTabs'}
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
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
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
