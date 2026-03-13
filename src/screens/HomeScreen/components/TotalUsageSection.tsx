import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import type { MainTabParamList } from '@/navigation/TabNavigator';
import PigIcon from '@/assets/icons/pig.svg';

type Nav = BottomTabNavigationProp<MainTabParamList, '홈'>;

type Props = {
  totalUsedAmount: number;
};

export default function TotalUsageSection({ totalUsedAmount }: Props) {
  const navigation = useNavigation<Nav>();

  const handlePress = () => {
    navigation.jumpTo('쿠폰함', { initialTab: 'used' });
  };

  return (
    <View className="justify-center px-4">
      <Pressable
        onPress={handlePress}
        className="h-[60px] justify-center rounded-full bg-white px-[28px] py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <PigIcon />
            <View className="gap-[2px]">
              <Text className="font-pretMedium text-[12px] leading-[14px] text-gray-text">
                지금까지 잊지 않고 사용한 금액
              </Text>
              <Text className="font-pretBold text-[16px] leading-[19px] text-primary">
                {totalUsedAmount.toLocaleString('ko-KR')} <Text className="text-[12px]">원</Text>
              </Text>
            </View>
          </View>
          <ChevronRight />
        </View>
      </Pressable>
    </View>
  );
}
