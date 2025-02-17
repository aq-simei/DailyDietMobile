import { LoginResponseDTO } from '@src/types/dtos/Responses/LoginResponse';
import { login } from '@src/api/Mutations/Login';
import { axiosInstance } from '@src/api/axios';
import { useMutation } from '@tanstack/react-query';

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
      onSuccessCallback({
        refresh_token: data.refresh_token,
        token: data.token,
      });
    },
    onError: () => {
      onErrorCallback();
    },
  });
  if (isSuccess && data !== undefined) {
    // put bearer token on the axios instance
    axiosInstance.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${data.token}`;
      return config;
    });
  }
  return {
    login: mutateAsync,
    isLoading: isPending,
    error: isError,
    success: isSuccess,
    token: data !== undefined ? data.refresh_token : '',
  };
};
