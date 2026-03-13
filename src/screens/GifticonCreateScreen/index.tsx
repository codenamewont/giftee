import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gifticonApi } from '@/features/gifticon/api/gifticonApi';
import { toDateString } from '@/features/gifticon/utils/date';
import FieldLabel from './components/FieldLabel';
import InputField from './components/InputField';
import ExpireDateField from './components/ExpireDateField';
import { useNavigation } from '@react-navigation/native';

export default function GifticonCreateScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [brand, setBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!brand.trim() || !productName.trim() || !price.trim() || !expiresAt) {
      Alert.alert('모든 항목을 입력해주세요.');
      return;
    }

    const parsedPrice = Number(price.replace(/[^0-9]/g, ''));
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('가격을 올바르게 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      await gifticonApi.create({
        brand: brand.trim(),
        productName: productName.trim(),
        price: parsedPrice,
        expiresAt: toDateString(expiresAt),
        imageUrl: 'https://picsum.photos/400',
        imageHash: 'temp-image-hash',
      });

      Alert.alert('기프티콘이 쿠폰함에 등록되었습니다.', undefined, [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('기프티콘 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <InputField placeholder="브랜드명을 입력하세요" value={brand} onChangeText={setBrand} />
          </View>
          <View>
            <FieldLabel label="상품명" />
            <InputField
              placeholder="상품명을 입력하세요"
              value={productName}
              onChangeText={setProductName}
            />
          </View>
          <View>
            <FieldLabel label="가격" />
            <InputField
              placeholder="가격을 입력하세요"
              value={price}
              onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
            />
          </View>
          <ExpireDateField value={expiresAt} onChange={setExpiresAt} />
        </View>
      </ScrollView>

      {/* 등록 버튼 */}
      <Pressable
        onPress={handleSubmit}
        disabled={isSubmitting}
        className="absolute left-0 right-0 mx-4 h-20 items-center justify-center rounded-full bg-primary"
        style={{ bottom: insets.bottom + 20 }}>
        <Text className="font-pretBold text-[20px] text-white">등록 완료</Text>
      </Pressable>
    </View>
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
