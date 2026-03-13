import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type HomeHeaderProps = {
  userName: string | null;
  availableCount: number;
  usedThisMonthCount: number;
  usedThisMonthAmount: number;
};

export default function HomeHeader({
  userName,
  availableCount,
  usedThisMonthCount,
  usedThisMonthAmount,
}: HomeHeaderProps) {
  const navigation = useNavigation<Nav>();
  const month = new Date().getMonth() + 1;

  return (
    <View className="h-[100px] w-full justify-center gap-[10px] bg-white px-4">
      <View className="flex-row justify-between">
        {userName ? (
          <Text className="font-pretBold text-[24px] text-black">
            {userName}
            <Text className="font-pretMedium text-[24px] text-gray-text">님</Text>
          </Text>
        ) : (
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="font-pretBold text-[24px] text-black">로그인하기</Text>
          </Pressable>
        )}
        <View className="h-[30px] w-[30px] bg-black"></View>
      </View>
      <View className="flex-row items-center gap-5">
        <StatBlock
          label="사용 가능 쿠폰"
          value={availableCount.toLocaleString('ko-KR')}
          unit="개"
        />
        <Divider />
        <StatBlock
          label={`${month}월 사용 완료`}
          value={usedThisMonthCount.toLocaleString('ko-KR')}
          unit="개"
        />
        <Divider />
        <StatBlock
          label={`${month}월 사용 금액`}
          value={usedThisMonthAmount.toLocaleString('ko-KR')}
          unit="원"
        />
      </View>
    </View>
  );
}

function StatBlock({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View className="flex-1 items-center gap-2">
      <Text className="font-pretMedium text-[12px] leading-[14px] text-gray-text">{label}</Text>
      <Text className="font-pretBold text-[16px] leading-[19px] text-primary">
        {value}{' '}
        <Text className="font-pretMedium text-[12px] leading-[14px] text-gray-text">{unit}</Text>
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="h-5 w-[2px] bg-gray-ui" />;
}
