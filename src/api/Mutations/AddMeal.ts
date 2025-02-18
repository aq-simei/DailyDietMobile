import { axiosInstance } from '../axios';
import { AddMealRequestDTO, AddMealRoute } from '../../types/dtos/Requests/AddMealRequest';

export const AddMeal = (AddMealRequestDTO: AddMealRequestDTO) => {
  const response = axiosInstance.post(AddMealRoute,  {
    Description: AddMealRequestDTO.description,
    Name: AddMealRequestDTO.name,
    InDiet: AddMealRequestDTO.in_diet,
    Date: AddMealRequestDTO.date,
    Time: AddMealRequestDTO.time,
  });
  return response
};
