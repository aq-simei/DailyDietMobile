import React from 'react';
import { NewMeal } from './index';
import { renderWWrappers, fireEvent, waitFor } from '@src/Utils/test.utils';
import { formatTime } from '@src/Utils/formatters/formatTime';
import { formatDate } from '@src/Utils/formatters/formatDate';
import { act } from '@testing-library/react-hooks';
import * as Toasts from '@src/Components/Toasts/Toasts';

jest.mock('@src/Components/Toasts/Toasts');

describe('NewMeal Screen', () => {
  describe('render', () => {
    it('should render the screen title', () => {
      const { getByText } = renderWWrappers(<NewMeal />);
      const screenTitle = getByText('New Meal');

      expect(screenTitle).toBeDefined();
    });

    it('should render a form section', () => {
      const { getByTestId } = renderWWrappers(<NewMeal />);
      const formSection = getByTestId('new-meal-form');
      expect(formSection).toBeDefined();
    });
  });

  it('should render the form correctly', () => {
    const now = new Date();
    const { getByPlaceholderText, getByText, debug, getByTestId, getByDisplayValue } =
      renderWWrappers(<NewMeal />);

    const mealNameInput = getByPlaceholderText('Enter meal name');
    const mealDescriptionInput = getByPlaceholderText('Enter meal description');
    const inDietMealPicker = getByTestId('in-diet-meal-picker');
    const dateValue = getByDisplayValue(formatDate(now));
    const timeValue = getByDisplayValue(formatTime(now));

    expect(mealNameInput).toBeTruthy();
    expect(mealDescriptionInput).toBeTruthy();
    expect(inDietMealPicker).toBeTruthy();
    expect(dateValue).toBeDefined();
    expect(timeValue).toBeDefined();
  });

  it('should show validation errors when form is submitted with empty fields', async () => {
    const { getByText, getByPlaceholderText, queryByText, debug } = renderWWrappers(<NewMeal />);
    const submitButton = getByText('Record new meal');
    const formNameErrorMessage = 'Error in form field name: Must provide a name';
    const formMealErrorMessage = 'Error in form field in diet: must specify the meal type';
    const errorCount = 2;
    await act(async () => {
      fireEvent.press(submitButton);
    });

    // Verify if the error toast was called
    expect(Toasts.showErrorToast).toHaveBeenCalledTimes(errorCount);
    expect(Toasts.showErrorToast).toHaveBeenCalledWith(formNameErrorMessage);
    expect(Toasts.showErrorToast).toHaveBeenCalledWith(formMealErrorMessage);

    // Print the current state of the rendered component tree
    debug();
  });

  it('should submit the form correctly when all fields are filled', async () => {
    const { getByText, getByPlaceholderText, queryByText } = renderWWrappers(<NewMeal />);
    const nameInput = getByPlaceholderText('Enter meal name');
    const descriptionInput = getByPlaceholderText('Enter meal description');
    const inDietMealPicker = getByText('Yes');
    const submitButton = getByText('Record new meal');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Test Meal');
      fireEvent.changeText(descriptionInput, 'Test Description');
      fireEvent.press(inDietMealPicker);
      fireEvent.press(submitButton);
    });

    expect(Toasts.showSuccessToast).toHaveBeenCalledTimes(1);
    expect(Toasts.showSuccessToast).toHaveBeenCalledWith('Meal created');
  });
});
