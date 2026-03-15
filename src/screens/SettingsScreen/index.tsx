import { View, Text, Pressable, Image } from 'react-native';
import ChevronRightGray from '@/assets/icons/chevron-right-gray.svg';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { session } = useAuth();

  const user = session?.user;
  const avatarUrl = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;
  const email = user?.email ?? '';
  const providerLabel = user?.app_metadata?.provider ?? user?.app_metadata?.providers?.[0] ?? null;
  const providerDescription = providerLabel
    ? `${providerLabel[0].toUpperCase()}${providerLabel.slice(1)} 계정 연결됨`
    : null;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* 계정 */}
      <View className="gap-1 p-4">
        <SettingsTitle title="계정" />
        {user ? (
          <SettingsItem
            label={email}
            description={providerDescription}
            avatarUrl={avatarUrl}
            onPress={() => navigation.navigate('AccountSettings')}
          />
        ) : (
          <SettingsItem label="로그인하기" onPress={() => navigation.navigate('Login')} />
        )}
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
  avatarUrl,
  onPress,
}: {
  label: string;
  value?: string;
  description?: string | null;
  avatarUrl?: string | null;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between py-[6px] active:opacity-70">
      <View className="flex-1 flex-row items-center gap-[10px]">
        {avatarUrl && (
          <Image source={{ uri: avatarUrl }} className="h-[50px] w-[50px] rounded-full" />
        )}
        <View className="flex-1">
          <Text className="font-pretMedium text-[16px] leading-[20px] text-black">{label}</Text>
          {description && (
            <Text className="mt-1 font-pretMedium text-[13px] leading-[18px] text-gray-text">
              {description}
            </Text>
          )}
        </View>
      </View>

      {value ? (
        <Text className="font-pretMedium text-[16px] leading-[20px] text-gray-text">{value}</Text>
      ) : (
        <ChevronRightGray />
      )}
    </Pressable>
  );
}
