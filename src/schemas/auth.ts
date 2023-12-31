import { z } from 'zod';

const authSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .trim()
    .min(2, { message: 'First name must be 2 or more characters long' }),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .trim()
    .min(2, { message: 'Last name must be 2 or more characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .trim()
    .min(8, { message: 'Password must be 8 or more characters long' }),
  passwordConfirm: z
    .string({
      required_error: 'Password confirmation value is required',
      invalid_type_error: 'Password confirmation value must be a string',
    })
    .trim(),
});

export const mutationResponseSchema = z.object({
  msg: z.string(),
});

export const signupSchema = authSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  },
);
export type TSignup = z.infer<typeof signupSchema>;

export const loginSchema = authSchema.omit({
  firstName: true,
  lastName: true,
  passwordConfirm: true,
});
export const loginMutationResponseSchema = mutationResponseSchema.extend({
  token: z.string(),
});
export type TLogin = z.infer<typeof loginSchema>;

export const profileSchema = authSchema.omit({
  password: true,
  passwordConfirm: true,
});
export type TProfile = z.infer<typeof profileSchema>;

export const profileAPISchema = z.object({
  msg: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  }),
});
