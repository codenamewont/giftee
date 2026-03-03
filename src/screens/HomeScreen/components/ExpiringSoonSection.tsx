import { View, Text } from 'react-native';
import ExpiringSoonCard from './ExpiringSoonCard';

export default function ExpiringSoonSection() {
  return (
    <View className="gap-1 px-4">
      <View className="flex-row items-end gap-3">
        <Text className="font-pretBold text-[24px] leading-[29px] text-black">
          곧 만료되는 쿠폰
        </Text>
        <Text className="font-pretMedium text-gray-text text-[14px] leading-[17px]">
          3일 이내 만료 2개
        </Text>
      </View>
      <ExpiringSoonCard
        gifticon={{
          id: '1',
          brand: '올리브영',
          productName: '기프트카드 2만원권',
          expiresAt: '2026-03-07',
          imageUrl:
            'https://biz-con.co.kr/upload/images/202306/400_20230621181620939_CouponA10000.png',
        }}
      />
    </View>
  );
}
