import { LoginRequestDTO, loginRoute } from '../../types/dtos/Requests/LoginRequest';
import { LoginResponseDTO } from '../../types/dtos/Responses/LoginResponse';
import { axiosInstance } from '../axios';

export const login = async ({ email, password }: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const response = await axiosInstance.post<LoginResponseDTO>(loginRoute, {
    email,
    password,
  });
  return response.data;
};
