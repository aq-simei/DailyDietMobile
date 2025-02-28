import { LoginResponseDTO } from '@src/types/dtos/Responses/LoginResponse';
import { login } from '@src/api/Mutations/Login';
import { axiosInstance } from '@src/api/axios';
import { useMutation } from '@tanstack/react-query';

// Extend axios instance to include custom properties
declare module 'axios' {
  interface AxiosInstance {
    userId?: string;
  }
}

type UseLoginProps = {
  onSuccessCallback: (data: LoginResponseDTO) => void;
  onErrorCallback: () => void;
};

type LoginProps = {
  email: string;
  password: string;
};
type useLoginReturn = {
  login: (props: LoginProps) => void;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  token: string;
};

export const useLogin = ({ onSuccessCallback, onErrorCallback }: UseLoginProps): useLoginReturn => {
  const { data, mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => login({ email, password }),
    onSuccess: async (data) => {
      // Add bearer token to axios instance
      axiosInstance.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${data.token}`;
        return config;
      });

      // Store user ID directly in axios instance
      axiosInstance.userId = data.user_id;

      onSuccessCallback({
        refresh_token: data.refresh_token,
        token: data.token,
        user_id: data.user_id,
      });
    },
    onError: () => {
      onErrorCallback();
    },
  });

  return {
    login: mutateAsync,
    isLoading: isPending,
    error: isError,
    success: isSuccess,
    token: data?.refresh_token || '',
  };
};
