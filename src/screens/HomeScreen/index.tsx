import GifticonListItem from '@/features/gifticon/components/GifticonListItem';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Home</Text>
      <GifticonListItem />
    </View>
  );
}
