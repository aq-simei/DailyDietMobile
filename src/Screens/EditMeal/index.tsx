import { SafeScreenContent } from '@src/Components/SafeScreenContent/SafeScreenContent';
import { Colors } from '@src/Constants/Colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@src/@types/navigation';
import { Button } from '@src/Components/Button/Button';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Save, Trash } from 'lucide-react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AlertCircle, CircleAlert, CircleCheck } from 'lucide-react-native';
import { twMerge } from 'tailwind-merge';
import { CreateMealFormSchema, CreateMealFormDTO } from '@src/types/schemas/CreateMealFormSchema';
import { showErrorToast } from '@src/Components/Toasts/Toasts';
import { formatTime } from '@src/Utils/formatters/formatTime';
import { formatDate } from '@src/Utils/formatters/formatDate';
import { UseFetchMeal } from '@src/Hooks/useFetchMeal';
import { UseEditMeal } from '@src/Hooks/useEditMeal';
import { EditMealRequestDTO } from '@src/types/dtos/Requests/EditMealRequest';

const EditMeal = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'EditMeal'>>();
  if (!route.params) {
    return null;
  }
  const { mealId } = route.params;
  const { goBack, navigate } = useNavigation<NavigationProp<HomeStackParamList, 'DeleteMeal'>>();

  const { data, fetchMealLoading, fetchMealSuccess } = UseFetchMeal({ mealId });
  const [inDiet, setInDiet] = useState<boolean | null>(null);
  const [date, setDate] = useState<Date | null>(data?.meal.date || null);
  const [time, setTime] = useState<Date | null>(data?.meal.time || null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMealFormDTO>({
    resolver: zodResolver(CreateMealFormSchema),
  });

  const { editMeal, editMealError, editMealPending, editMealSuccess } = UseEditMeal();
  const onSubmit = (formData: EditMealRequestDTO) => {
    if (date === null || time === null) {
      showErrorToast('Please select a date and time');
      return;
    }
    editMeal({
      ...formData,
      id: mealId,
      in_diet: formData.in_diet,
      date: date,
      time: time,
    });
  };

  const onDelete = () => {
    const name = data?.meal.name;
    navigate('DeleteMeal', {
      mealId: mealId,
      mealName: data?.meal.name || '',
    });
  };

  const onError = (error: any) => {
    if (error.name) showErrorToast('Error in form field name: ' + error.name.message);
    if (error.inDiet) showErrorToast('Error in form field in diet: ' + error.inDiet.message);
  };

  const onChangeDate = (e: any, selectedDate: any) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setDate(currentDate);
      setTime(currentDate);
      setValue('date', currentDate);
      setValue('time', currentDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
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

  useEffect(() => {
    if (data?.meal && fetchMealSuccess) {
      const mealDate = new Date(data.meal.date);
      setDate(mealDate);
      setTime(mealDate);
      setInDiet(data.meal.in_diet);
      setValue('date', mealDate);
      setValue('time', mealDate);
      setValue('name', data.meal.name);
      setValue('description', data.meal.description || '');
      setValue('in_diet', data.meal.in_diet);
    }

    return () => {
      setDate(null);
      setTime(null);
      setInDiet(null);
    };
  }, [data?.meal, mealId]);

  return (
    <Animated.View className="flex-1">
      <SafeScreenContent hasHeader>
        <StatusBar style="auto" />
        <View className="w-full flex-row items-center justify-evenly p-4">
          <TouchableOpacity onPress={() => goBack()}>
            <ArrowLeft color={Colors.base[200]} />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-nunito-bold text-lg">
            Editing {data?.meal.name}
          </Text>
        </View>
        {fetchMealLoading && data?.meal == undefined ? (
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
                    className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md placeholder:text-base-50"
                    value={date ? formatDate(date) : ''}
                    editable={false}
                    errorMessage={errors.date?.message}
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-1">
                <TouchableOpacity onPress={showTimepicker}>
                  <CustomTextInput
                    labelText="Time"
                    className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md placeholder:text-base-50"
                    value={time ? formatTime(time) : ''}
                    editable={false}
                    errorMessage={errors.time?.message}
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
                    setInDiet(true);
                    setValue('in_diet', true);
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
                    setInDiet(false);
                    setValue('in_diet', false);
                  }}>
                  <CircleAlert color={Colors['brick-red'][600]} />
                  <Text className="font-nunito-bold text-mdi">No</Text>
                </TouchableOpacity>
              </View>
              {errors.in_diet?.message && (
                <View className="mt-1 flex flex-row items-center gap-2">
                  <AlertCircle
                    width={16}
                    height={16}
                    stroke={Colors['brick-red']['500']}
                    strokeWidth={2}
                  />
                  <Text className="font-nunito-bold text-brick-red-500">
                    {errors.in_diet?.message}
                  </Text>
                </View>
              )}
            </View>
            <Button
              className="mt-8 w-full flex-row items-center justify-center rounded-lg bg-base-50 p-4"
              onPress={handleSubmit(onSubmit, onError)}>
              {editMealPending ? (
                <ActivityIndicator color={Colors.base[600]} />
              ) : (
                <>
                  <View className="mr-2">
                    <Save color={Colors.base[600]} strokeWidth={2} size={24} />
                  </View>
                  <Text className="font-nunito-bold text-lg text-base-700">Save changes</Text>
                </>
              )}
            </Button>
            <Button
              disabled={editMealPending}
              className="mt-4 w-full flex-row items-center justify-center rounded-lg bg-brick-red-500 p-4"
              onPress={onDelete}>
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
