import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabButton from './TabButton';
import TabAddButton from './TabAddButton';
import { useAuth } from '@/providers/AuthProvider';
import HomeIcon from '@/assets/icons/home.svg';
import CouponBoxIcon from '@/assets/icons/coupon-box.svg';
import ActivityIcon from '@/assets/icons/activity.svg';
import SettingsIcon from '@/assets/icons/settings.svg';

const TAB_BAR_HEIGHT = 80;

const ICONS = {
  홈: HomeIcon,
  쿠폰함: CouponBoxIcon,
  '내 활동': ActivityIcon,
  설정: SettingsIcon,
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const parentNavigation = navigation.getParent();
  const { session } = useAuth();

  return (
    <View
      className="flex-row bg-white"
      style={{
        height: TAB_BAR_HEIGHT + bottom,
        paddingBottom: bottom,
      }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => {
          if (!focused) navigation.navigate(route.name);
        };

        if (route.name === '+') {
          return (
            <TabAddButton
              key={route.key}
              onPress={() => {
                if (session) {
                  parentNavigation?.navigate('GifticonCreate');
                  return;
                }
                parentNavigation?.navigate('Login', { redirectTo: 'GifticonCreate' });
              }}
            />
          );
        }
        const Icon = ICONS[route.name as keyof typeof ICONS];
        return (
          <TabButton
            key={route.key}
            label={route.name}
            focused={focused}
            onPress={onPress}
            Icon={Icon}
          />
        );
      })}
    </View>
  );
}
