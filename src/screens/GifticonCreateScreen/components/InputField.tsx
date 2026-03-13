import { TextInput } from 'react-native';

type Props = {
  placeholder: string;
  value?: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'number-pad';
};

export default function InputField({
  placeholder,
  value,
  editable = true,
  onChangeText,
  keyboardType = 'default',
}: Props) {
  return (
    <TextInput
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#979797"
      className="rounded-full bg-white px-[21px] py-6 font-pretMedium text-[16px] leading-[19px] text-black"
    />
  );
}
