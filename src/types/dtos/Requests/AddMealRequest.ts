export const AddMealRoute = '/meals/new';

export type AddMealRequestDTO = {
  name: string;
  description?: string;
  in_diet: boolean;
  time: Date;
  date: Date;
};
