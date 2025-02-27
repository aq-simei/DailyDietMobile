import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { Button } from '@src/Components/Button/Button';
import { Card } from '@src/Components/Card/Card';
import { MealListItem, UseFetchUserMeals } from '@src/Hooks/useFetchUserMeals';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ArrowUpRight, Cog, Plus } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  SlideInLeft,
  SlideInUp,
} from 'react-native-reanimated';
import { Meal } from '@src/@types/meal';
import { MealCard } from '@src/Components/MealCard/MealCard';
import { MealsHeader } from '@src/Components/MealsHeader/MealsHeader';
import { useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';

const Home = () => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
  const { data, isLoading, refetch } = UseFetchUserMeals();
  const { params = { refreshData: false } } = useRoute<RouteProp<HomeStackParamList, 'Home'>>();
  const source = params?.source;

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleDeleteRequest = (meal: Meal) => {
    navigate('DeleteMeal', {
      mealId: meal.id,
      mealName: meal.name,
    });
  };

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 5000, // Increase the duration to make the rotation slower
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  useEffect(() => {
    if (params?.refreshData) {
      refetch();
    }
  }, [params?.refreshData]);

  const renderItem = ({ item }: { item: MealListItem }) => {
    if (item.type === 'header') {
      return (
        <View className="p-2">
          <Text className="font-nunito-bold text-lg">{item.data as string}</Text>
        </View>
      );
    }
    return <MealCard meal={item.data as Meal} onDeleteRequest={handleDeleteRequest} />;
  };

  return (
    <Animated.View entering={source == 'overview' ? SlideInLeft : SlideInUp} className="flex-1">
      <SafeScreenContent hasHeader>
        <StatusBar style="auto" />
        <Card>
          <Card.Header className="relative">
            <Card.Header.Right>
              <TouchableOpacity onPress={() => navigate('Overview')} className="rounded-full p-2">
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
          <Button
            className="w-full flex-row items-center justify-center rounded-lg bg-base-50 p-4"
            onPress={() => navigate('NewMeal')}>
            <Plus color={Colors.base[700]} strokeWidth={2} size={24} />
            <Text className="font-nunito-bold text-lg text-base-700">Add meal</Text>
          </Button>
        </View>
        {isLoading ? (
          <View className="mt-12 flex flex-1 items-center">
            <MealsHeader />
            <Animated.View style={animatedStyle}>
              <Cog strokeWidth={2} stroke={Colors.base[300]} size={42} />
            </Animated.View>

            <Text className="font-nunito-bold text-lg text-base-300">
              Retrieving your meals, hold on ...
            </Text>
          </View>
        ) : (
          <FlashList
            testID="flash-list"
            data={data}
            renderItem={renderItem}
            estimatedItemSize={80}
            ListHeaderComponent={<MealsHeader />}
            contentContainerStyle={{ paddingTop: 14, paddingBottom: 56 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <LinearGradient
          colors={['transparent', Colors.base[700]]}
          className="absolute bottom-0 left-0 right-0 h-32"
        />
      </SafeScreenContent>
    </Animated.View>
  );
};

export { Home };
