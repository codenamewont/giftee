import { View } from 'react-native';
import HomeHeader from './components/HomeHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-background flex-1">
      <View
        className="absolute left-0 right-0 top-0 z-50 bg-white"
        style={{ paddingTop: insets.top }}>
        <HomeHeader
          userName="이채원"
          availableCount={8}
          usedThisMonthCount={3}
          totalUsedAmount={45000}
        />
      </View>
    </View>
  );
}
