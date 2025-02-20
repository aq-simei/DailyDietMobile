import { useMutation } from '@tanstack/react-query';
import { useLogin } from './useLogin';
import { renderHook } from '@testing-library/react-native';
import { CombinedWrappers } from '@src/Utils/test.utils';
import { LoginResponseDTO } from '@src/types/dtos/Responses/LoginResponse';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));

jest.mock('@src/Components/Toasts/Toasts', () => ({
  showSuccessToast: jest.fn(),
  showInfoToast: jest.fn(),
}));

const loginResponse: LoginResponseDTO = {
  token: 'test_token',
  refresh_token: 'test_refresh_token',
};

describe('useLogin Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMutationResult = {
    mutateAsync: jest.fn(),
    data: loginResponse,
    isError: false,
    isPending: false,
    isSuccess: true,
  };

  it('should be defined', () => {
    (useMutation as jest.Mock).mockReturnValue(mockMutationResult);

    const { result } = renderHook(
      () => useLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('token');
    expect(result.current).toHaveProperty('isLoading');
  });

  it('should return the correct state management', () => {
    (useMutation as jest.Mock).mockReturnValue(mockMutationResult);

    const { result } = renderHook(
      () => useLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );

    // isLoading comes from isPending
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.success).toBe(true);
  });

  it('should return the correct data from login', () => {
    (useMutation as jest.Mock).mockReturnValue(mockMutationResult);

    const { result } = renderHook(
      () => useLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );
    expect(result.current.token).toEqual(loginResponse.refresh_token);
  });

  it('should return blank token if data is undefined', () => {
    (useMutation as jest.Mock).mockReturnValue({
      ...mockMutationResult,
      data: undefined,
      isSuccess: false,
      isError: true,
      isPending: false,
    });

    const { result } = renderHook(
      () => useLogin({ onSuccessCallback: jest.fn(), onErrorCallback: jest.fn() }),
      {
        wrapper: CombinedWrappers,
      }
    );
    expect(result.current.token).toEqual('');
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });
});
