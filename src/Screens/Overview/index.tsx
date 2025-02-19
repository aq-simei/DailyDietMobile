import { SafeScreenContent } from '@components/SafeScreenContent/SafeScreenContent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { Colors } from '@src/Constants/Colors';
import { ArrowLeft } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutLeft } from 'react-native-reanimated';

export const Overview = () => {
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();
  return (
    <Animated.View className="flex-1 bg-transparent" entering={SlideInDown.duration(500)} exiting={SlideOutLeft.duration(500)}>
      <SafeScreenContent className="mx-0 bg-green-200">
        <View className="border-red50 mt-6 flex w-full flex-row">
          <TouchableOpacity onPress={goBack} className="ml-6 h-10 items-center rounded-full">
            <ArrowLeft color={Colors.green[500]} height={18} width={18} />
          </TouchableOpacity>
          <View className="mr-6 flex w-auto flex-1 items-center">
            <Text className="font-nunito-bold text-lg">75%</Text>
            <Text className="font-nunito text-mdi">meals in diet plan</Text>
          </View>
        </View>
        <View className="mt-6 flex w-full flex-1 items-center rounded-t-3xl bg-base-700 px-6 shadow-md shadow-base-100">
          <Text className="font-sembold mt-6 text-2xl">Stats overview</Text>
          <View className="mt-6 w-full flex-1 gap-6">
            <View className="h-20 w-full items-center justify-evenly rounded-xl bg-base-600">
              <Text className="font-nunito-bold text-lg">22</Text>
              <Text className="font-nunito-semibold text-md">Best in diet meals streak</Text>
            </View>
            <View className="h-20 w-full items-center justify-evenly rounded-xl bg-base-600">
              <Text className="font-nunito-bold text-lg">100</Text>
              <Text className="font-nunito-semibold text-md">Recorded meals</Text>
            </View>
            <View className="flex h-28 w-auto flex-row gap-4">
              <View className="w-full flex-1 items-center justify-evenly rounded-xl bg-green-100">
                <Text className="font-nunito-bold text-lg">88</Text>
                <Text className="font-nunito-semibold text-md">In diet meals</Text>
              </View>
              <View className="w-full flex-1 items-center justify-evenly rounded-xl bg-red-100">
                <Text className="font-nunito-bold text-lg">12</Text>
                <Text className="font-nunito-semibold text-md">Junk meals</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeScreenContent>
    </Animated.View>
  );
};
