import { Pressable, View } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function TabAddButton({ onPress }: Props) {
  return (
    <View className="flex-1 items-center">
      <Pressable
        onPress={onPress}
        className="bg-primary absolute -top-10 h-[76px] w-[76px] rounded-full border-[6px] border-white shadow-sm"></Pressable>
    </View>
  );
}
