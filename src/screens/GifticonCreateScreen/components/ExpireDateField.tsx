import { useState } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { toDateString } from '@/features/gifticon/utils/date';
import FieldLabel from './FieldLabel';
import InputField from './InputField';

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function ExpireDateField({ value, onChange }: Props) {
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const [tempDate, setTempDate] = useState(value ?? new Date());

  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: value ?? new Date(),
        mode: 'date',
        minimumDate: new Date(),
        onChange: (_, d) => d && onChange(d),
      });
      return;
    }

    setTempDate(value ?? new Date());
    setShowIOSPicker(true);
  };

  return (
    <View>
      <FieldLabel label="만료일" />
      <Pressable onPress={openDatePicker}>
        <View pointerEvents="none">
          <InputField
            placeholder="만료일을 선택하세요"
            value={value ? toDateString(value) : ''}
            editable={false}
          />
        </View>
      </Pressable>

      <Modal visible={Platform.OS === 'ios' && showIOSPicker} transparent animationType="fade">
        <Pressable
          className="flex-1 items-center justify-center bg-black/35"
          onPress={() => setShowIOSPicker(false)}>
          <Pressable
            className="rounded-[20px] bg-background px-2"
            onPress={(e) => e.stopPropagation()}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="inline"
              accentColor="#F6764E"
              minimumDate={new Date()}
              onChange={(_, d) => d && setTempDate(d)}
            />
            <View className="flex-row gap-3 px-1 pb-[14px] pt-1">
              <Pressable
                className="flex-1 rounded-full bg-gray-ui p-[10px]"
                onPress={() => setShowIOSPicker(false)}>
                <Text className="text-center font-pretMedium text-[16px] leading-[19px] text-black">
                  취소
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 rounded-full bg-primary p-[10px]"
                onPress={() => {
                  onChange(tempDate);
                  setShowIOSPicker(false);
                }}>
                <Text className="text-center font-pretBold text-[16px] leading-[19px] text-white">
                  확인
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
