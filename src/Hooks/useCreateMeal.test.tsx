import { renderHook, act } from '@testing-library/react-hooks';
import { UseCreateMeal } from './useCreateMeal';
import { useMutation } from '@tanstack/react-query';
import { CombinedWrappers } from '@src/Utils/test.utils';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));

jest.mock('@src/Components/Toasts/Toasts', () => ({
  showSuccessToast: jest.fn(),
  showInfoToast: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('UseCreateMeal Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a meal successfully', async () => {
    // Mock successful mutation
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isSuccess: true,
      isError: false,
      isPending: false,
    });

    // Render hook with wrapper
    const { result } = renderHook(() => UseCreateMeal(), {
      wrapper: CombinedWrappers,
    });

    // Verify initial state
    expect(result.current).toBeDefined();
    expect(result.current.createMealSuccess).toBe(true);
    expect(result.current.createMealError).toBe(false);
    expect(result.current.createMealPending).toBe(false);

    // Create test meal data
    const mealData = {
      name: 'Test Meal',
      description: 'Test Description',
      in_diet: true,
      date: new Date(),
      time: new Date(),
    };

    // Call createMeal
    await act(async () => {
      await result.current.createMeal(mealData);
    });

    // Verify mutation was called with correct data
    expect(mockMutateAsync).toHaveBeenCalledWith(mealData);
    // Verify state after mutation
    expect(result.current.createMealSuccess).toBe(true);
    expect(result.current.createMealError).toBe(false);
    expect(result.current.createMealPending).toBe(false);
  });

  it('should handle errors correctly', async () => {
    // Mock failed mutation
    const mockMutateAsync = jest.fn().mockReturnValueOnce('Error');
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isSuccess: false,
      isError: true,
      isPending: false,
    });

    // Render hook with wrapper
    const { result } = renderHook(() => UseCreateMeal(), {
      wrapper: CombinedWrappers,
    });

    // Verify initial state
    expect(result.current).toBeDefined();
    expect(result.current.createMealSuccess).toBe(false);
    expect(result.current.createMealError).toBe(true);
    expect(result.current.createMealPending).toBe(false);

    // Create test meal data
    const mealData = {
      name: '',
      description: '',
      in_diet: true,
      date: new Date(),
      time: new Date(),
    };

    // Call createMeal
    await act(async () => {
      await result.current.createMeal(mealData);
    });

    // Verify mutation was called with correct data
    expect(mockMutateAsync).toHaveBeenCalledWith(mealData);
    // Verify state after mutation
    expect(result.current.createMealSuccess).toBe(false);
    expect(result.current.createMealError).toBe(true);
    expect(result.current.createMealPending).toBe(false);
  });
});
