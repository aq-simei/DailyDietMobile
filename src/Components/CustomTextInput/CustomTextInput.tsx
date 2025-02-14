import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  labelText: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  labelText,
  ...props
}) => {
  return (
    <View className="mb-4 flex w-full">
      <Text className="mb-2">{labelText}</Text>
      <TextInput
        className="bg-white h-12 w-full rounded-md border border-base-300 px-4"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
