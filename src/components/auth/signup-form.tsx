'use client';

import { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signupSchema, type Signup } from '~/lib/validations/auth';
import useSignup from '~/hooks/api/useSignup';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SignupForm() {
  const id = useId();

  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const { mutate, isLoading } = useSignup();

  const onSubmit: SubmitHandler<Signup> = (data) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:gap-6">
        <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-6">
          <div className="space-y-1">
            <Label className="sr-only" htmlFor={id + '-firstName'}>
              First Name
            </Label>
            <Input
              type="text"
              id={id + '-firstName'}
              {...register('firstName')}
              placeholder="enter first name"
              autoComplete="name"
              autoCorrect="off"
              autoFocus
              disabled={isLoading}
            />
            {errors.firstName && (
              <small className="text-error-form-foreground">
                {errors.firstName.message}
              </small>
            )}
          </div>
          <div className="space-y-1">
            <Label className="sr-only" htmlFor={id + '-lastName'}>
              Last Name
            </Label>
            <Input
              type="text"
              id={id + '-lastName'}
              {...register('lastName')}
              placeholder="enter last name"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.lastName && (
              <small className="text-error-form-foreground">
                {errors.lastName.message}
              </small>
            )}
          </div>
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
            <small className="text-error-form-foreground">
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
            <small className="text-error-form-foreground">
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
            <small className="text-error-form-foreground">
              {errors.passwordConfirm.message}
            </small>
          )}
        </div>
        <Button type="submit" disabled={isLoading || !isValid || !isDirty}>
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
