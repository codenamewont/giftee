import { View, Text, Pressable } from 'react-native';
import EditIcon from '@/assets/icons/edit.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '@/lib/supabase';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <View className="flex-1 items-center bg-background" style={{ paddingBottom: insets.bottom }}>
      <View className="h-[258px] w-full bg-white pb-[42px] pt-[55px]">
        <View className="items-center gap-10">
          <View className="h-[97px] w-[97px] rounded-full bg-gray-ui"></View>
          <View className="flex-row items-center gap-1">
            <Text className="font-pretMedium text-[24px] text-black">이채원</Text>
            <EditIcon />
          </View>
        </View>
      </View>
      <View className="mt-5 w-full bg-white">
        <View className="h-[60px] w-full flex-row items-center px-4">
          <Text className="font-pretBold text-[16px] text-black">기본정보</Text>
        </View>
        <View className="h-[60px] w-full flex-row items-center px-4">
          <Text className="w-[90px] font-pretBold text-[14px] text-gray-text">이름</Text>
          <Text className="font-pretMedium text-[16px] text-black">이채원</Text>
        </View>
        <View className="h-[60px] w-full flex-row items-center px-4">
          <Text className="w-[90px] font-pretBold text-[14px] text-gray-text">이메일</Text>
          <Text className="font-pretMedium text-[16px] text-black">user@gmail.com</Text>
        </View>
        <View className="h-[60px] w-full flex-row items-center px-4">
          <Text className="w-[90px] font-pretBold text-[14px] text-gray-text">휴대폰 번호</Text>
          <Text className="font-pretMedium text-[16px] text-primary">+ 추가</Text>
        </View>
      </View>
      <View className="flex-1" />
      <View className="w-full px-4">
        <Pressable
          onPress={handleLogout}
          className="h-[50px] w-full items-center justify-center rounded-[40px] border-2 border-gray-ui">
          <Text className="font-pretMedium text-[16px] leading-[20px] text-primary">로그아웃</Text>
        </Pressable>
      </View>
      <Pressable className="mb-5 mt-[10px]">
        <Text className="font-pretMedium text-[12px] text-gray-text">회원 탈퇴</Text>
      </Pressable>
    </View>
  );
}
