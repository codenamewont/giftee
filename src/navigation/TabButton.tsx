import { View, Text, Pressable } from 'react-native';

type Props = {
  label: string;
  focused: boolean;
  onPress?: () => void;
};

export default function TabButton({ label, focused, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="h-full flex-1 items-center justify-start gap-2 self-stretch pt-[17px]">
      <View className={`h-6 w-6 ${focused ? 'bg-black' : 'bg-gray-text'}`} />
      <Text className={`font-pretMedium text-[12px] ${focused ? 'text-black' : 'text-gray-text'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
