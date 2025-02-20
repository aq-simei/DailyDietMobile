import { renderHook } from '@testing-library/react-hooks';
import { useQuery } from '@tanstack/react-query';
import { UseFetchMeal } from './useFetchMeal';
import { CombinedWrappers } from '@src/Utils/test.utils';
import { Meal } from '@src/@types/meal';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const mealData: Meal = {
  id: '1',
  name: 'Breakfast',
  description: 'Healthy breakfast',
  in_diet: true,
  user_id: 'user1',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  date: new Date('2023-01-01'),
  time: new Date('2023-01-01T08:00:00Z'),
};

describe('UseFetchMeal Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockQueryResult = { data: mealData, isLoading: false, isError: false, isSuccess: true };

  it('should be defined', () => {
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => UseFetchMeal({ mealId: '1' }), {
      wrapper: CombinedWrappers,
    });

    expect(result.current).toBeDefined();
  });

  it('should return the correct state management', () => {
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => UseFetchMeal({ mealId: '1' }), {
      wrapper: CombinedWrappers,
    });
    expect(result.current.data).toEqual(mealData);
    expect(result.current.fetchMealLoading).toBe(false);
    expect(result.current.fetchMealIsError).toBe(false);
  });

  it('should return the correct data', () => {
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => UseFetchMeal({ mealId: '1' }), {
      wrapper: CombinedWrappers,
    });
    expect(result.current.data).toEqual(mealData);
  });
});
