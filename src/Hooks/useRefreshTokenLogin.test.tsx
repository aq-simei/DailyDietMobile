import { useMutation } from '@tanstack/react-query';
import { useRefreshTokenLogin } from './useRefreshTokenLogin';
import { renderHook } from '@testing-library/react-native';
import { CombinedWrappers } from '@src/Utils/test.utils';
import { RefreshTokenLoginDTO } from '@src/types/dtos/Requests/RefreshTokenLoginRequest';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));

const refreshTokenResponse = {
  jwt_token: 'test_jwt_token',
  refresh_token: 'test_refresh_token',
};

describe('useRefreshTokenLogin Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMutationResult = {
    data: refreshTokenResponse,
    isPending: false,
    isError: false,
    isSuccess: true,
  };

  it('should be defined', () => {
    (useMutation as jest.Mock).mockReturnValue(mockMutationResult);

    const { result } = renderHook(
      () => useRefreshTokenLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );

    expect(result.current).toBeDefined();
  });

  it('should return the correct state management', () => {
    (useMutation as jest.Mock).mockReturnValue(mockMutationResult);

    const { result } = renderHook(
      () => useRefreshTokenLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );
    expect(result.current.refreshToken).toEqual(refreshTokenResponse.refresh_token);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should return the correct data', () => {
    (useMutation as jest.Mock).mockReturnValue(mockMutationResult);

    const { result } = renderHook(
      () => useRefreshTokenLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );
    expect(result.current.refreshToken).toEqual('test_refresh_token');
  });
});
