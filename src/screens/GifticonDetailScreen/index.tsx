import { Alert, Image, ScrollView, View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import type { Gifticon } from '@/features/gifticon/types';
import { gifticonApi } from '@/features/gifticon/api/gifticonApi';

export default function GifticonDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };

  const [aspectRatio, setAspectRatio] = useState(1);
  const [gifticon, setGifticon] = useState<Gifticon | null>(null);

  useEffect(() => {
    const loadGifticon = async () => {
      try {
        const data = await gifticonApi.readDetail(id);
        setGifticon(data);
      } catch (error) {
        console.error(error);
        Alert.alert('쿠폰 정보를 불러오는 중 오류가 발생했습니다.');
        navigation.goBack();
      }
    };

    loadGifticon();
  }, [id]);

  if (!gifticon) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text>gifticon not found</Text>
        <Text>{id}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 py-10"
      showsVerticalScrollIndicator={false}>
      <View className="relative w-full overflow-hidden">
        <TearLine className="-top-[7px]" />
        <Image
          source={{ uri: gifticon.imageUrl }}
          style={{ width: '100%', aspectRatio }}
          resizeMode="contain"
          onLoad={(e) => {
            const { width, height } = e.nativeEvent.source;
            if (width && height) {
              setAspectRatio(width / height);
            }
          }}
        />
        <TearLine withCap className="-bottom-[14px]" />
      </View>
      <View className="relative w-full overflow-hidden bg-primary">
        <TearLine withCap className="-top-[14px]" />
        <Text className="py-8 text-center font-pretBold text-[24px] leading-[29px] text-white">
          {gifticon.productName}
        </Text>
        <View className="mb-6 gap-4">
          <View className="flex-row items-center justify-between px-4">
            <Text className="font-pretMedium text-[16px] leading-[19px] text-muted">교환처</Text>
            <Text className="font-pretMedium text-[16px] leading-[19px] text-white">
              {gifticon.brand}
            </Text>
          </View>
          <View className="h-[1px] w-full bg-[#FAFAFA]"></View>
          <View className="flex-row items-center justify-between px-4">
            <Text className="font-pretMedium text-[16px] leading-[19px] text-muted">유효기간</Text>
            <Text className="font-pretMedium text-[16px] leading-[19px] text-white">
              {gifticon.expiresAt}
            </Text>
          </View>
        </View>
        <TearLine className="-bottom-[7px]" />
      </View>
      <Text className="mt-4 text-center font-pretMedium text-[16px] leading-[19px] text-primary">
        스와이프 하여 사용 완료하기
      </Text>
    </ScrollView>
  );
}

function TearLine({ withCap = false, className }: { withCap?: boolean; className?: string }) {
  const count = 11;
  const dotSize = 14;
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
      className="bg-background"
    />
  );

  return (
    <View
      pointerEvents="none"
      style={{
        left: -edgeSize / 2,
        right: -edgeSize / 2,
      }}
      className={`absolute z-10 flex-row items-center justify-between ${className}`}>
      {Dot(edgeSize, -1)}
      {Array.from({ length: count }).map((_, i) => Dot(dotSize, i))}
      {Dot(edgeSize, count)}
    </View>
  );
}
