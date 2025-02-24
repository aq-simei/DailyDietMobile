import { axiosInstance } from '../axios';
import { AddMealRequestDTO, AddMealRoute } from '../../types/dtos/Requests/AddMealRequest';

export const AddMeal = (AddMealRequestDTO: AddMealRequestDTO) => {
  const response = axiosInstance.post(AddMealRoute, {
    description: AddMealRequestDTO.description,
    name: AddMealRequestDTO.name,
    in_diet: AddMealRequestDTO.in_diet,
    date: AddMealRequestDTO.date,
    time: AddMealRequestDTO.time,
  });
  return response;
};
