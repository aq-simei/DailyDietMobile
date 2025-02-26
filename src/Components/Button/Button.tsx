import { ComponentProps, FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentProps<typeof TouchableOpacity> & {
  className?: string;
  children?: React.ReactNode;
  title?: string;
};

const Button: FC<ButtonProps> = ({ children, className, onPress, title, ...props }) => {
  return (
    <TouchableOpacity
      className={twMerge(
        `flex w-full items-center justify-center rounded-lg p-2`,
        className
      )}
      onPress={onPress}
      {...props}>
      {title && <Text className="font-nunito-bold text-base-700">{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export { Button };
