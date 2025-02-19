import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from './Header';
import { useNavigation } from '@react-navigation/native';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('Header Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Header goBack={mockGoBack} />);
    const header = getByTestId('new-meal-header');
    const backButton = getByTestId('back-button');
    expect(header).toBeTruthy();
    expect(backButton).toBeTruthy();
  });
  it('calls goBack function when back button is pressed', () => {
    const { getByTestId, debug } = render(<Header goBack={mockGoBack} />);
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
