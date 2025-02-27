import React from 'react';
import { Home } from './index';
import { UseFetchUserMeals, MealListItem } from '@src/Hooks/useFetchUserMeals';
import { renderWWrappers } from '@src/Utils/test.utils';
import { Meal } from '@src/@types/meal';

jest.mock('@shopify/flash-list', () => ({
  FlashList: ({ data, renderItem, estimatedItemSize }: any) => (
    <div>
      {data?.map((item: MealListItem) => (
        <div key={item.id} data-testid="flash-list-item">
          {renderItem({ item })}
        </div>
      ))}
    </div>
  ),
}));

// Mock the useFetchUserMeals hook
jest.mock('@src/Hooks/useFetchUserMeals');

// Mock the useRoute hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: { source: 'test', refetchData: false },
  }),
}));

// use impl from format time
jest.mock('@src/Utils/formatters/formatTime', () => ({
  formatTime: () => '12:00 AM',
}));

const UseMockedFetchUserMeals = UseFetchUserMeals as jest.Mock;

describe('Home Screen', () => {
  const mockDate = new Date('2021-12-30T12:00:00');
  const mockMeals: MealListItem[] = [
    {
      id: 'header-1',
      type: 'header',
      data: 'Dec 30, 2021',
    },
    {
      id: 'meal-1',
      type: 'meal',
      data: {
        id: '1',
        name: 'Oatmeal',
        description: 'Healthy breakfast',
        time: mockDate,
        date: mockDate,
        in_diet: true,
        created_at: mockDate.toISOString(),
        updated_at: mockDate.toISOString(),
        user_id: '1',
      } as Meal,
    },
  ];

  it('renders correctly', () => {
    UseMockedFetchUserMeals.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
      success: true,
      refetch: jest.fn(),
    });

    const { getByText } = renderWWrappers(<Home />);

    expect(getByText('75%')).toBeTruthy();
    expect(getByText('diet friendly meals')).toBeTruthy();
    expect(getByText('Add meal')).toBeTruthy();
  });
  it('displays meals correctly', () => {
    const mockMeals: MealListItem[] = [
      {
        id: 'header-1',
        type: 'header',
        data: 'Dec 30, 2021',
      },
      {
        id: 'meal-1',
        type: 'meal',
        data: {
          id: '2',
          user_id: '2',
          name: 'Oatmeal',
          description: 'Oatmeal with milk',
          time: new Date(),
          date: new Date(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          in_diet: true,
        } as Meal,
      },
      {
        id: 'meal-2',
        type: 'meal',
        data: {
          id: '2',
          user_id: '2',
          name: 'Lunch',
          description: 'Burger and fries',
          time: new Date(),
          date: new Date(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          in_diet: false,
        } as Meal,
      },
    ];

    UseMockedFetchUserMeals.mockReturnValue({
      data: mockMeals,
      isError: false,
      isLoading: false,
      success: true,
      refetch: jest.fn(),
    });

    const { getByText } = renderWWrappers(<Home />);
    expect(getByText('Dec 30, 2021')).toBeTruthy();
    expect(getByText('| Oatmeal')).toBeTruthy();
  });
});
