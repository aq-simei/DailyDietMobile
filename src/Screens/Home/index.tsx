import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { Button } from '@src/Components/Button/Button';
import { Card } from '@src/Components/Card/Card';
import { UseFetchUserMeals } from '@src/Hooks/useFetchUserMeals';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ArrowUpRight, CircleAlert, CircleCheck, Plus } from 'lucide-react-native';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { Meal } from '@src/@types/meal';
import { formatTime } from '@src/Utils/formatters/formatTime';

const Home = () => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
  const { data, isError, isLoading, success } = UseFetchUserMeals();
  return (
    <Animated.View entering={SlideInLeft.duration(1000)} className="flex-1">
      <SafeScreenContent hasHeader>
        <StatusBar style="auto" />
        <Card>
          <Card.Header className="relative">
            <Card.Header.Right>
              <TouchableOpacity onPress={() => navigate('Overview')}>
                <ArrowUpRight color={Colors.green[500]} />
              </TouchableOpacity>
            </Card.Header.Right>
          </Card.Header>
          <Card.Content>
            <Text className="font-nunito-bold text-lg">75%</Text>
            <Text className="font-nunito text-md">diet friendly meals</Text>
          </Card.Content>
        </Card>
        <View className="mb-4 mt-4">
          <Text className="font-nunito-semibold">Meals</Text>
          <Button
            className="w-full flex-row items-center justify-center rounded-lg bg-base-50 p-4"
            onPress={() => navigate('NewMeal')}>
            <Plus color={Colors.base[700]} strokeWidth={2} size={24} />
            <Text className="font-nunito-bold text-lg text-base-700">Add meal</Text>
          </Button>
        </View>
        <SectionList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 14, paddingBottom: 56 }}
          sections={data as { title: string; data: Meal[] }[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: Meal }) => (
            <View className="m-2 flex flex-row items-center justify-center rounded-xl border border-base-300 p-4">
              <Text className="px-2 font-nunito-bold">{formatTime(item.time)}</Text>
              <Text className="flex-1 font-nunito-semibold">
                <Text className="font-nunito-bold text-base-400">| </Text>
                {item.name}
              </Text>
              <Text className="font-nunito">
                {item.in_diet ? (
                  <CircleCheck color={Colors.green[400]} size={16} />
                ) : (
                  <CircleAlert color={Colors['brick-red'][400]} size={16} />
                )}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View className="p-2">
              <Text className="font-nunito-bold text-lg">{title}</Text>
            </View>
          )}
        />
        <LinearGradient
          colors={['transparent', Colors.base[700]]}
          className="absolute bottom-0 left-0 right-0 h-32"
        />
      </SafeScreenContent>
    </Animated.View>
  );
};

export { Home };
