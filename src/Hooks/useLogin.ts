import { login } from '@src/api/Mutations/Login';
import { axiosInstance } from '@src/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

type UseLoginProps = {
  email: string;
  password: string;
};
type useLoginReturn = {
  login: (props: UseLoginProps) => void;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  token: string;
};

export const useLogin = (): useLoginReturn => {
  const { data, mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ email, password }: UseLoginProps) => login({ email, password }),
    onSuccess: async (data) => {
      console.log(data);
    },
  });

  // Add error interceptor to handle 401 (Unauthorized)
  // useEffect(() => {
  //   const interceptor = axiosInstance.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       if (error.response?.status === 401) {
  //         // Token expired or invalid
  //         await AsyncStorage.removeItem('@auth_token');
  //         // Here you could trigger a logout or refresh token flow
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     // Cleanup interceptor
  //     axiosInstance.interceptors.response.eject(interceptor);
  //   };
  // }, []);

  if (isPending) {
    console.log('Loading...');
  }
  if (isSuccess && data !== undefined) {
    // put bearer token on the axios instance
    axiosInstance.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${data.token}`;
      return config;
    });
  }
  useEffect(() => {
    console.log('onUse login');
    console.log(axiosInstance.defaults.headers['Authorization']);
  }, [data]);
  return {
    login: mutateAsync,
    isLoading: isPending,
    error: isError,
    success: isSuccess,
    token: data !== undefined ? data.token : '',
  };
};
