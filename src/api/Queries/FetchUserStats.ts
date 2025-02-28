import { axiosInstance } from '../axios';

export type UserStatsResponse = {
  id: string;
  userId: string;
  registeredMeals: number;
  inDietMeals: number;
  currentStreak: number;
  maxStreak: number;
};

export const fetchUserStats = async (): Promise<UserStatsResponse> => {
  try {
    const response = await axiosInstance.get<UserStatsResponse>(`/userstats/find/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
