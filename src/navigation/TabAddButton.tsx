import { Pressable, View } from 'react-native';
import AddImageIcon from '@/assets/icons/add-image.svg';

type Props = {
  onPress: () => void;
};

export default function TabAddButton({ onPress }: Props) {
  return (
    <View className="flex-1 items-center">
      <Pressable
        onPress={onPress}
        className="absolute -top-10 h-[76px] w-[76px] items-center justify-center rounded-full border-[6px] border-white bg-primary shadow-sm">
        <AddImageIcon width={42} height={42} color={'#FFFFFF'} />
      </Pressable>
    </View>
  );
}
