import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import type { MainTabParamList } from '@/navigation/TabNavigator';

type Nav = BottomTabNavigationProp<MainTabParamList, '홈'>;

export default function TotalUsageSection() {
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
            <View className="h-[30px] w-[30px] bg-black"></View>
            <View className="gap-[2px]">
              <Text className="font-pretMedium text-gray-text text-[12px] leading-[14px]">
                지금까지 잊지 않고 사용한 금액
              </Text>
              <Text className="font-pretBold text-primary text-[16px] leading-[19px]">
                128,500 <Text className="text-[12px]">원</Text>
              </Text>
            </View>
          </View>
          <ChevronRight />
        </View>
      </Pressable>
    </View>
  );
}
