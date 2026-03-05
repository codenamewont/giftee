import { Pressable, Text, View } from 'react-native';

export type CouponBoxTabKey = 'active' | 'used';

type Props = {
  value: CouponBoxTabKey;
  onChange: (next: CouponBoxTabKey) => void;
};

export default function CouponBoxTabs({ value, onChange }: Props) {
  return (
    <View className="h-11 w-full flex-row">
      <Pressable
        onPress={() => onChange('active')}
        className={`flex-1 items-center justify-center border-b-2 ${value === 'active' ? 'border-b-primary' : 'border-b-gray-ui'}`}>
        <Text
          className={`font-pretBold text-[16px] leading-[20px] ${value === 'active' ? 'text-primary' : 'text-gray-text'}`}>
          사용 가능
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('used')}
        className={`flex-1 items-center justify-center border-b-2 ${value === 'used' ? 'border-b-primary' : 'border-b-gray-ui'}`}>
        <Text
          className={`font-pretBold text-[16px] leading-[20px] ${value === 'used' ? 'text-primary' : 'text-gray-text'}`}>
          사용 완료
        </Text>
      </Pressable>
    </View>
  );
}
