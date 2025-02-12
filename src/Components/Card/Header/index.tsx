import { FC } from 'react';
import { View } from 'react-native';
import { CardProps } from '../Card';
import { HeaderRight } from './Right';

const CardHeader: FC<CardProps> & { Right: typeof HeaderRight } = ({ children, className }) => {
  return <View className={`${className} mr-2 mt-2`}>{children}</View>;
};
CardHeader.Right = HeaderRight;
export { CardHeader };
