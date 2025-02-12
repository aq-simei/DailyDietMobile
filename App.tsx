import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Routes } from '@navigation/Routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
    <NavigationContainer>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
