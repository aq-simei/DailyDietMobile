import z from 'zod';

export const CreateMealFormSchema = z.object({
  name: z
    .string({ message: 'Must provide a name' })
    .max(20, { message: 'Name to long, keep it under 20 characters' }),
  description: z.string().optional(),
  inDiet: z.boolean({ message: 'must specify the meal type' }),
});

export type CreateMealFormDTO = z.infer<typeof CreateMealFormSchema>;
