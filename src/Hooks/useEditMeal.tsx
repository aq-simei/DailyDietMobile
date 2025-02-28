import { EditMeal } from '@src/api/Mutations/EditMeal';
import { EditMealRequestDTO } from '@src/types/dtos/Requests/EditMealRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseEditMealReturn = {
  editMeal: (meal: EditMealRequestDTO) => Promise<void>;
  editMealSuccess: boolean;
  editMealError: boolean;
  editMealPending: boolean;
};

export const UseEditMeal = (): UseEditMealReturn => {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (data: EditMealRequestDTO) => {
      await EditMeal(data);
    },
    mutationKey: ['editMeal'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'fetchMeal' });
      queryClient.invalidateQueries({ queryKey: 'userMeals' });
    },
  });
  return {
    editMeal: mutateAsync,
    editMealSuccess: isSuccess,
    editMealError: isError,
    editMealPending: isPending,
  };
};
