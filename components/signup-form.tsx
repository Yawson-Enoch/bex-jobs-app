'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomAPIError, registerUser } from '@/lib/api';
import { signupSchema, type Signup } from '@/lib/validations/auth';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/use-toast';

export default function SignupForm() {
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast({
        description: data.msg,
      });
      reset();
    },
    onError: (error: CustomAPIError) => {
      toast({
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<Signup> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 md:space-y-5">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="username">
            Name
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="enter name"
            autoComplete="name"
            autoCorrect="off"
            disabled={isLoading}
            {...register('username')}
          />
          {errors?.username && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.username.message}
            </p>
          )}
        </div>
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
            disabled={isLoading}
            {...register('email')}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.email.message}
            </p>
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
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
            {...register('password')}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="confirm-password">
            Confirm Password
          </Label>
          <Input
            type="password"
            id="confirm-password"
            placeholder="confirm password"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
            {...register('passwordConfirm')}
          />
          {errors?.passwordConfirm && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !isValid || !isDirty}
        >
          {isLoading ? (
            <div role="status">
              <span className="sr-only">Signing up...</span>
              <Loader
                aria-hidden="true"
                className="mr-2 h-5 w-5 animate-spin"
              />
            </div>
          ) : (
            'Sign up'
          )}
        </Button>
      </div>
      {/* <pre className="mt-2 text-sm">{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
}
