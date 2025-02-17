import z from 'zod'

export const CreateMealFormSchema = z.object({
  name: z.string().max(20, {message: "Name to long, keep it under 20 characters"}),
  description: z.string().optional(),
  date: z.string().date(),
  time: z.string().date(),
  inDiet : z.boolean({message: "Please chose one"}),
})

export type CreateMealFormDTO = z.infer<typeof CreateMealFormSchema>
