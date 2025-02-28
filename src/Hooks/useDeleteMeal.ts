import { DeleteMeal } from '@src/api/Mutations/DeleteMeal';
import { showSuccessToast } from '@src/Components/Toasts/Toasts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UseDeleteMeal = {
  deleteMeal: (deleteMealDto: { id: string }) => Promise<void>;
  isError: boolean;
  isSuccess: boolean;
  isPaused: boolean;
};

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPaused, isSuccess, isError } = useMutation({
    mutationFn: DeleteMeal,
    mutationKey: ['deleteMeal'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMeals'] });
      queryClient.invalidateQueries({ queryKey: ['fetchMeal'] });
    },
  });
  return {
    deleteMeal: mutateAsync,
    isPaused,
    isSuccess,
    isError,
  };
};
