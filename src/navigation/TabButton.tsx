import { Text, Pressable } from 'react-native';

type Props = {
  label: string;
  focused: boolean;
  onPress?: () => void;
  Icon: React.ComponentType<{
    width?: number;
    height?: number;
    color?: string;
  }>;
};

export default function TabButton({ label, focused, onPress, Icon }: Props) {
  const color = focused ? '#111111' : '#979797';

  return (
    <Pressable
      onPress={onPress}
      className="h-full flex-1 items-center justify-start gap-2 self-stretch pt-[17px]">
      <Icon width={24} height={24} color={color} />
      <Text className={`font-pretMedium text-[12px] ${focused ? 'text-black' : 'text-gray-text'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
