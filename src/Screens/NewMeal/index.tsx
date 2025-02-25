import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import Form from './Components/Form';
import { Header } from './Components/Header';
import { View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

const NewMeal = () => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <Animated.View entering={SlideInDown} className="flex-1" testID={'new-meal-screen'}>
      <SafeScreenContent className="mx-0 bg-base-500">
        <Header goBack={() => navigate('Home', { source: 'newMeal' })} />
        <Form />
      </SafeScreenContent>
    </Animated.View>
  );
};

export { NewMeal };
