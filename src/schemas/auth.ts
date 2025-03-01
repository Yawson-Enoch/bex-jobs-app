import { z } from 'zod';

const Auth = z.object({
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

/* form schema */
export const Signup = Auth.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  },
);
export type Signup = z.infer<typeof Signup>;

export const Login = Auth.omit({
  firstName: true,
  lastName: true,
  passwordConfirm: true,
});
export type Login = z.infer<typeof Login>;

export const Profile = Auth.omit({
  password: true,
  passwordConfirm: true,
  email: true,
});
export type Profile = z.infer<typeof Profile>;

/* api response schema */
export const ApiMessage = z.object({
  msg: z.string(),
});

export const ApiLogin = ApiMessage.extend({
  data: z.object({
    token: z.string(),
  }),
});

export const ApiProfile = ApiMessage.extend({
  data: Auth.pick({
    firstName: true,
    lastName: true,
  }),
});
