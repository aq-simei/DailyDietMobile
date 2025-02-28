import { axiosInstance } from '../axios';
import { EditMealRequestDTO } from '@src/types/dtos/Requests/EditMealRequest';

export const EditMeal = async (editMealRequestDTO: EditMealRequestDTO) => {
  const body: Partial<EditMealRequestDTO> = {
    id: editMealRequestDTO.id,
    name: editMealRequestDTO.name,
    description: editMealRequestDTO.description,
    in_diet: editMealRequestDTO.in_diet,
    time: editMealRequestDTO.time,
    date: editMealRequestDTO.date,
  };

  const response = await axiosInstance.patch(`/meals/edit/${editMealRequestDTO.id}`, body);
  return response.data;
};
