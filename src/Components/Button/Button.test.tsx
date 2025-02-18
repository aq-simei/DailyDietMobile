import React from 'react';
import { Button } from './Button';
import { fireEvent, renderWWrappers } from '@src/Utils/test.utils';
import { Text } from 'react-native';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = renderWWrappers(
      <Button>
        <Text>Click Me</Text>
      </Button>
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWWrappers(
      <Button onPress={onPressMock}>
        <Text>Click Me</Text>
      </Button>
    );
    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders the children', () => {
    const { getByTestId, getByText } = renderWWrappers(
      <Button>
        <Text testID="children-button">Click Me</Text>
      </Button>
    );
    expect(getByTestId('children-button')).toBeTruthy();
    expect(getByText('Click Me')).toBeTruthy();
  });
});
