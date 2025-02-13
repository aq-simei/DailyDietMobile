import Logo from '@assets/Logo.svg';
import { SafeScreenContent } from '@components/SafeScreenContent/SafeScreenContent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@src/@types/navigation';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  // const handleSignIn = () => {
  //   navigation.navigate('App');
  // };

  return (
    <SafeScreenContent>
      <StatusBar style="auto" />
      <View className="flex-1 items-center justify-center p-5">
        <View className="mb-10 items-center">
          <Logo width={80} height={40} />
          <Text className="mt-2 text-2xl font-bold">Welcome back!</Text>
        </View>
        <Text className="mb-5 text-center text-lg"> Sign in to continue</Text>
        <TextInput
          className="mb-4 h-12 w-full rounded-md border border-gray-300 bg-white px-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="mb-4 h-12 w-full rounded-md border border-gray-300 bg-white px-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity className="bg-primary mb-4 h-12 w-full items-center justify-center rounded-md">
          <Text className="text-lg font-bold text-white">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity /* onPress={() => navigation.navigate('ForgotPassword')} */>
          <Text className="text-primary underline">Forgot Password?</Text>
        </TouchableOpacity>
        <View className="mt-5 flex-row">
          <Text>Don't have an account? </Text>
          <TouchableOpacity /* onPress={() => navigation.navigate('SignUp')} */>
            <Text className="text-primary underline">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreenContent>
  );
};

export { SignIn };
