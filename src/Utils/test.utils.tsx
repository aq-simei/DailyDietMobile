import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type WrapperProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const QueryClientWrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const NavigationContainerWrapper = ({ children }: WrapperProps) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const SafeAreaProviderWrapper = ({ children }: WrapperProps) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
);

const ToasterWrapper = ({ children }: WrapperProps) => (
  <>
    <Toaster />
    {children}
  </>
);

const CombinedWrappers = ({ children }: WrapperProps) => (
    <NavigationContainerWrapper>
      <SafeAreaProviderWrapper>
        <Toaster />
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </SafeAreaProviderWrapper>
    </NavigationContainerWrapper>
);

const renderCombinedWrapper = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: CombinedWrappers, ...options });

export * from '@testing-library/react-native';
export {
  renderCombinedWrapper as renderWWrappers,
  QueryClientWrapper,
  NavigationContainerWrapper,
  SafeAreaProviderWrapper,
  ToasterWrapper,
  CombinedWrappers,
};
