import { axiosInstance } from '../axios';

type DeleteMealDto = {
  id: string;
};

export const DeleteMeal = (deleteMealDto: DeleteMealDto) => {
  const response = axiosInstance.delete(`/meals/edit/${deleteMealDto.id}`);
  return response;
};
