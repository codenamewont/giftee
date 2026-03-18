import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gifticonApi } from '@/features/gifticon/api/gifticonApi';
import { toDateString } from '@/features/gifticon/utils/date';
import FieldLabel from './components/FieldLabel';
import InputField from './components/InputField';
import ExpireDateField from './components/ExpireDateField';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase';
import AddImageIcon from '@/assets/icons/add-image.svg';
import { runExpiryExperiment } from 'experiments/ocr/runExpiryExperiment';

export default function GifticonCreateScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [brand, setBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('사진 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    setImageUri(uri);

    // Android에서 OCR 라이브러리가 불안정하여 iOS에서만 실행
    if (Platform.OS === 'ios') {
      await runExpiryExperiment();
    }
  };

  const getImageHash = async (fileBase64: string) => {
    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, fileBase64, {
      encoding: Crypto.CryptoEncoding.HEX,
    });
  };

  const getContentType = (fileExtension: string) => {
    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      return 'image/jpeg';
    }
    if (fileExtension === 'png') {
      return 'image/png';
    }
    if (fileExtension === 'webp') {
      return 'image/webp';
    }

    return 'application/octet-stream';
  };

  const uploadImage = async (uri: string, userId: string) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageHash = await getImageHash(base64);

    const { data: existingGifticon, error: duplicateCheckError } = await supabase
      .from('gifticons')
      .select('id')
      .eq('user_id', userId)
      .eq('image_hash', imageHash)
      .maybeSingle();
    if (duplicateCheckError) throw duplicateCheckError;
    if (existingGifticon) {
      throw new Error('이미 등록한 기프티콘 이미지입니다.');
    }

    const fileExtension = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
    const filePath = `gifticons/${userId}/${imageHash}.${fileExtension}`;
    const fileData = decode(base64);

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, fileData, {
        contentType: getContentType(fileExtension),
        upsert: false,
      });
    if (uploadError) throw uploadError;

    return {
      imageUrl: filePath,
      imageHash,
    };
  };

  const handleSubmit = async () => {
    if (!imageUri || !brand.trim() || !productName.trim() || !price.trim() || !expiresAt) {
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

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session) throw new Error('로그인이 필요합니다.');

      const { imageUrl, imageHash } = await uploadImage(imageUri, session.user.id);

      await gifticonApi.create({
        brand: brand.trim(),
        productName: productName.trim(),
        price: parsedPrice,
        expiresAt: toDateString(expiresAt),
        imageUrl,
        imageHash,
      });

      Alert.alert('기프티콘이 쿠폰함에 등록되었습니다.', undefined, [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === '이미 등록한 기프티콘 이미지입니다.' ||
          error.message === '로그인이 필요합니다.'
        ) {
          Alert.alert(error.message);
          return;
        }
      }

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
            <Pressable
              onPress={handlePickImage}
              className="h-60 w-full items-center justify-center border-2 border-gray-ui">
              <TearLine className="-top-[10px]" />
              <View className="items-center">
                <AddImageIcon width={60} height={60} color="#F6764E" style={{ marginBottom: 24 }} />
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
