import { RefreshTokenLoginDTO } from '../DTOs/Requests/RefreshTokenLoginRequest';
import { RefreshTokenLoginResponseDTO } from '../DTOs/Responses/RefreshTokenLoginResponse';
import { axiosInstance } from '../axios';

export const refreshTokenLogin = async ({
  refresh_token,
}: RefreshTokenLoginDTO): Promise<RefreshTokenLoginResponseDTO> => {
  const response = await axiosInstance.post<RefreshTokenLoginResponseDTO>('/auth/login/token', {
    refresh_token: refresh_token,
  });
  return {
    userId: response.data.userId,
    jwt_token: response.data.jwt_token,
    refresh_token: response.data.refresh_token,
    user_email: response.data.user_email,
  };
};
