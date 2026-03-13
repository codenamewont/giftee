import { Text } from 'react-native';

export default function FieldLabel({ label }: { label: string }) {
  return (
    <Text className="mb-[10px] px-5 font-pretBold text-[16px] leading-[19px] text-black">
      {label}
    </Text>
  );
}
