import { RefreshTokenLoginDTO } from '@src/types/dtos/Requests/RefreshTokenLoginRequest';
import { axiosInstance } from '@src/api/axios';
import { refreshTokenLogin } from '@src/api/Mutations/RefreshTokenLogin';
import { useMutation } from '@tanstack/react-query';
import * as SecureStorage from 'expo-secure-store';
type UseRefreshTokenLoginProps = {
  onSuccessCallback: () => void;
  onErrorCallback: () => void;
};

type useRefreshTokenLoginReturn = {
  login: (props: RefreshTokenLoginDTO) => void;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  refreshToken: string;
};

export const useRefreshTokenLogin = ({
  onSuccessCallback,
  onErrorCallback,
}: UseRefreshTokenLoginProps): useRefreshTokenLoginReturn => {
  const { data, mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ refresh_token }: RefreshTokenLoginDTO) => refreshTokenLogin({ refresh_token }),
    onSuccess: (data) => {
      onSuccessCallback();
      SecureStorage.setItem('DAILY_DIET_REFRESH_TOKEN', data.refresh_token);
      if (data !== undefined) {
        // put bearer token on the axios instance
        axiosInstance.interceptors.request.use((config) => {
          config.headers['Authorization'] = `Bearer ${data.jwt_token}`;
          return config;
        });
        // Store user ID directly in axios instance
        axiosInstance.userId = data.user_id;
      }
    },
    onError: (e) => {
      onErrorCallback();
    },
  });

  return {
    login: mutateAsync,
    isLoading: isPending,
    error: isError,
    success: isSuccess,
    refreshToken: data !== undefined ? data.refresh_token : '',
  };
};
