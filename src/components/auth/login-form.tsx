'use client';

import { useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Login } from '~/schemas/auth';
import { useLogin } from '~/hooks/api/useLogin';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const id = useId();

  const form = useForm<Login>({
    resolver: zodResolver(Login),
    mode: 'onSubmit',
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<Login> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 md:space-y-6">
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
            autoFocus
            disabled={loginMutation.isPending}
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
              autoComplete="current-password"
              autoCorrect="off"
              disabled={loginMutation.isPending}
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
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <LoadingIndicator msg="Logging in..." />
          ) : (
            'Log in'
          )}
        </Button>
      </div>
      <DevTool control={control} />
    </form>
  );
}
