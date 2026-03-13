import { View, Text, Pressable, Image } from 'react-native';
import { getDaysRemaining } from '@/features/gifticon/utils/date';
import type { ExpiringSoonGifticon } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Props = ExpiringSoonGifticon & {
  width: number;
};

export default function ExpiringSoonCard({
  id,
  brand,
  productName,
  expiresAt,
  imageUrl,
  width,
}: Props) {
  const navigation = useNavigation<Nav>();

  return (
    <View style={{ width }} className="relative flex-col overflow-hidden bg-muted">
      <TearLine position="top" width={width} />
      {/* 이미지 */}
      <Image source={{ uri: imageUrl }} className="h-[204px] w-full" resizeMode="cover" />
      {/* 텍스트 */}
      <View className="-mt-[1px] h-[58px] flex-row items-center justify-between bg-white px-4">
        <View className="gap-[4px]">
          <Text className="font-pretMedium text-[12px] leading-[14px] text-gray-text">{brand}</Text>
          <Text className="font-pretMedium text-[16px] leading-[19px] text-black">
            {productName}
          </Text>
        </View>
        <Text className="font-pretBold text-[16px] leading-[19px] text-primary">
          D-{getDaysRemaining(expiresAt)}
        </Text>
      </View>
      <TearLine position="mid" width={width} />
      {/* 버튼 */}
      <Pressable
        onPress={() => navigation.navigate('GifticonDetail', { id: id })}
        className="h-[58px] items-center justify-center bg-primary">
        <Text className="font-pretBold text-[16px] text-white">사용하러 가기</Text>
      </Pressable>
      <TearLine position="bottom" width={width} />
    </View>
  );
}

function TearLine({ position, width }: { position: 'top' | 'mid' | 'bottom'; width: number }) {
  const count = 11;
  const dotSize = 12;
  const capSize = 24;
  const lineWidth = width + (position === 'mid' ? capSize : dotSize);

  const positionStyle = {
    top: { width: lineWidth, left: -6, top: -6 },
    mid: { width: lineWidth, left: -12, bottom: 46 },
    bottom: { width: lineWidth, left: -6, bottom: -6 },
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
      className="absolute z-10 flex-row items-center justify-between"
      style={positionStyle}>
      {Dot(edgeSize, -1)}
      {Array.from({ length: count }).map((_, i) => Dot(bodySize, i))}
      {Dot(edgeSize, count)}
    </View>
  );
}
