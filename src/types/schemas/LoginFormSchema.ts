import z from 'zod';

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type LoginFormDTO = z.infer<typeof LoginFormSchema>;
