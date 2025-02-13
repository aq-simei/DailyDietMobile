import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList } from '@src/@types/navigation';
import React from 'react';

import AuthNavigation from './Auth';
import { Routes } from './Routes';

const Stack = createStackNavigator<AppStackParamList>();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="App" component={Routes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
