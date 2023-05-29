'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomAPIError, registerUser } from '@/lib/api';
import { signupSchema, type Signup } from '@/lib/validations/auth';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from '../ui/use-toast';

export default function SignupForm() {
  const id = useId();
  const router = useRouter();

  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast({
        description: data.msg,
      });
      router.push('/login');
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
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 md:space-y-6">
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-username'}>
            Name
          </Label>
          <Input
            type="text"
            id={id + '-username'}
            {...register('username')}
            placeholder="enter name"
            autoComplete="name"
            autoCorrect="off"
            autoFocus
            disabled={isLoading}
          />
          {errors.username && (
            <small className="px-1 text-xs leading-none text-error-form-foreground">
              {errors.username.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-email'}>
            Email
          </Label>
          <Input
            type="email"
            id={id + '-email'}
            {...register('email')}
            placeholder="name@example.com"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.email && (
            <small className="px-1 text-xs leading-none text-error-form-foreground">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-password'}>
            Password
          </Label>
          <Input
            type="password"
            id={id + '-password'}
            {...register('password')}
            placeholder="enter password"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.password && (
            <small className="px-1 text-xs leading-none text-error-form-foreground">
              {errors.password.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-confirm-password'}>
            Confirm Password
          </Label>
          <Input
            type="password"
            id={id + '-confirm-password'}
            {...register('passwordConfirm')}
            placeholder="confirm password"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.passwordConfirm && (
            <small className="px-1 text-xs leading-none text-error-form-foreground">
              {errors.passwordConfirm.message}
            </small>
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
              <LoaderIcon
                aria-hidden="true"
                className="mr-2 h-5 w-5 animate-spin"
              />
            </div>
          ) : (
            'Sign up'
          )}
        </Button>
      </div>
    </form>
  );
}
