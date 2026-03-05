import { View, Text, Pressable, Image } from 'react-native';
import { getDaysRemaining } from '../utils/date';
import type { Gifticon } from '../types';
import { formatDate } from '../utils/date';

type GifticonListItemProps = Pick<
  Gifticon,
  'id' | 'brand' | 'productName' | 'expiresAt' | 'status' | 'imageUrl'
> & {
  onPress?: (id: string) => void;
};

export default function GifticonListItem({
  id,
  brand,
  productName,
  expiresAt,
  status,
  imageUrl,
  onPress,
}: GifticonListItemProps) {
  const remaining = getDaysRemaining(expiresAt);
  let countdownBg = 'bg-white';
  let countdownText = 'text-primary';
  let countdownLabel = `D-${remaining}`;

  if (status === 'active') {
    if (remaining <= 7) {
      countdownBg = 'bg-primary';
      countdownText = 'text-white';
    } else if (remaining <= 31) {
      countdownBg = 'bg-secondary';
    }
  } else {
    countdownBg = 'bg-muted';
    countdownText = 'text-black';
    countdownLabel = status === 'expired' ? '만료' : '사용 완료';
  }

  return (
    <Pressable
      onPress={() => onPress?.(id)}
      className="relative h-20 w-full flex-row overflow-hidden">
      {TearLine('left')}
      <View
        className={`flex-1 flex-row items-center gap-3 px-5 py-3 ${
          status === 'active' ? 'bg-white' : 'bg-muted'
        }`}>
        <Image
          source={{ uri: imageUrl }}
          className="border-gray-ui h-[50px] w-[50px] rounded-[8px] border"
          resizeMode="cover"
        />
        <View className="gap-1">
          <Text className="text-gray-text font-pretMedium text-[12px] leading-[14px]">{brand}</Text>
          <Text
            className={`font-pretBold text-[16px] leading-[19px] text-black ${
              status === 'active' ? '' : 'line-through'
            }`}>
            {productName}
          </Text>
          <Text className="text-gray-text font-pretMedium text-[12px] leading-[14px]">
            만료일:{' '}
            <Text className="font-pretMedium text-[12px] leading-[14px] text-black">
              {formatDate(expiresAt)}
            </Text>
          </Text>
        </View>
      </View>
      {TearLine('mid')}
      <View className={`w-20 items-center justify-center ${countdownBg}`}>
        <Text className={`font-pretBold text-[16px] leading-[19px] ${countdownText}`}>
          {countdownLabel}
        </Text>
      </View>
      {TearLine('right')}
    </Pressable>
  );
}

function TearLine(position: 'left' | 'mid' | 'right') {
  const count = 6;
  const dotSize = 7;
  const capSize = 11;

  const positionStyle = {
    left: 'h-[87px] -top-[3.5px] -left-[3.5px]',
    mid: 'h-[91px] -top-[5.5px] right-[74.5px]',
    right: 'h-[87px] -top-[3.5px] -right-[3.5px]',
  }[position];

  const edgeSize = position === 'mid' ? capSize : dotSize;
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
      className={`absolute z-10 items-center justify-between ${positionStyle}`}>
      {Dot(edgeSize, -1)}
      {Array.from({ length: count }).map((_, i) => Dot(dotSize, i))}
      {Dot(edgeSize, count)}
    </View>
  );
}
