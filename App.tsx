import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  const [loaded] = useFonts({
    pretMedium: require('./assets/fonts/Pretendard-Medium.otf'),
    pretBold: require('./assets/fonts/Pretendard-Bold.otf'),
  });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
