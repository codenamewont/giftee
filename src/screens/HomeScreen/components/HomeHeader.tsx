import { View, Text } from 'react-native';

type HomeHeaderProps = {
  userName: string;
  availableCount: number;
  usedThisMonthCount: number;
  totalUsedAmount: number;
};

export default function HomeHeader({
  userName,
  availableCount,
  usedThisMonthCount,
  totalUsedAmount,
}: HomeHeaderProps) {
  return (
    <View className="h-[100px] w-full justify-center gap-[10px] bg-white px-4">
      <View className="flex-row justify-between">
        <Text className="font-pretBold text-[24px] text-black">
          {userName}
          <Text className="font-pretMedium text-gray-text text-[24px]">님</Text>
        </Text>
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
          label="이번 달 사용"
          value={usedThisMonthCount.toLocaleString('ko-KR')}
          unit="개"
        />
        <Divider />
        <StatBlock label="총 사용 금액" value={totalUsedAmount.toLocaleString('ko-KR')} unit="원" />
      </View>
    </View>
  );
}

function StatBlock({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View className="flex-1 items-center gap-2">
      <Text className="font-pretMedium text-gray-text text-[12px] leading-[14px]">{label}</Text>
      <Text className="font-pretBold text-primary text-[16px] leading-[19px]">
        {value}{' '}
        <Text className="font-pretMedium text-gray-text text-[12px] leading-[14px]">{unit}</Text>
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="bg-gray-ui h-5 w-[2px]" />;
}
