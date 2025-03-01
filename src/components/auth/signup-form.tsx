'use client';

import { useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Signup } from '~/schemas/auth';
import { useSignup } from '~/hooks/api/useSignup';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

export default function SignupForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const id = useId();

  const form = useForm<Signup>({
    resolver: zodResolver(Signup),
    mode: 'onSubmit',
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const signupMutation = useSignup();

  const onSubmit: SubmitHandler<Signup> = (data) => {
    signupMutation.mutate(data);
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
              disabled={signupMutation.isPending}
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
              disabled={signupMutation.isPending}
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
            disabled={signupMutation.isPending}
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

          <div className="flex h-9 items-center justify-between gap-2 rounded-md border border-input pr-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              id={id + '-password'}
              {...register('password')}
              placeholder="enter password"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={signupMutation.isPending}
              className="grow rounded-r-none border-0 placeholder:truncate focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="h-fit self-center rounded-full p-1"
            >
              <span className="sr-only">
                {passwordVisible ? 'Hide password' : 'Show password'}
              </span>
              {passwordVisible ? (
                <EyeOffIcon aria-hidden="true" size={17} />
              ) : (
                <EyeIcon aria-hidden="true" size={17} />
              )}
            </Button>
          </div>
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
            type={passwordVisible ? 'text' : 'password'}
            id={id + '-confirm-password'}
            {...register('passwordConfirm')}
            placeholder="confirm password"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={signupMutation.isPending}
          />
          {errors.passwordConfirm && (
            <small className="text-error-form-foreground">
              {errors.passwordConfirm.message}
            </small>
          )}
        </div>
        <Button type="submit" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? (
            <LoadingIndicator msg="Signing up..." />
          ) : (
            'Sign up'
          )}
        </Button>
      </div>
      <DevTool control={control} />
    </form>
  );
}
