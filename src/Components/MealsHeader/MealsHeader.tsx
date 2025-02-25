import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@src/Constants/Colors';

const MealsHeader = () => {
  return (
    <View className="flex-row items-center justify-center my-4">
      <View className="flex-1 h-[2px] bg-base-300" />
      <Text className="mx-4 font-nunito-bold text-lg text-center">Your Meals</Text>
      <View className="flex-1 h-[2px] bg-base-300" />
    </View>
  );
};

export { MealsHeader };
