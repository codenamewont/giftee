import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function GifticonDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Text>{id}</Text>
    </View>
  );
}
