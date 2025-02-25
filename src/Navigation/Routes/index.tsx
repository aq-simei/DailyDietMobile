import Logo from '@assets/Logo.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home } from '@screens/Home/index';
import { Overview } from '@screens/Overview/index';
import { HomeStackParamList } from '@src/@types/navigation';
import { EditMeal } from '@src/Screens/EditMeal';
import { NewMeal } from '@src/Screens/NewMeal';
import { ArrowLeft } from 'lucide-react-native';
import { Image, TouchableOpacity, View } from 'react-native';

export const Routes = () => {
  const Stack = createStackNavigator<HomeStackParamList>();
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: 'none',
        headerTransparent: true,
        headerTitle: '',
        cardStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ source: 'auth' }}
        options={{
          headerLeft: () => (
            <View className="ml-10">
              <Logo width={80} height={40} />
            </View>
          ),
          headerRight: () => (
            <Image
              className="mr-10 h-10 w-10 rounded-full border-4 border-solid object-cover"
              source={{ uri: 'https://github.com/shadcn.png' }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewMeal"
        component={NewMeal}
        options={{
          cardStyle: { backgroundColor: 'white' }, // Change to solid background
          headerShown: false,
          cardOverlayEnabled: true,
          headerLeft: () => (
            <TouchableOpacity className="ml-6" onPress={() => goBack()}>
              <ArrowLeft size={18} strokeWidth={4} className="color-black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="EditMeal"
        component={EditMeal}
        options={{
          cardStyle: { backgroundColor: 'white' }, // Change to solid background
          headerShown: false,
          cardOverlayEnabled: true,
          headerLeft: () => (
            <TouchableOpacity className="ml-6" onPress={goBack}>
              <ArrowLeft size={18} strokeWidth={4} className="color-black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
