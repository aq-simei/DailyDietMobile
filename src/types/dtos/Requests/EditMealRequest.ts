import { AddMealRequestDTO } from './AddMealRequest';

export type EditMealRequestDTO = Partial<AddMealRequestDTO> & {
  id?: string;
};
