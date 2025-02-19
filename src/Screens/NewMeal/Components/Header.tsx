import { Colors } from '@src/Constants/Colors';
import { ArrowDown, ArrowLeft } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  goBack: () => void;
};

export const Header = ({ goBack }: HeaderProps) => {
  return (
    <View className="mx-6 mt-6 flex w-fit flex-row" testID="new-meal-header">
      <TouchableOpacity
        onPress={goBack}
        className="h-12 items-center justify-center rounded-full"
        testID="back-button">
        <ArrowDown color={Colors.base[50]} strokeWidth={4} height={18} width={18} />
      </TouchableOpacity>
      <View className="mx-auto flex w-auto items-center">
        <Text className="mr-6 font-nunito-bold text-lg">New Meal</Text>
      </View>
    </View>
  );
};
