import { axiosInstance } from '../axios';
import { GetMealResponse } from '@src/types/dtos/Responses/GetMealResponse';

type FetchMealProps = {
  mealId: string;
};

export const fetchMeal = async ({ mealId }: FetchMealProps): Promise<GetMealResponse> => {
  try {
    const response = await axiosInstance.get<GetMealResponse>(`/meals/${mealId}`);
    return { meal: response.data.meal };
  } catch (error) {
    throw error;
  }
};
