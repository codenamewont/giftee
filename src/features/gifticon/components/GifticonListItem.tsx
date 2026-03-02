import { View } from 'react-native';

export default function GifticonListItem() {
  return (
    <View className="relative h-20 w-full flex-row">
      {TearLine('left')}
      <View className="bg-secondary flex-1"></View>
      {TearLine('mid')}
      <View className="bg-secondary w-20"></View>
      {TearLine('right')}
    </View>
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
