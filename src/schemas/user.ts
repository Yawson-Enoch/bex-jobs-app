import { z } from 'zod';

export const mutationResponseSchema = z.object({
  msg: z.string(),
});

export const userSchema = z.object({
  msg: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  }),
});
type TUser = z.infer<typeof userSchema>;
