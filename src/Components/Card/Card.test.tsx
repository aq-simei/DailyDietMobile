import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from './Card';
import { renderWWrappers } from '@src/Utils/test.utils';
import { Text } from 'react-native';

describe('Card Component', () => {
  it('renders correctly with children', () => {
    const { getByText } = renderWWrappers(
      <Card>
        <Card.Header>
          <Text>Header</Text>
        </Card.Header>
        <Card.Content>
          <Text>Content</Text>
        </Card.Content>
        <Card.Footer>
          <Text>Footer</Text>
        </Card.Footer>
      </Card>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  it('applies className prop', () => {
    const { getByTestId } = render(
      <Card className="test-class">
        <Card.Content>Content</Card.Content>
      </Card>
    );

    const cardElement = getByTestId('card-element');
    expect(cardElement.props.className).toContain('test-class');
  });
});
