import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CircleCheck, CircleAlert } from 'lucide-react-native';
import { Colors } from '@src/Constants/Colors';
import { Meal } from '@src/@types/meal';
import { formatTime } from '@src/Utils/formatters/formatTime';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';

interface MealListItemProps {
  meal: Meal;
}

const MealCard: React.FC<MealListItemProps> = ({ meal }) => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
  return (
    <TouchableOpacity
      className="m-2 flex flex-row items-center justify-center rounded-xl border border-base-300 p-4"
      onPress={() => navigate('EditMeal', { mealId: meal.id })}>
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
    </TouchableOpacity>
  );
};

export { MealCard };
