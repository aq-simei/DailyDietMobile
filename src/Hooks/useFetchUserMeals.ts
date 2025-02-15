import { Meal } from '@src/@types/meal';
import { GetUserMealsResponse } from '@src/api/DTOs/Responses/GetUserMealsResponse';
import { fetchUserMeals } from '@src/api/Queries/FetchUserMeals';
import { useQuery } from '@tanstack/react-query';

type SectionData = {
  title: string;
  data: Meal[];
};

type UseFetchUserMealsData = {
  data: SectionData[];
  isLoading: boolean;
  isError: boolean;
  success: boolean;
};

export const UseFetchUserMeals = (): UseFetchUserMealsData => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['fetchUserMeals'],
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

      // Sort meals by time within each date group
      const sortedGroupedMeals = Object.keys(groupedMeals).map((date) => ({
        title: date,
        data: groupedMeals[date].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        ),
      }));

      // Sort groups by date
      sortedGroupedMeals.sort((a, b) => new Date(b.title).getTime() - new Date(a.title).getTime());

      return sortedGroupedMeals;
    },
  });
  return {
    data: data ?? [],
    isLoading,
    isError,
    success: isSuccess,
  };
};
