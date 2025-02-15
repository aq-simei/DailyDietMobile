import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { ArrowLeft, CircleAlert, CircleCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';

const NewMeal = () => {
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [intoDiet, setIntoDiet] = useState<boolean | null>(null);
  const onChangeDate = (e: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <Animated.View entering={SlideInDown} exiting={SlideOutDown} className="flex-1">
      <SafeScreenContent className="mx-0 bg-base-500">
        <View className="mx-6 mt-6 flex w-fit flex-row">
          <TouchableOpacity
            onPress={goBack}
            className="h-12 items-center justify-center rounded-full">
            <ArrowLeft color={Colors.base[50]} strokeWidth={4} height={18} width={18} />
          </TouchableOpacity>
          <View className="mx-auto flex w-auto items-center">
            <Text className="mr-6 font-nunito-bold text-lg">New meal</Text>
          </View>
        </View>
        <View className="shadow-3xl w-full flex-1 rounded-t-2xl bg-base-700 p-6 shadow-base-50">
          <CustomTextInput
            onChangeText={() => {}}
            labelText="Name"
            placeholder="Enter meal name"
            autoCapitalize="words"
          />
          <CustomTextInput
            onChangeText={() => {}}
            labelText="Description"
            placeholder="Enter meal description"
            textAlignVertical="top"
            multiline
          />
          <View className="mb-4 flex flex-row justify-between gap-4">
            <View className="flex-1">
              <Text className="mb-2 font-nunito-bold text-base">Date</Text>
              <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                  className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md"
                  onPress={showDatepicker}
                  value={date.toLocaleDateString([], {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                  editable={false}
                  focusable
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="mb-2 font-nunito-bold text-base">Time</Text>
              <TouchableOpacity onPress={showTimepicker}>
                <TextInput
                  className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md"
                  value={date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mb-2 items-center justify-center font-nunito-bold text-mdi">
            In diet meal?
          </Text>
          <View className="flex w-full flex-row items-center gap-4">
            <TouchableOpacity
              className={twMerge(
                'flex-1 flex-row items-center justify-center gap-1 rounded-xl py-4',
                intoDiet === true ? 'border-2 border-green-500 bg-green-100' : 'bg-base-600'
              )}
              onPress={() => setIntoDiet(true)}>
              <CircleCheck color={Colors.green[600]} />
              <Text className="font-nunito-bold text-mdi">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={twMerge(
                'flex-1 flex-row items-center justify-center gap-1 rounded-xl py-4',
                intoDiet === false
                  ? 'border-2 border-brick-red-600 bg-brick-red-100'
                  : 'bg-base-600'
              )}
              onPress={() => setIntoDiet(false)}>
              <CircleAlert color={Colors['brick-red'][600]} />
              <Text className="font-nunito-bold text-mdi">No</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="mt-auto w-full items-center justify-center rounded-xl bg-base-100">
            <Text className="p-4 py-6 font-nunito-bold text-mdi text-base-700">
              Record new meal
            </Text>
          </TouchableOpacity>
        </View>
      </SafeScreenContent>
    </Animated.View>
  );
};
export { NewMeal };
