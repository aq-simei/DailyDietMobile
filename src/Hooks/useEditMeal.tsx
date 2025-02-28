import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { editMeal } from '@src/api/Mutations/EditMeal';
import { showSuccessToast } from '@src/Components/Toasts/Toasts';
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
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList, 'Home'>>();
  const { isError, isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (data: EditMealRequestDTO) => {
      await editMeal(data);
    },
    mutationKey: ['editMeal'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'fetchMeal' });
      queryClient.invalidateQueries({ queryKey: 'userMeals' });
      queryClient.invalidateQueries({ queryKey: 'userStats' });
      showSuccessToast('Meal edited successfully');
      navigate('Home', { source: 'editMeal', refreshData: true });
    },
  });
  return {
    editMeal: mutateAsync,
    editMealSuccess: isSuccess,
    editMealError: isError,
    editMealPending: isPending,
  };
};
