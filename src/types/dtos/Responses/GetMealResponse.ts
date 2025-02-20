export type GetMealResponse = {
  meal: {
    id: string;
    name: string;
    description?: string;
    in_diet: boolean;
    date: Date;
    time: Date;
  };
};
