import { Meal } from '@src/@types/meal';
import { GetUserMealsResponse } from '@src/types/dtos/Responses/GetUserMealsResponse';
import { fetchUserMeals } from '@src/api/Queries/FetchUserMeals';
import { useQuery } from '@tanstack/react-query';

export type MealListItem = {
  type: 'header' | 'meal';
  id: string;
  data: Meal | string;
};

type UseFetchUserMealsData = {
  data: MealListItem[];
  isLoading: boolean;
  isError: boolean;
  success: boolean;
  refetch: () => void;
};

export const UseFetchUserMeals = (): UseFetchUserMealsData => {
  const { data: queryData, isLoading, isError, isSuccess, refetch, isRefetchError, isRefetching } = useQuery({
    queryKey: ['userMeals'],
    queryFn: async () => {
      const { meals } = await fetchUserMeals();
      // Group meals by date
      const groupedMeals = meals.reduce(
        (acc, meal) => {
          const date = new Date(meal.date).toDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(meal);
          return acc;
        },
        {} as Record<string, Meal[]>
      );

      // Create flat list with headers
      const flatList: MealListItem[] = [];
      Object.entries(groupedMeals)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .forEach(([date, meals]) => {
          flatList.push({ type: 'header', id: `header-${date}`, data: date });
          meals
            .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
            .forEach(meal => {
              flatList.push({ type: 'meal', id: `meal-${meal.id}`, data: meal });
            });
        });

      return flatList;
    },
  });

  return {
    data: queryData ?? [],
    isLoading : isLoading || isRefetching,
    isError,
    success: isSuccess,
    refetch
  };
};
