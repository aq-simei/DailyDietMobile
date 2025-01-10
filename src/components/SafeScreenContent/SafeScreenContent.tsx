import { SafeAreaView } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

export const SafeScreenContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <SafeAreaView className={twMerge('mx-4 flex w-auto flex-1 bg-brick-red-200', className)}>
      {children}
    </SafeAreaView>
  );
};
