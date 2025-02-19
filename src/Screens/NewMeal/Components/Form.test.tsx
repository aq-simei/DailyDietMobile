import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Form from './Form';
import { UseCreateMeal } from '@src/Hooks/useCreateMeal';
import { showErrorToast, showInfoToast } from '@src/Components/Toasts/Toasts';
import { formatDate } from '@src/Utils/formatters/formatDate';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

jest.mock('@src/Hooks/useCreateMeal');
jest.mock('@src/Components/Toasts/Toasts');

const mockCreateMeal = jest.fn();
const mockShowErrorToast = jest.fn();
const mockShowInfoToast = jest.fn();

(UseCreateMeal as jest.Mock).mockReturnValue({
  createMeal: mockCreateMeal,
  createMealError: null,
  createMealPending: false,
  createMealSuccess: false,
});

(showErrorToast as jest.Mock).mockImplementation(mockShowErrorToast);
(showInfoToast as jest.Mock).mockImplementation(mockShowInfoToast);

jest.mock('@react-native-community/datetimepicker', () => {
  return {
    __esModule: true,
    DateTimePickerAndroid: {
      open: jest.fn(),
    },
  };
});

describe('Form Component', () => {
  describe('Form Fields', () => {
    it('renders correctly', () => {
      const { getByTestId } = render(<Form />);
      expect(getByTestId('new-meal-form')).toBeTruthy();
    });

    it('shows date picker when date input is pressed', () => {
      const { getByText } = render(<Form />);
      const dateInput = getByText('Date');
      fireEvent.press(dateInput);
      expect(DateTimePickerAndroid.open).toHaveBeenCalledWith(
        expect.objectContaining({ mode: 'date' })
      );
    });

    it('shows time picker when time input is pressed', () => {
      const { getByText } = render(<Form />);
      const timeInput = getByText('Time');
      fireEvent.press(timeInput);
      expect(DateTimePickerAndroid.open).toHaveBeenCalledWith(
        expect.objectContaining({ mode: 'time' })
      );
    });
  });

  describe('Form Submission', () => {
    it('submits the form with valid data', async () => {
      const { getByPlaceholderText, getByText } = render(<Form />);
      fireEvent.changeText(getByPlaceholderText('Enter meal name'), 'Test Meal');
      fireEvent.changeText(getByPlaceholderText('Enter meal description'), 'Test Description');
      fireEvent.press(getByText('Yes'));
      fireEvent.press(getByText('Record new meal'));

      await waitFor(() => {
        expect(mockCreateMeal).toHaveBeenCalledWith({
          description: 'Test Description',
          in_diet: true,
          name: 'Test Meal',
          date: expect.any(Date),
          time: expect.any(Date),
        });
      });
    });

    it('shows error toast on form submission error', async () => {
      (UseCreateMeal as jest.Mock).mockReturnValueOnce({
        createMeal: mockCreateMeal,
        createMealError: { name: { message: 'Name is required' } },
        createMealPending: false,
        createMealSuccess: false,
      });
      const { getByText } = render(<Form />);
      fireEvent.press(getByText('Record new meal'));

      await waitFor(() => {
        // check toasts
        expect(mockShowErrorToast).toHaveBeenCalledTimes(2);
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Error in form field name: Must provide a name'
        );
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Error in form field in diet: must specify the meal type'
        );
      });
    });

    it('shows validation errors when form is submitted with empty fields', async () => {
      (UseCreateMeal as jest.Mock).mockReturnValueOnce({
        createMeal: mockCreateMeal,
        createMealError: { name: { message: 'Name is required' } },
        createMealPending: false,
        createMealSuccess: false,
      });
      const { getByText } = render(<Form />);

      fireEvent.press(getByText('Record new meal'));

      await waitFor(() => {
        expect(getByText('Must provide a name')).toBeTruthy();
        expect(getByText('must specify the meal type')).toBeTruthy();
      });
    });
  });
});
