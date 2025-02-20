import { fetchMeal } from '@src/api/Queries/FetchMeal';
import { GetMealResponse } from '@src/types/dtos/Responses/GetMealResponse';
import { useQuery } from '@tanstack/react-query';

type UseFetchMealData = {};

type UseFetchMealProps = {
  mealId: string;
};
export const UseFetchMeal = ({ mealId }: UseFetchMealProps) => {
  const { data, isSuccess, isError, isLoading, error } = useQuery({
    queryKey: ['fetchMeal'],
    queryFn: () => fetchMeal({ mealId }),
    enabled: mealId !== '',
  });
  return {
    data: data,
    fetchMealSuccess: isSuccess,
    fetchMealIsError: isError,
    fetchMealError: error,
    fetchMealLoading: isLoading,
  };
};
