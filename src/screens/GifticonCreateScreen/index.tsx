import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GifticonCreateScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 120,
        }}>
        {/* 이미지 업로드 */}
        <View className="px-[3px] py-[19px]">
          <View className="relative overflow-hidden">
            <Pressable className="h-60 w-full items-center justify-center border-2 border-gray-ui">
              <TearLine className="-top-[10px]" />
              <View className="items-center">
                <View className="mb-6 h-[60px] w-[60px] bg-black" />
                <Text className="mb-1 font-pretBold text-[20px] leading-[24px] text-black">
                  쿠폰 이미지 업로드
                </Text>
                <Text className="font-pretBold text-[16px] leading-[19px] text-gray-text">
                  바코드나 쿠폰 이미지를 선택하세요
                </Text>
              </View>
              <TearLine className="-bottom-[10px]" />
            </Pressable>
          </View>
        </View>
        {/* 쿠폰 정보 입력 */}
        <View className="gap-4">
          <View>
            <FieldLabel label="브랜드명" />
            <InputField placeholder="브랜드명을 입력하세요" />
          </View>
          <View>
            <FieldLabel label="상품명" />
            <InputField placeholder="상품명을 입력하세요" />
          </View>
          <View>
            <FieldLabel label="가격" />
            <InputField placeholder="가격을 입력하세요" />
          </View>
          <View>
            <FieldLabel label="만료일" />
            <InputField placeholder="만료일을 선택하세요" />
          </View>
        </View>
      </ScrollView>

      {/* 등록 버튼 */}
      <Pressable
        className="absolute left-0 right-0 mx-4 h-20 items-center justify-center rounded-full bg-primary"
        style={{ bottom: insets.bottom + 20 }}>
        <Text className="font-pretBold text-[20px] text-white">등록 완료</Text>
      </Pressable>
    </View>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <Text className="mb-[10px] px-5 font-pretBold text-[16px] leading-[19px] text-black">
      {label}
    </Text>
  );
}

function InputField({ placeholder }: { placeholder: string }) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#979797"
      className="rounded-full bg-white px-[21px] py-6 font-pretMedium text-[16px] leading-[19px] text-black"
    />
  );
}

function TearLine({ withCap = false, className }: { withCap?: boolean; className?: string }) {
  const count = 11;
  const dotSize = 18;
  const capSize = 28;

  const edgeSize = withCap ? capSize : dotSize;
  const Dot = (size: number, key: number) => (
    <View
      key={key}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      className="border-2 border-gray-ui bg-background"
    />
  );

  return (
    <View
      pointerEvents="none"
      style={{
        left: -(edgeSize / 2 + 1),
        right: -(edgeSize / 2 + 1),
      }}
      className={`absolute z-10 flex-row items-center justify-between ${className}`}>
      {Dot(edgeSize, -1)}
      {Array.from({ length: count }).map((_, i) => Dot(dotSize, i))}
      {Dot(edgeSize, count)}
    </View>
  );
}
