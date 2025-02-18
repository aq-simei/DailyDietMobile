import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from './CustomTextInput';

describe('CustomTextInput Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput labelText="Test Label" placeholder="Test Placeholder" />
    );

    expect(getByPlaceholderText('Test Placeholder')).toBeTruthy();
  });

  it('should display error message', () => {
    const { getByText } = render(
      <CustomTextInput labelText="Test Label" placeholder="Test Placeholder" errorMessage="Error" />
    );

    expect(getByText('Error')).toBeTruthy();
  });

  it('should call onChangeText when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomTextInput
        labelText="Test Label"
        placeholder="Test Placeholder"
        onChangeText={onChangeTextMock}
      />
    );
    const textInput = getByPlaceholderText('Test Placeholder');
    fireEvent.changeText(textInput, 'New Text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New Text');
  });
});
