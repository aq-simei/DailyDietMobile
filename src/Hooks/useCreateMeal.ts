import { AddMealRequestDTO } from '@src/types/dtos/Requests/AddMealRequest';
import { AddMeal } from '@src/api/Mutations/AddMeal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showInfoToast, showSuccessToast } from '@src/Components/Toasts/Toasts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';

export const UseCreateMeal = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const queryClient = useQueryClient();
  const {
    mutateAsync: createMeal,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (meal: AddMealRequestDTO) => {
      await AddMeal(meal);
    },
    mutationKey: ['createMeal'],
    onSuccess: () => {
      showSuccessToast('Meal created');
      queryClient.invalidateQueries({ queryKey: ['userMeals'] });
      navigation.navigate('Home');
    },
    onError: (error) => {
      showInfoToast('Error creating meal');
      console.log(error);
    },
  });
  return {
    createMeal,
    createMealSuccess: isSuccess,
    createMealError: isError,
    createMealPending: isPending,
  };
};
