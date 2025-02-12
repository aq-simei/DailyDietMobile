import { FC } from 'react';
import { View } from 'react-native';
import { CardProps } from '../Card';

const HeaderRight: FC<CardProps> = ({ children, className }) => {
  return <View className={`absolute right-0 top-0 ${className}`}>{children}</View>;
};

export { HeaderRight };
