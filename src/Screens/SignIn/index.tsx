import Logo from '@assets/Logo.svg';
import { SafeScreenContent } from '@components/SafeScreenContent/SafeScreenContent';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppStackParamList, AuthStackParamList } from '@src/@types/navigation';
import { Button } from '@src/Components/Button/Button';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';
import { showErrorToast, showInfoToast, showSuccessToast } from '@src/Components/Toasts/Toasts';
import { Colors } from '@src/Constants/Colors';
import { useLogin } from '@src/Hooks/useLogin';
import { useRefreshTokenLogin } from '@src/Hooks/useRefreshTokenLogin';
import { LoginResponseDTO } from '@src/api/DTOs/Responses/LoginResponse';
import { refreshTokenLogin } from '@src/api/Mutations/RefreshTokenLogin';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStorage from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { LucideSquareCheckBig, Square } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { toast } from 'sonner-native';

const SignIn = () => {
  const [keepSignIn, setKeepSignIn] = useState(false);
  const savedCredentialsRef = React.useRef(false);
  const appNav = useNavigation<NavigationProp<AppStackParamList>>();

  const {
    login: refreshTokenLogin,
    success: refreshTokenSuccess,
    error: refreshTokenError,
  } = useRefreshTokenLogin({
    onErrorCallback: () => {
      showErrorToast('Login Failed');
      console.log(refreshTokenError);
    },
    onSuccessCallback: () => {
      showSuccessToast('Login executed with saved credentials');
      appNav.navigate('App');
    },
  });
  const { login, isLoading } = useLogin({
    onSuccessCallback: (data: LoginResponseDTO) => {
      showSuccessToast('Login Success');
      SecureStorage.setItemAsync('DAILY_DIET_REFRESH_TOKEN', data.refresh_token);
      appNav.navigate('App');
    },
    onErrorCallback: () => showErrorToast('Login Failed'),
  });
  const emailRefInput = React.useRef('');
  const passwordRefInput = React.useRef('');
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const handleNavigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleRefreshTokenLogin = async () => {
    if (savedCredentialsRef.current) return;
    showInfoToast('Looking for saved credentials');
    const refreshToken = await SecureStorage.getItemAsync('DAILY_DIET_REFRESH_TOKEN');
    if (refreshToken) {
      refreshTokenLogin({ refresh_token: refreshToken });
      savedCredentialsRef.current = true;
    }
    if (refreshTokenSuccess) {
      appNav.navigate('App');
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to login',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use your password',
        requireConfirmation: false,
      });
      if (authResult.success) {
        setKeepSignIn(!keepSignIn);
        showSuccessToast('Biometric authentication success');
      }
    } catch (error) {
      showErrorToast(error as string);
    }
  };

  const handleLogin = useCallback(() => {
    // Do something with email and password
    login({ email: emailRefInput.current, password: passwordRefInput.current });
  }, []);

  useEffect(() => {
    handleRefreshTokenLogin();
  }, []);

  return (
    <SafeScreenContent>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <View className="flex-1 items-center justify-center p-5">
        <View className="mb-10 items-center">
          <Logo width={80} height={40} />
          <Text className="mt-2 font-nunito-bold text-2xl">Welcome back!</Text>
        </View>
        <Text className="mb-5 text-center font-nunito text-lg"> Sign in to continue</Text>
        <CustomTextInput
          labelText="Email"
          placeholder="Email"
          onChangeText={(t) => {
            emailRefInput.current = t;
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInput
          labelText="Password"
          placeholder="Password"
          onChangeText={(t) => {
            passwordRefInput.current = t;
          }}
          secureTextEntry
        />
        <View className="flex flex-row">
          <Text className="font-nunito">Don't have an account? </Text>
          <TouchableOpacity onPress={handleNavigateSignUp}>
            <Text className="text-primary font-nunito-bold underline">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-1 h-auto w-full flex-row items-center justify-center gap-2">
          <TouchableOpacity
            onPress={async () => {
              await handleBiometricLogin();
            }}>
            {keepSignIn ? (
              <LucideSquareCheckBig size={16} stroke={Colors.base['50']} />
            ) : (
              <Square size={16} stroke={Colors.base['50']} />
            )}
          </TouchableOpacity>
          <Text className="text-primary font-nunito-semibold text-md">Keep me signed in</Text>
        </View>
        <Button
          className="mt-5 flex h-auto w-full items-center justify-center rounded-xl bg-base-200"
          onPress={handleLogin}>
          <Text className="text-center font-nunito-bold text-md text-base-700">
            {isLoading ? 'Aguarde' : 'Login'}
          </Text>
        </Button>
      </View>
    </SafeScreenContent>
  );
};

export { SignIn };
