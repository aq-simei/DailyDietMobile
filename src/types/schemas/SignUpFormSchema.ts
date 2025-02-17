import z from 'zod';

const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    name: z.string().email().min(0, { message: 'Name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
  });

export type SignUpFormDTO = z.infer<typeof SignUpFormSchema>;
