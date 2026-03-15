import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@/providers/AuthProvider';
import TabNavigator from './TabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import GifticonCreateScreen from '@/screens/GifticonCreateScreen';
import GifticonDetailScreen from '@/screens/GifticonDetailScreen';
import AccountScreen from '@/screens/SettingsScreen/AccountScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Login: { redirectTo?: 'GifticonCreate' } | undefined;
  GifticonCreate: undefined;
  GifticonDetail: { id: string };
  AccountSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { session, hasSignedInBefore, isAuthResolved } = useAuth();

  useEffect(() => {
    if (isAuthResolved) {
      SplashScreen.hideAsync();
    }
  }, [isAuthResolved]);

  if (!isAuthResolved) {
    return null;
  }

  const initialRouteName = session || !hasSignedInBefore ? 'MainTabs' : 'Login';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
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
      <Stack.Screen
        name="AccountSettings"
        component={AccountScreen}
        options={{ title: '프로필 설정' }}
      />
    </Stack.Navigator>
  );
}
