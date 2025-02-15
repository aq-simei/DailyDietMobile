import { LoginRequestDTO, loginRoute } from '../DTOs/Requests/LoginRequest';
import { LoginResponseDTO } from '../DTOs/Responses/LoginResponse';
import { axiosInstance } from '../axios';

export const login = async ({ email, password }: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const response = await axiosInstance.post<LoginResponseDTO>(loginRoute, {
    email,
    password,
  });
  return response.data;
};
