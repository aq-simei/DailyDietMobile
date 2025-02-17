import { axiosInstance } from '../axios';
import { AddMealRequestDTO, AddMealRoute } from '../../types/dtos/Requests/AddMealRequest';

export const AddMeal = (AddMealRequestDTO: AddMealRequestDTO) => {
  const response = axiosInstance.post(AddMealRoute, {
    AddMealRequestDTO,
  });
  return response
};
