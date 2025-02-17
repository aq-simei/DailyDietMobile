import { AddMealRequestDTO } from '@src/types/dtos/Requests/AddMealRequest';
import { AddMeal } from '@src/api/Mutations/AddMeal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const UseCreateMeal = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createMeal,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (meal: AddMealRequestDTO) => {
      AddMeal(meal);
    },
    mutationKey: ['createMeal'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMeals'] });
    },
  });
  return {
    createMeal,
    createMealSuccess: isSuccess,
    createMealError: isError,
    createMealPending: isPending,
  };
};
