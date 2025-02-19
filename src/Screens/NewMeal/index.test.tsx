import React from 'react';
import { NewMeal } from './index';
import { renderWWrappers } from '@src/Utils/test.utils';

describe('NewMeal Screen', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderWWrappers(<NewMeal />);
    const newMealScreen = getByTestId('new-meal-screen');
    expect(newMealScreen).toBeTruthy();
  });
  it('renders the header correctly', () => {
    const { getByTestId } = renderWWrappers(<NewMeal />);
    const header = getByTestId('new-meal-header');
    const backButton = getByTestId('back-button');
    expect(header).toBeTruthy();
    expect(backButton).toBeTruthy();
  });
  it('renders the form correctly', () => {
    const { getByTestId } = renderWWrappers(<NewMeal />);
    const form = getByTestId('new-meal-form');
    expect(form).toBeTruthy();
  });
});
