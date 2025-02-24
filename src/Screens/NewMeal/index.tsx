import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import Form from './Components/Form';
import { Header } from './Components/Header';
import { View } from 'react-native';

const NewMeal = () => {
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <View
      className="flex-1"
      testID={'new-meal-screen'}>
      <SafeScreenContent className="mx-0 bg-base-500">
        <Header goBack={goBack} />
        <Form />
      </SafeScreenContent>
    </View>
  );
};

export { NewMeal };
