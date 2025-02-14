import Logo from '@assets/Logo.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@src/@types/navigation';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';
import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const handleNavigateSignIn = () => {
    navigation.goBack();
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <SafeScreenContent>
      <StatusBar style="auto" />
      <View className="flex-1 items-center justify-center p-5">
        <View className="mb-10 items-center">
          <Logo width={80} height={40} />
          <Text className="mt-2 text-2xl font-bold">Create your account</Text>
        </View>
        <CustomTextInput
          labelText="Email"
          placeholder="joe@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInput
          labelText="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomTextInput
          labelText="Confirm password"
          placeholder="Confirm picked password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <CustomTextInput
          labelText="Name"
          placeholder="Joe Smith"
          value={name}
          onChangeText={setName}
        />
        <View className="flex w-full flex-row items-center justify-center">
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={handleNavigateSignIn}>
            <Text className="text-primary font-nunito-bold underline">Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mt-5 flex h-auto w-full items-center justify-center rounded-xl bg-base-200 p-2">
          <Text className="text-center font-nunito-bold text-md text-base-700">Create account</Text>
        </TouchableOpacity>
      </View>
    </SafeScreenContent>
  );
};

export { SignUp };
