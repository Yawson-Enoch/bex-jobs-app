'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginSchema } from '@/lib/validations/auth';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type TypeLoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TypeLoginSchema> = async (
    data
  ): Promise<void> => {
    // test submit delay
    return new Promise((resolve, _) => {
      setTimeout(() => {
        console.log(data);
        resolve();
        // reset();
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 md:space-y-5">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="name@example.com"
            autoComplete="email"
            autoCorrect="off"
            disabled={isSubmitting}
            {...register('email')}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="enter password"
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isSubmitting}
            {...register('password')}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isValid || !isDirty}
        >
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Logging in' : 'Log in'}
        </Button>
      </div>
      {/* <pre className="mt-2 text-sm">{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
}
