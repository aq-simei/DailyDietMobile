import { SafeAreaView } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

export const SafeScreenContent = ({
  children,
  className,
  hasHeader,
}: {
  children: React.ReactNode;
  className?: string;
  hasHeader?: boolean;
}) => {
  return (
    <SafeAreaView
      className={twMerge(
        'bg-transparent mx-6 flex w-auto flex-1',
        hasHeader ? 'mt-16' : '',
        className
      )}>
      {children}
    </SafeAreaView>
  );
};
