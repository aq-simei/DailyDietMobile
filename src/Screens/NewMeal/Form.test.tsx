import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { showErrorToast, showInfoToast } from '@src/Components/Toasts/Toasts';
import Form from './Form';
import { UseCreateMeal } from '@src/Hooks/useCreateMeal';

// Mock dependencies
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  Controller: ({ render }: any) =>
    render({ field: { onChange: jest.fn(), onBlur: jest.fn(), value: '' } }),
}));
jest.mock('@react-native-community/datetimepicker', () => ({
  DateTimePickerAndroid: {
    open: jest.fn(),
  },
}));
jest.mock('@src/Components/Toasts/Toasts', () => ({
  showErrorToast: jest.fn(),
  showInfoToast: jest.fn(),
}));
jest.mock('@src/Hooks/useCreateMeal', () => ({
  UseCreateMeal: jest.fn(),
}));
jest.mock('@src/Utils/formatters/formatDate.ts', () => ({
  formatDate: jest.fn(() => 'formatted-date'),
}));
jest.mock('@src/Utils/formatters/formatTime.ts', () => ({
  formatTime: jest.fn(() => 'formatted-time'),
}));

describe('Form', () => {
  const mockCreateMeal = jest.fn();
  const mockSetValue = jest.fn();

  beforeEach(() => {
    (UseCreateMeal as jest.Mock).mockReturnValue({
      createMeal: mockCreateMeal,
      createMealError: null,
      createMealPending: false,
      createMealSuccess: false,
    });
    (useForm as jest.Mock).mockReturnValue({
      control: {
        defaultValues: {
          name: '',
          description: '',
          inDiet: null,
        },
      },
      handleSubmit: (fn: any) => fn,
      setValue: mockSetValue,
      formState: { errors: {} },
    });
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Form />);
    expect(getByTestId('new-meal-form')).toBeTruthy();
  });

  it('submits the form with correct data', async () => {
    const { getByText, getByPlaceholderText } = render(<Form />);
    const submitButton = getByText('Record new meal');
    const nameInput = getByPlaceholderText('Enter meal name');
    const descriptionInput = getByPlaceholderText('Enter meal description');
    const inDietYesButton = getByText('Yes');


    fireEvent.changeText(nameInput, 'Test Name');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.press(inDietYesButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockCreateMeal).toHaveBeenCalledWith({
        description: 'Test Description',
        in_diet: true,
        name: 'Test Name',
        date: expect.any(Date),
        time: expect.any(Date),
      });
    });
  });

  it('shows date picker when date input is pressed', () => {
    const { getByDisplayValue } = render(<Form />);
    fireEvent.press(getByDisplayValue('formatted-date'));
    expect(DateTimePickerAndroid.open).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'date' })
    );
  });

  it('shows time picker when time input is pressed', () => {
    const { getByDisplayValue } = render(<Form />);
    fireEvent.press(getByDisplayValue('formatted-time'));
    expect(DateTimePickerAndroid.open).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'time' })
    );
  });

  it('shows error toast on form error', async () => {
    (useForm as jest.Mock).mockReturnValueOnce({
      control: {},
      handleSubmit: (onSubmit: any, onError: any) => () =>
        onError({ name: { message: 'Name error' } }),
      setValue: mockSetValue,
      formState: { errors: {} },
    });
    const { getByText } = render(<Form />);
    fireEvent.press(getByText('Record new meal'));
    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith('Error in form field name: Name error');
    });
  });
});
