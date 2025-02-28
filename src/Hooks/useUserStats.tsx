import { axiosInstance } from '@src/api/axios';
import { fetchUserStats, UserStatsResponse } from '@src/api/Queries/FetchUserStats';
import { useQuery } from '@tanstack/react-query';

export const useUserStats = () => {
  // retrieve userId from axios instance (jwt userId token)
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => fetchUserStats(),
  });
  return {
    userStats: data || ({} as UserStatsResponse),
    userStatsSuccess: isSuccess,
    userStatsError: isError,
  };
};
