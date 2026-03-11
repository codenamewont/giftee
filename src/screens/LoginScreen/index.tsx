import { View, Text } from 'react-native';
import LogoWordmark from './logo-wordmark.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoogleLoginButton from './GoogleLoginButton';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { supabase } from '@/lib/supabase';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<LoginNavigationProp>();
  const route = useRoute<LoginRouteProp>();

  const handlePressGoogleLogin = async () => {
    const redirectUri = makeRedirectUri({ scheme: 'giftee' });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });
    if (error || !data?.url) {
      console.error(error?.message ?? 'Google OAuth: 로그인 요청 URL 생성에 실패했습니다.');
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
    if (result.type !== 'success') {
      return;
    }

    const { params, errorCode } = QueryParams.getQueryParams(result.url);
    if (errorCode) {
      console.error(errorCode);
      return;
    }
    const code = params.code;
    if (!code || typeof code !== 'string') {
      console.error('Google OAuth: 인증 코드를 찾을 수 없습니다.');
      return;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);
    if (sessionError || !sessionData.session) {
      console.error(sessionError?.message ?? 'Google OAuth: 로그인 세션을 확인하지 못했습니다.');
      return;
    }

    const nextRoute = route.params?.redirectTo ?? 'MainTabs';
    navigation.replace(nextRoute);
  };

  return (
    <View
      className="flex-1 items-center bg-primary"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text className="mb-[36px] mt-[144px] font-pretBold text-[24px] text-white">
        기프티콘, 이제 잊지 마세요
      </Text>
      <LogoWordmark />
      <View className="flex-1"></View>
      <GoogleLoginButton onPress={handlePressGoogleLogin} />
      <View className="mb-[60px] items-center">
        <Text className="text-center font-pretMedium text-[12px] leading-[18px] text-muted">
          가입을 진행할 경우, 아래의 정책에 동의한 것으로 간주됩니다.
        </Text>
        <Text className="text-center font-pretMedium text-[12px] leading-[18px] text-muted">
          {/* TODO: Linking 추가 */}
          <Text className="underline" onPress={() => {}}>
            서비스 이용약관
          </Text>{' '}
          및{' '}
          <Text className="underline" onPress={() => {}}>
            개인정보 처리 방침
          </Text>
        </Text>
      </View>
    </View>
  );
}
