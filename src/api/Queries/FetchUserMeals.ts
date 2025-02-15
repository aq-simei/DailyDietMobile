import { axiosInstance } from '../axios';
import { GetUserMealsResponse } from '../DTOs/Responses/GetUserMealsResponse';

export const fetchUserMeals = async (): Promise<GetUserMealsResponse> => {
  try {
    const response = await axiosInstance.get<GetUserMealsResponse>('/meals/list');
    return { meals: Array.isArray(response.data) ? response.data : [] };
  } catch (error) {
    throw error;
  }
};
