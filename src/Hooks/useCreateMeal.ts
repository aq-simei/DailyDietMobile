import { AddMealRequestDTO } from '@src/types/dtos/Requests/AddMealRequest';
import { AddMeal } from '@src/api/Mutations/AddMeal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showInfoToast, showSuccessToast } from '@src/Components/Toasts/Toasts';

export const UseCreateMeal = () => {
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
    },
    onError: (error) => {
      showInfoToast('Error creating meal');
      console.log(error);
    }
  });
  return {
    createMeal,
    createMealSuccess: isSuccess,
    createMealError: isError,
    createMealPending: isPending,
  };
};
