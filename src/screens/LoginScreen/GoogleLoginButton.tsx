import { Pressable, Text, Image } from 'react-native';

type Props = {
  onPress?: () => void;
};

export default function GoogleLoginButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-5 h-16 flex-row items-center justify-between gap-3 self-center rounded-full bg-white px-6">
      <Image
        source={require('./google-logo.png')}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
      <Text className="font-pretBold text-[20px] text-black">Google 계정으로 계속하기</Text>
    </Pressable>
  );
}
