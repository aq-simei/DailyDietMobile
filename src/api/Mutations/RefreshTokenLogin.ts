import { RefreshTokenLoginDTO } from '../../types/dtos/Requests/RefreshTokenLoginRequest';
import { RefreshTokenLoginResponseDTO } from '../../types/dtos/Responses/RefreshTokenLoginResponse';
import { axiosInstance } from '../axios';

export const refreshTokenLogin = async ({
  refresh_token,
}: RefreshTokenLoginDTO): Promise<RefreshTokenLoginResponseDTO> => {
  const response = await axiosInstance.post<RefreshTokenLoginResponseDTO>('/auth/login/token', {
    refresh_token: refresh_token,
  });
  return {
    user_id: response.data.user_id,
    jwt_token: response.data.jwt_token,
    refresh_token: response.data.refresh_token,
    user_email: response.data.user_email,
  };
};
