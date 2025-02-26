import { DeleteMeal } from '@src/api/Mutations/DeleteMeal';
import { showSuccessToast } from '@src/Components/Toasts/Toasts';
import { useMutation } from '@tanstack/react-query';

export type UseDeleteMeal = {
  deleteMeal: (deleteMealDto: { id: string }) => Promise<void>;
  isError: boolean;
  isSuccess: boolean;
  isPaused: boolean;
};

export const useDeleteMeal = () => {
  const { mutateAsync, data, isPaused, isSuccess, isError } = useMutation({
    mutationFn: DeleteMeal,
    mutationKey: ['deleteMeal'],
    onSuccess: () => {
      showSuccessToast('Meal deleted');
    },
  });
  return {
    deleteMeal: mutateAsync,
    isPaused,
    isSuccess,
    isError,
  };
};
