import { RefreshTokenLoginDTO } from '@src/api/DTOs/Requests/RefreshTokenLoginRequest';
import { axiosInstance } from '@src/api/axios';
import { refreshTokenLogin } from '@src/api/Mutations/RefreshTokenLogin';
import { useMutation } from '@tanstack/react-query';

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
    onSuccess: async () => {
      onSuccessCallback();
    },
    onError: (e) => {
      onErrorCallback();
      console.log(e);
    },
  });
  if (isSuccess && data !== undefined) {
    // put bearer token on the axios instance
    axiosInstance.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${data.jwt_token}`;
      return config;
    });
  }
  return {
    login: mutateAsync,
    isLoading: isPending,
    error: isError,
    success: isSuccess,
    refreshToken: data !== undefined ? data.refresh_token : '',
  };
};
