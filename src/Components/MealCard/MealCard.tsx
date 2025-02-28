import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Vibration } from 'react-native';
import { CircleCheck, CircleAlert } from 'lucide-react-native';
import { Colors } from '@src/Constants/Colors';
import { Meal } from '@src/@types/meal';
import { formatTime } from '@src/Utils/formatters/formatTime';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface MealListItemProps {
  meal: Meal;
  onDeleteRequest: (meal: Meal) => void;
}

const MealCard: React.FC<MealListItemProps> = ({ meal, onDeleteRequest }) => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
  const translateX = useSharedValue(0);
  const leftContentTranslateX = useSharedValue(-100); // Initial position off-screen
  const rightContentTranslateX = useSharedValue(100); // Initial position off-screen

  const handleRightSwipe = () => {
    Vibration.vibrate(); // Vibrate for 100 milliseconds
    navigate('EditMeal', { mealId: meal.id });
  };

  const handleLeftSwipe = () => {
    Vibration.vibrate(100); // Vibrate for 100 milliseconds
    onDeleteRequest(meal);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (evt, gestureState) => {
        translateX.value = gestureState.dx;
        if (gestureState.dx > 0) {
          leftContentTranslateX.value = withSpring(0);
          rightContentTranslateX.value = withTiming(100); // Reset right content
        } else {
          rightContentTranslateX.value = withSpring(0);
          leftContentTranslateX.value = withTiming(-100); // Reset left content
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          translateX.value = withSpring(0, {}, (finished) => {
            if (finished) {
              leftContentTranslateX.value = withTiming(-100);
              rightContentTranslateX.value = withTiming(100);
              runOnJS(handleRightSwipe)();
            }
          });
        } else if (gestureState.dx < -50) {
          translateX.value = withSpring(0, {}, (finished) => {
            if (finished) {
              leftContentTranslateX.value = withTiming(-100);
              rightContentTranslateX.value = withTiming(100);
              runOnJS(handleLeftSwipe)();
            }
          });
        } else {
          translateX.value = withSpring(0);
          leftContentTranslateX.value = withTiming(-100);
          rightContentTranslateX.value = withTiming(100);
        }
      },
    })
  ).current;

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedLeftContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftContentTranslateX.value }],
  }));

  const animatedRightContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightContentTranslateX.value }],
  }));

  return (
    <View {...panResponder.panHandlers} style={{ position: 'relative' }}>
      <Animated.View style={[[animatedCardStyle], { justifyContent: 'center' }]}>
        <View className="m-2 flex h-16 flex-row items-center justify-center rounded-xl border border-base-300 p-4">
          <Text className="px-2 font-nunito-bold">{formatTime(meal.time)}</Text>
          <Text className="flex-1 font-nunito-semibold">
            <Text className="font-nunito-bold text-base-400">| </Text>
            {meal.name}
          </Text>
          <Text className="font-nunito">
            {meal.in_diet ? (
              <CircleCheck color={Colors.green[400]} size={16} />
            ) : (
              <CircleAlert color={Colors['brick-red'][400]} size={16} />
            )}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        className="absolute left-0 top-2 flex h-16 w-auto flex-row items-center justify-center gap-2 rounded-lg bg-green-800"
        style={[animatedLeftContentStyle]}>
        <Text className="p-2 font-nunito-bold text-base-700">Edit meal</Text>
      </Animated.View>
      <Animated.View
        className="absolute right-0 top-2 flex h-16 w-auto flex-row items-center justify-center gap-2 rounded-lg bg-brick-red-800"
        style={[
          {
            position: 'absolute',
            justifyContent: 'center',
          },
          animatedRightContentStyle,
        ]}>
        <Text className="p-2 font-nunito-bold text-base-700">Delete Meal</Text>
      </Animated.View>
    </View>
  );
};

export { MealCard };
