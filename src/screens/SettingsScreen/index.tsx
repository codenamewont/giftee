import { View, Text, Pressable } from 'react-native';
import ChevronRightGray from '@/assets/icons/chevron-right-gray.svg';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* 계정 */}
      <View className="gap-1 p-4">
        <SettingsTitle title="계정" />
        <SettingsItem label="user@gmail.com" description="Google 계정 연결됨" />
      </View>
      {/* 알림 */}
      <View className="gap-1 p-4">
        <SettingsTitle title="알림" />
        <SettingsItem label="알림 설정" />
      </View>
      {/* 고객 지원 */}
      <View className="gap-1 p-4">
        <SettingsTitle title="고객 지원" />
        <SettingsItem label="FAQ" />
        <SettingsItem label="문의하기" />
      </View>
      {/* 앱 정보 */}
      <View className="gap-1 p-4">
        <SettingsTitle title="앱 정보" />
        <SettingsItem label="버전 정보" value={`v${Constants.expoConfig?.version}`} />
        <SettingsItem label="약관 및 정책" />
      </View>
    </View>
  );
}

function SettingsTitle({ title }: { title: string }) {
  return (
    <Text className="mb-3 font-pretMedium text-[16px] leading-[20px] text-gray-text">{title}</Text>
  );
}

function SettingsItem({
  label,
  value,
  description,
  onPress,
}: {
  label: string;
  value?: string;
  description?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between py-[6px] active:opacity-70">
      <View className="flex-1">
        <Text className="font-pretMedium text-[16px] leading-[20px] text-black">{label}</Text>
        {description ? (
          <Text className="mt-1 font-pretMedium text-[13px] leading-[18px] text-gray-text">
            {description}
          </Text>
        ) : null}
      </View>

      {value ? (
        <Text className="font-pretMedium text-[16px] leading-[20px] text-gray-text">{value}</Text>
      ) : (
        <ChevronRightGray />
      )}
    </Pressable>
  );
}
