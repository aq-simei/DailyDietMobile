import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { SafeScreenContent } from '@components/SafeScreenContent/SafeScreenContent';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Logo from './assets/Logo.svg';

import './global.css';

//<Logo />
export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeScreenContent>
        <Text className="font-nunito-bold text-lg">Hello world, from a safe content</Text>
      </SafeScreenContent>
    </SafeAreaProvider>
  );
}
