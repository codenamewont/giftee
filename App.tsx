import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    pretMedium: require('./assets/fonts/Pretendard-Medium.otf'),
    pretBold: require('./assets/fonts/Pretendard-Bold.otf'),
  });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold">GIFTEE</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
