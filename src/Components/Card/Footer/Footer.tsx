import { FC } from 'react';
import { CardProps } from '../Card';
import { View } from 'react-native';

const CardFooter: FC<CardProps> = ({ children, className }) => {
  return <View className={`${className} p-2`}>{children}</View>;
};
export { CardFooter };
