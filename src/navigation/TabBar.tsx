import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabButton from './TabButton';
import TabAddButton from './TabAddButton';

const TAB_BAR_HEIGHT = 80;

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const parentNavigation = navigation.getParent();

  const session = null; // 임시

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
                parentNavigation?.navigate('Login');
              }}
            />
          );
        }
        return <TabButton key={route.key} label={route.name} focused={focused} onPress={onPress} />;
      })}
    </View>
  );
}
