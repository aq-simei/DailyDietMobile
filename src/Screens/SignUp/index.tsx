import React, { useState } from 'react';
import { SafeScreenContent } from '@components/SafeScreenContent/SafeScreenContent';
import { Button } from '@src/Components/Button/Button';
import { useLogin } from '@src/Hooks/useLogin';
import { TextInput, View, Text } from 'react-native';

const SignUp = () => {
  const { register } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    register(email, password);
  };

  return (
    <SafeScreenContent>
      <View className="flex-1 justify-center p-4">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <Button onPress={handleSignUp}>
          <Text className="font-nunito-bold text-lg">Sign Up</Text>
        </Button>
      </View>
    </SafeScreenContent>
  );
};

export { SignUp };
