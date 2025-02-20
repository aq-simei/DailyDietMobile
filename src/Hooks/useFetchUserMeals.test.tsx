import { useQuery } from '@tanstack/react-query';
import { UseFetchUserMeals } from './useFetchUserMeals';
import { renderHook } from '@testing-library/react-native';
import { CombinedWrappers } from '@src/Utils/test.utils';
import { Meal } from '@src/@types/meal';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@src/Components/Toasts/Toasts', () => ({
  showSuccessToast: jest.fn(),
  showInfoToast: jest.fn(),
}));

const mealData: Meal[] = [
  {
    id: '1',
    name: 'Breakfast',
    description: 'Healthy breakfast',
    in_diet: true,
    user_id: 'user1',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    date: new Date('2023-01-01'),
    time: new Date('2023-01-01T08:00:00Z'),
  },
  // ...additional mock meals...
];

describe('UseFetchUserMeals Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockQueryResult = { data: mealData, isLoading: false, isError: false, isSuccess: true };

  it('should be defined', () => {
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => UseFetchUserMeals(), {
      wrapper: CombinedWrappers,
    });

    expect(result.current).toBeDefined();
  });

  it('should return the correct state management', () => {
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => UseFetchUserMeals(), {
      wrapper: CombinedWrappers,
    });
    expect(result.current.data).toEqual(mealData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return the correct data', () => {
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => UseFetchUserMeals(), {
      wrapper: CombinedWrappers,
    });
    expect(result.current.data).toEqual([
      {
        id: '1',
        name: 'Breakfast',
        description: 'Healthy breakfast',
        in_diet: true,
        user_id: 'user1',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        date: new Date('2023-01-01T00:00:00Z'),
        time: new Date('2023-01-01T08:00:00Z'),
      },
    ]);
  });
});
