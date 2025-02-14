import { ComponentProps, FC } from 'react';
import { TouchableOpacity } from 'react-native';

type ButtonProps = ComponentProps<typeof TouchableOpacity> & {
  className?: string;
  children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ children, className, onPress, ...props }) => {
  return (
    <TouchableOpacity
      className={`w-full flex-row items-center justify-center rounded-lg p-2 ${className}`}
      onPress={onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export { Button };
