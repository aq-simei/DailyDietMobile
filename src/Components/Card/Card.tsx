import { FC } from 'react';
import { View } from 'react-native';
import { CardHeader } from './Header/';
import { CardBody } from './Content';
import { CardFooter } from './Footer/Footer';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: FC<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardBody;
  Footer: typeof CardFooter;
} = ({ children, className, onClick }) => {
  return (
    <View
      className={`${className} relative mt-8 h-20 w-full justify-center rounded-lg bg-green-200`}>
      {children}
    </View>
  );
};

Card.Header = CardHeader;
Card.Content = CardBody;
Card.Footer = CardFooter;
export { Card };
