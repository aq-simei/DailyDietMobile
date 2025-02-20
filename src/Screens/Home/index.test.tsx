import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './index';
import { UseFetchUserMeals } from '@src/Hooks/useFetchUserMeals';
import { renderWWrappers } from '@src/Utils/test.utils';
import { date } from 'zod';

// Mock the useFetchUserMeals hook
jest.mock('@src/Hooks/useFetchUserMeals');
// use impl from format time
jest.mock('@src/Utils/formatters/formatTime', () => ({
  formatTime: () => '12:00 AM',
}));
const UseMockedFetchUserMeals = UseFetchUserMeals as jest.Mock;
describe('Home Screen', () => {
  it('renders correctly', () => {
    UseMockedFetchUserMeals.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
      success: true,
    });

    const { getByText } = renderWWrappers(<Home />);

    expect(getByText('75%')).toBeTruthy();
    expect(getByText('diet friendly meals')).toBeTruthy();
    expect(getByText('Meals')).toBeTruthy();
    expect(getByText('Add meal')).toBeTruthy();
  });

  it('displays meals correctly', () => {
    UseMockedFetchUserMeals.mockReturnValue({
      data: [
        {
          // this is the time
          title: 'Dec 30, 2021',
          data: [
            { id: 1, name: 'Oatmeal', time: new Date(), date: new Date(), in_diet: true },
            { id: 2, name: 'Eggs', time: new Date(), date: new Date(), in_diet: false },
          ],
        },
      ],
      isError: false,
      isLoading: false,
      success: true,
    });

    const { getByText, debug } = renderWWrappers(<Home />);
    expect(getByText('Dec 30, 2021')).toBeTruthy();
    expect(getByText('| Oatmeal')).toBeTruthy();
    expect(getByText('| Eggs')).toBeTruthy();
  });
});
