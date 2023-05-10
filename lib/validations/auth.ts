import { z } from 'zod';

const authSchema = z.object({
  username: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .min(2, { message: 'Name must be 2 or more characters long' }),
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
    .min(6, { message: 'Password must be 6 or more characters long' }),
  passwordConfirm: z
    .string({
      required_error: 'Password confirmation value is required',
      invalid_type_error: 'Password confirmation value must be a string',
    })
    .trim(),
});

const signupSchema = authSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }
);
type Signup = z.infer<typeof signupSchema>;

const loginSchema = authSchema
  .omit({ username: true, passwordConfirm: true })
  .extend({
    persistLogin: z
      .boolean({
        required_error: 'persistLogin is required',
        invalid_type_error: 'persistLogin must be a boolean',
      })
      .default(true),
  });
type Login = z.infer<typeof loginSchema>;

export { signupSchema, loginSchema, type Signup, type Login };
