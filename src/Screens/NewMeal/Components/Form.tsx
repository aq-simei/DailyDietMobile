import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AlertCircle, CircleAlert, CircleCheck } from 'lucide-react-native';
import { twMerge } from 'tailwind-merge';
import CustomTextInput from '@src/Components/CustomTextInput/CustomTextInput';
import { CreateMealFormSchema, CreateMealFormDTO } from '@src/types/schemas/CreateMealFormSchema';
import { UseCreateMeal } from '@src/Hooks/useCreateMeal';
import { showErrorToast } from '@src/Components/Toasts/Toasts';
import { formatTime } from '@src/Utils/formatters/formatTime';
import { formatDate } from '@src/Utils/formatters/formatDate';
import { Colors } from '@src/Constants/Colors';

const Form = () => {
  const { createMeal, createMealPending } = UseCreateMeal();
  const [date, setDate] = useState(new Date());
  const [inDiet, setInDiet] = useState<boolean | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMealFormDTO>({
    resolver: zodResolver(CreateMealFormSchema),
    defaultValues: {
      name: '',
      description: '',
      in_diet: undefined, // Remove default false to force user selection
      date: new Date(),
      time: new Date(),
    },
    mode: 'onBlur', // Validate on blur
  });

  const onSubmit = (data: CreateMealFormDTO) => {
    createMeal({
      description: data.description,
      in_diet: data.in_diet,
      name: data.name,
      date: data.date,
      time: data.time,
    });
  };

  const onError = (error: any) => {
    Object.keys(error).forEach((key) => {
      showErrorToast(`${error[key].message}`);
    });
  };

  const onChangeDate = (currentMode: 'date' | 'time', selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (currentMode === 'date') {
        const currentTime = date;
        newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
        setDate(newDate);
        setValue('date', newDate);
      } else {
        const currentDate = date;
        currentDate.setHours(newDate.getHours(), newDate.getMinutes());
        setDate(currentDate);
        setValue('time', currentDate);
      }
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_, selectedDate) => onChangeDate(currentMode, selectedDate),
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
    <View
      className="shadow-3xl w-full flex-1 rounded-t-2xl bg-base-700 p-6 shadow-base-50"
      testID="new-meal-form">
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
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
        rules={{ required: true }}
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
          <Controller
            control={control}
            name="date"
            render={({ field: { value } }) => (
              <TouchableOpacity onPress={showDatepicker}>
                <CustomTextInput
                  labelText="Date"
                  className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md"
                  value={formatDate(value || date)}
                  editable={false}
                  errorMessage={errors.date?.message}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="time"
            render={({ field: { value } }) => (
              <TouchableOpacity onPress={showTimepicker}>
                <CustomTextInput
                  labelText="Time"
                  className="h-12 w-full rounded-md border-2 border-base-300 p-2 font-nunito-semibold text-md"
                  value={formatTime(value || date)}
                  editable={false}
                  errorMessage={errors.time?.message}
                />
              </TouchableOpacity>
            )}
          />
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
              setValue('in_diet', true);
              setInDiet(true);
            }}>
            <CircleCheck color={Colors.green[600]} />
            <Text className="font-nunito-bold text-mdi">Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={twMerge(
              'flex-1 flex-row items-center justify-center gap-1 rounded-xl py-4',
              inDiet === false ? 'border-2 border-brick-red-600 bg-brick-red-100' : 'bg-base-600'
            )}
            onPress={() => {
              setValue('in_diet', false);
              setInDiet(false);
            }}>
            <CircleAlert color={Colors['brick-red'][600]} />
            <Text className="font-nunito-bold text-mdi">No</Text>
          </TouchableOpacity>
        </View>
        {(errors.in_diet?.message || inDiet === null) && (
          <View className="mt-1 flex flex-row items-center gap-2">
            <AlertCircle
              width={16}
              height={16}
              stroke={Colors['brick-red']['500']}
              strokeWidth={2}
            />
            <Text className="font-nunito-bold text-brick-red-500">
              {errors.in_diet?.message || 'Please select if meal is in diet'}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        className="mt-auto w-full items-center justify-center rounded-xl bg-base-100"
        onPress={handleSubmit(onSubmit, onError)}>
        {createMealPending ? (
          <ActivityIndicator size={'large'} className="p-4" color={Colors.base[700]} />
        ) : (
          <Text className="p-4 py-6 font-nunito-bold text-mdi text-base-700">Record new meal</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Form;
