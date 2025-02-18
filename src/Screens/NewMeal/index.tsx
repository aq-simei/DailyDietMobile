import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { AlertCircle, ArrowLeft, CircleAlert, CircleCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMealFormSchema, CreateMealFormDTO } from '@src/types/schemas/CreateMealFormSchema';
import { UseCreateMeal } from '@src/Hooks/useCreateMeal';
import { showErrorToast, showInfoToast } from '@src/Components/Toasts/Toasts';

const NewMeal = () => {
  const { goBack } = useNavigation<NavigationProp<HomeStackParamList>>();
  const { createMeal, createMealError, createMealPending, createMealSuccess } = UseCreateMeal();
  const [date, setDate] = useState(new Date());
  const [inDiet, setInDiet] = useState<boolean | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMealFormDTO>({
    resolver: zodResolver(CreateMealFormSchema),
  });

  const onSubmit = (data: CreateMealFormDTO) => {
    createMeal({
      description: data.description,
      in_diet: data.inDiet,
      name: data.name,
      date: date,
      time: date,
    });
  };

  const onError = (error: any) => {
    // show error message on toast
    if (error.name) showErrorToast('Error in form field name: ' + error.name.message);
    if (error.description)
      showErrorToast('Error in form fields: description' + error.description.message);
    if (error.inDiet) showErrorToast('Error in form field: in diet meal' + error.inDiet.message);
  };

  const onChangeDate = (e: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    showInfoToast('Updated date');
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                labelText="Name"
                placeholder="Enter meal name"
                autoCapitalize="words"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                labelText="Description"
                placeholder="Enter meal description"
                textAlignVertical="top"
                multiline
                errorMessage={errors.description?.message}
              />
            )}
          />
          <View className="mb-4 flex flex-row justify-between gap-4">
            <View className="flex-1">
              <TouchableOpacity onPress={showDatepicker}>
                <CustomTextInput
                  labelText="Date"
                  className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md"
                  value={date.toLocaleDateString([], {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <TouchableOpacity onPress={showTimepicker}>
                <CustomTextInput
                  onChangeText={() => showInfoToast('Updated time')}
                  labelText="Time"
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
          <View className="flex flex-col">
            <View className="flex w-full flex-row items-center gap-4">
              <TouchableOpacity
                className={twMerge(
                  'flex-1 flex-row items-center justify-center gap-1 rounded-xl py-4',
                  inDiet === true ? 'border-2 border-green-500 bg-green-100' : 'bg-base-600'
                )}
                onPress={() => {
                  setValue('inDiet', true);
                  setInDiet(true);
                }}>
                <CircleCheck color={Colors.green[600]} />
                <Text className="font-nunito-bold text-mdi">Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={twMerge(
                  'flex-1 flex-row items-center justify-center gap-1 rounded-xl py-4',
                  inDiet === false
                    ? 'border-2 border-brick-red-600 bg-brick-red-100'
                    : 'bg-base-600'
                )}
                onPress={() => {
                  setValue('inDiet', false);
                  setInDiet(false);
                }}>
                <CircleAlert color={Colors['brick-red'][600]} />
                <Text className="font-nunito-bold text-mdi">No</Text>
              </TouchableOpacity>
            </View>
            {/* keep selector simple, refactor later for select component */}
            {errors.inDiet?.message && (
              <View className="mt-1 flex flex-row items-center gap-2">
                <AlertCircle
                  width={16}
                  height={16}
                  stroke={Colors['brick-red']['500']}
                  strokeWidth={2}
                />
                <Text className="font-nunito-bold text-brick-red-500">
                  {errors.inDiet?.message}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            className="mt-auto w-full items-center justify-center rounded-xl bg-base-100"
            onPress={handleSubmit(onSubmit, onError)}>
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
