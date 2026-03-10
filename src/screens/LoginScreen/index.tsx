import { View, Text } from 'react-native';
import LogoWordmark from './logo-wordmark.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoogleLoginButton from './GoogleLoginButton';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center bg-primary"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text className="mb-[36px] mt-[144px] font-pretBold text-[24px] text-white">
        기프티콘, 이제 잊지 마세요
      </Text>
      <LogoWordmark />
      <View className="flex-1"></View>
      <GoogleLoginButton />
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
