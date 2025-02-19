import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { ArrowLeft } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Form from './Components/Form';
import { Header } from './Components/Header';

const NewMeal = () => {
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();
  return (
    <Animated.View entering={SlideInDown} exiting={SlideOutDown} className="flex-1" testID={'new-meal-screen'}>
      <SafeScreenContent className="mx-0 bg-base-500">
        <Header goBack={goBack}/>
        <Form />
      </SafeScreenContent>
    </Animated.View>
  );
};

export { NewMeal };
