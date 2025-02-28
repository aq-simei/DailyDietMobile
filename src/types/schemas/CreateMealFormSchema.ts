import { z } from 'zod';

export const CreateMealFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Invalid date format',
  }),
  time: z.date({
    required_error: 'Time is required',
    invalid_type_error: 'Invalid time format',
  }),
  in_diet: z.boolean({
    required_error: 'Please select if meal is in diet',
    invalid_type_error: 'Invalid selection',
  }),
});

export type CreateMealFormDTO = z.infer<typeof CreateMealFormSchema>;
