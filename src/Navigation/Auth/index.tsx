import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '@src/@types/navigation';
import { SignIn } from '@src/Screens/SignIn';
import { SignUp } from '@src/Screens/SignUp';
import React from 'react';

const Stack = createStackNavigator<AuthStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        cardStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Navigation;
