import { SafeScreenContent } from '@components/SafeScreenContent/SafeScreenContent';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { Colors } from '@src/Constants/Colors';
import { ArrowLeft } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, SlideInDown, SlideInRight } from 'react-native-reanimated';

export const Overview = () => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
  const { maxStreak, junkMeals, currentStreak, inDietMeals, totalMeals } =
    useRoute<RouteProp<HomeStackParamList, 'Overview'>>().params;

  const percentage = (inDietMeals / totalMeals) * 100;
  return (
    <SafeScreenContent className="mx-0 bg-green-200">
      <Animated.View className="bg-transparent flex-1">
        <Animated.View entering={SlideInRight} className="border-red50 mt-6 flex w-full flex-row">
          <TouchableOpacity
            onPress={() => navigate('Home', { source: 'overview' })}
            className="ml-6 h-10 items-center rounded-full">
            <ArrowLeft color={Colors.green[500]} height={18} width={18} />
          </TouchableOpacity>
          <View className="mr-6 flex w-auto flex-1 items-center">
            <Text className="font-nunito-bold text-lg">
              {isNaN(percentage) ? 0 : percentage.toFixed(2)}%
            </Text>
            <Text className="font-nunito text-mdi">of meals in diet plan</Text>
          </View>
        </Animated.View>
        <Animated.View
          entering={SlideInDown}
          className="mt-6 flex w-full flex-1 items-center rounded-t-3xl bg-base-700 px-6 shadow-md shadow-base-100">
          <Text className="mt-6 text-2xl font-semibold">Stats overview</Text>
          <Animated.View entering={FadeInLeft} className="mt-6 w-full flex-1 gap-6">
            <View className="h-20 w-full items-center justify-evenly rounded-xl bg-base-600">
              <Text className="font-nunito-bold text-lg">{maxStreak}</Text>
              <Text className="font-nunito-semibold text-md">Best in diet meals streak</Text>
            </View>
            <View className="h-20 w-full items-center justify-evenly rounded-xl bg-base-600">
              <Text className="font-nunito-bold text-lg">{totalMeals}</Text>
              <Text className="font-nunito-semibold text-md">Recorded meals</Text>
            </View>
            <View className="flex h-28 w-auto flex-row gap-4">
              <View className="w-full flex-1 items-center justify-evenly rounded-xl bg-green-100">
                <Text className="font-nunito-bold text-lg">{inDietMeals}</Text>
                <Text className="font-nunito-semibold text-md">In diet meals</Text>
              </View>
              <View className="w-full flex-1 items-center justify-evenly rounded-xl bg-brick-red-300">
                <Text className="font-nunito-bold text-lg">{junkMeals}</Text>
                <Text className="font-nunito-semibold text-md">Junk meals</Text>
              </View>
            </View>

            <View className="h-20 w-full items-center justify-evenly rounded-xl bg-base-600">
              <Text className="font-nunito-bold text-lg">{currentStreak}</Text>
              <Text className="font-nunito-semibold text-md">Current in diet streak</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeScreenContent>
  );
};
