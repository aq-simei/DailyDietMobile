import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface CustomTextInputProps extends TextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  labelText: string;
  className?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  labelText,
  className,
  ...props
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  return (
    <View className="mb-4 flex w-full">
      <Text className="mb-2">{labelText}</Text>
      <TextInput
        className={twMerge(
          'bg-white h-12 w-full rounded-md border-2 border-base-300 px-4',
          className
        )}
        value={value}
        onChangeText={onChangeText}
        onContentSizeChange={(e) => setContentHeight(e.nativeEvent.contentSize.height)}
        style={{ height: contentHeight }}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
