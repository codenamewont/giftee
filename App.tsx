import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold">GIFTEE</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
