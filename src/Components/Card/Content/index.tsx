import { View } from 'react-native';
import { CardProps } from '../Card';
import { FC } from 'react';

const CardBody: FC<CardProps> = ({ children, className }) => {
  return <View className={`${className} mb-4 mt-4 items-center`}>{children}</View>;
};

export { CardBody };
