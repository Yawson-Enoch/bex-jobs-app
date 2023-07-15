'use client';

import { useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { loginSchema, TLogin } from '~/schemas/auth';
import { persistLoginAtom } from '~/atoms/persist';
import { useLogin } from '~/hooks/api/useLogin';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [persistLogin, setPersistLogin] = useAtom(persistLoginAtom);

  const id = useId();

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<TLogin> = (data) => {
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
            disabled={loginMutation.isLoading}
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
          <div className="flex h-9 items-center justify-between gap-2 rounded-md border border-input pr-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              id={id + '-password'}
              {...register('password')}
              placeholder="enter password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={loginMutation.isLoading}
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
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              id={id + '-persist-login'}
              checked={persistLogin}
              onCheckedChange={() => setPersistLogin(!persistLogin)}
              disabled={loginMutation.isLoading}
            />
            <Label
              htmlFor={id + '-persist-login'}
              className="cursor-pointer text-sm"
            >
              Stay logged in for 30 days
            </Label>
          </div>
          {!persistLogin && (
            <p className="rounded-md border border-warning-border bg-warning px-3 py-2 text-xs text-warning-foreground">
              You will be logged out after 30 minutes of inactivity.
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? (
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
