import { View, Text, Pressable, Image } from 'react-native';
import { getDaysRemaining } from '@/features/gifticon/utils/date';
import type { ExpiringSoonGifticon } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ExpiringSoonCard(gifticon: ExpiringSoonGifticon) {
  const navigation = useNavigation<Nav>();

  return (
    <View className="bg-muted relative w-[302px] flex-col overflow-hidden">
      {TearLine('top')}
      {/* 이미지 */}
      <Image source={{ uri: gifticon.imageUrl }} className="h-[204px] w-full" resizeMode="cover" />
      {/* 텍스트 */}
      <View className="-mt-[1px] h-[58px] flex-row items-center justify-between bg-white px-4">
        <View className="gap-[4px]">
          <Text className="font-pretMedium text-gray-text text-[12px] leading-[14px]">
            {gifticon.brand}
          </Text>
          <Text className="font-pretMedium text-[16px] leading-[19px] text-black">
            {gifticon.productName}
          </Text>
        </View>
        <Text className="text-primary font-pretBold text-[16px] leading-[19px]">
          D-{getDaysRemaining(gifticon.expiresAt)}
        </Text>
      </View>
      {TearLine('mid')}
      {/* 버튼 */}
      <Pressable
        onPress={() => navigation.navigate('GifticonDetail', { id: gifticon.id })}
        className="bg-primary h-[58px] items-center justify-center">
        <Text className="font-pretBold text-[16px] text-white">사용하러 가기</Text>
      </Pressable>
      {TearLine('bottom')}
    </View>
  );
}

function TearLine(position: 'top' | 'mid' | 'bottom') {
  const count = 11;
  const dotSize = 12;
  const capSize = 24;

  const positionStyle = {
    top: 'w-[314px] -left-[6px] -top-[6px]',
    mid: 'w-[326px] -left-[12px] bottom-[46px]',
    bottom: 'w-[314px] -left-[6px] -bottom-[6px]',
  }[position];

  const edgeSize = position === 'mid' ? capSize : dotSize;
  const bodySize = position === 'mid' ? dotSize : 0;
  const Dot = (size: number, key: number) => (
    <View
      key={key}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      className="bg-background"
    />
  );

  return (
    <View
      pointerEvents="none"
      className={`absolute z-10 flex-row items-center justify-between ${positionStyle}`}>
      {Dot(edgeSize, -1)}
      {Array.from({ length: count }).map((_, i) => Dot(bodySize, i))}
      {Dot(edgeSize, count)}
    </View>
  );
}
