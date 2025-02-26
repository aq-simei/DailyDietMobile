import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@src/Components/Button/Button';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import Animated, { BounceIn, SlideInDown } from 'react-native-reanimated';

export function DeleteMeal() {
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();
  const { params } = useRoute<RouteProp<HomeStackParamList, 'DeleteMeal'>>();

  const handleDelete = () => {
    // Add delete logic here
    console.log('Deleting meal:', params.mealId);
    goBack();
  };

  return (
    <Animated.View entering={BounceIn} className="flex-1 bg-black/50 items-center justify-center">
      <View className="w-[80%] bg-base-700 rounded-lg p-6">
        <Text className="mb-4 text-center font-nunito-bold text-lg text-base-100">
          Delete Meal
        </Text>
        <Text className="mb-6 text-center font-nunito text-base-100">
          Are you sure you want to delete "{params.mealName}"?
        </Text>
        <View className="flex-row justify-between gap-4">
          <Button
            title="Cancel"
            className="flex-1 rounded-lg bg-base-200 p-3"
            onPress={goBack}
          />
          <TouchableOpacity
            className="flex-1 rounded-lg bg-brick-red-400 p-3"
            onPress={handleDelete}>
            <Text className="text-center font-nunito-bold text-base-700">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
