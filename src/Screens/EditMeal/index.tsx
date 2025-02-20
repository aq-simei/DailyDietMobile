import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { Button } from '@src/Components/Button/Button';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Save, Trash } from 'lucide-react-native';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AlertCircle, CircleAlert, CircleCheck } from 'lucide-react-native';
import { twMerge } from 'tailwind-merge';
import { CreateMealFormSchema, CreateMealFormDTO } from '@src/types/schemas/CreateMealFormSchema';
import { showErrorToast, showInfoToast } from '@src/Components/Toasts/Toasts';
import { formatTime } from '@src/Utils/formatters/formatTime';
import { formatDate } from '@src/Utils/formatters/formatDate';
import { UseFetchMeal } from '@src/Hooks/useFetchMeal';

const EditMeal = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  if (!route.params) {
    return null;
  }
  const { mealId } = route.params;
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();

  const [inDiet, setInDiet] = useState<boolean | null>(null);
  const { data, fetchMealError, fetchMealLoading, fetchMealSuccess, fetchMealIsError } =
    UseFetchMeal({ mealId });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMealFormDTO>({
    resolver: zodResolver(CreateMealFormSchema),
  });

  const [date, setDate] = useState(new Date());
  const onSubmit = (data: CreateMealFormDTO) => {
    // Handle meal update logic here
  };

  const onError = (error: any) => {
    if (error.name) showErrorToast('Error in form field name: ' + error.name.message);
    if (error.inDiet) showErrorToast('Error in form field in diet: ' + error.inDiet.message);
  };

  const onChangeDate = (e: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value:
        currentMode == 'date'
          ? data?.meal.date
            ? new Date(data.meal.date)
            : date
          : data?.meal.time
            ? new Date(data.meal.time)
            : date,
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
    <Animated.View entering={FadeInRight.duration(500)} className="flex-1">
      <SafeScreenContent hasHeader>
        <StatusBar style="auto" />
        <View className="w-full flex-row items-center justify-evenly p-4">
          <TouchableOpacity onPress={() => navigate('Home')}>
            <ArrowLeft color={Colors.base[200]} />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-nunito-bold text-lg">
            Editing {data?.meal.name}
          </Text>
        </View>
        {fetchMealLoading ? (
          <ActivityIndicator size="large" color={Colors.base[500]} />
        ) : (
          <Animated.View className="p-4" entering={FadeIn.duration(500)}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  defaultValue={data?.meal.name}
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
                  defaultValue={data?.meal.description}
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
                    value={formatDate(date)}
                    defaultValue={formatDate(data?.meal.date ?? new Date())}
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
                    value={formatTime(date)}
                    defaultValue={formatTime(data?.meal.time ?? new Date())}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="mb-2 items-center justify-center font-nunito-bold text-mdi">
              In diet meal?
            </Text>
            <View className="flex flex-col" testID="in-diet-meal-picker">
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
            <Button
              className="mt-8 w-full flex-row items-center justify-center rounded-lg bg-base-50 p-4"
              onPress={handleSubmit(onSubmit, onError)}>
              <View className="mr-2">
                <Save color={Colors.base[600]} strokeWidth={2} size={24} />
              </View>
              <Text className="font-nunito-bold text-lg text-base-700">Save changes</Text>
            </Button>
            <Button
              className="mt-4 w-full flex-row items-center justify-center rounded-lg bg-brick-red-500 p-4"
              onPress={handleSubmit(onSubmit, onError)}>
              <View className="mr-2">
                <Trash color={Colors.base[600]} strokeWidth={3} size={24} />
              </View>
              <Text className="font-nunito-bold text-lg text-base-700">Delete meal</Text>
            </Button>
          </Animated.View>
        )}
      </SafeScreenContent>
    </Animated.View>
  );
};

export { EditMeal };
