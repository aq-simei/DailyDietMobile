import { Colors } from '@src/Constants/Colors';
import { AlertCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface CustomTextInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  labelText: string;
  errorMessage?: string;
  className?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  labelText,
  className,
  errorMessage,
  ...props
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  return (
    <View className="mb-4 flex w-full">
      <Text className="mb-2 font-nunito-bold">{labelText}</Text>
      <TextInput
        className={twMerge(
          'bg-white h-12 w-full rounded-md border-2 border-base-300 px-4',
          'text-md placeholder:font-nunito-bold',
          className
        )}
        value={value}
        onChangeText={onChangeText}
        onContentSizeChange={(e) => setContentHeight(e.nativeEvent.contentSize.height)}
        style={{ height: contentHeight }}
        {...props}
      />
      {errorMessage && (
        <View className="mt-1 flex-row items-center gap-2">
          <AlertCircle width={16} height={16} stroke={Colors['brick-red']['500']} strokeWidth={2} />
          <Text className="font-nunito-bold text-brick-red-500">{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomTextInput;
