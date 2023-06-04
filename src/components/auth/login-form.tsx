'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { EyeIcon, EyeOffIcon, LoaderIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomAPIError, loginUser } from '~/lib/api';
import { parseToken } from '~/lib/jwt';
import { loginSchema, type Login } from '~/lib/validations/auth';
import useAuth from '~/hooks/useAuth';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { toast } from '../ui/use-toast';

export const authTokenAtom = atomWithStorage<string | null>(
  'bexjobs-token',
  null
);
export const sessionTimeoutAtom = atomWithStorage<number | null>(
  'bexjobs-session-timeout',
  null
);
export const hasPersistLoginAtom = atomWithStorage('bexjobs-persist', true);

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [hasPersistLogin, setHasPersistLogin] = useAtom(hasPersistLoginAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setSessionTimeout = useSetAtom(sessionTimeoutAtom);

  const id = useId();
  const router = useRouter();

  const { login } = useAuth();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const authInfo = parseToken(data.token);

      const sessionTimeoutPersistLogin = authInfo.tokenExpirationDate * 1000; // convert date to milliseconds

      setAuthToken(data.token);
      hasPersistLogin && setSessionTimeout(sessionTimeoutPersistLogin);
      login({
        userId: authInfo.userId,
        username: authInfo.username,
        email: authInfo.email,
      });
      toast({
        description: data.msg,
      });
      router.replace('/dashboard');
    },
    onError: (error: CustomAPIError) => {
      toast({
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    mutate(data);
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
          <div className="relative">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              id={id + '-password'}
              {...register('password')}
              placeholder="enter password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0"
            >
              <span className="sr-only">
                {passwordVisible ? 'Hide password' : 'Show password'}
              </span>
              {passwordVisible ? (
                <EyeOffIcon aria-hidden="true" />
              ) : (
                <EyeIcon aria-hidden="true" />
              )}
            </Button>
          </div>
          {errors.password && (
            <small className="px-1 text-xs leading-none text-error-form-foreground">
              {errors.password.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              id={id + '-persist-login'}
              checked={hasPersistLogin}
              onCheckedChange={() => setHasPersistLogin(!hasPersistLogin)}
              disabled={isLoading}
            />
            <Label
              htmlFor={id + '-persist-login'}
              className="cursor-pointer text-xs"
            >
              Stay logged in for 30 days
            </Label>
          </div>
          {!hasPersistLogin && (
            <p className="rounded-md border border-warning-border bg-warning px-3 py-2 text-xs text-warning-foreground">
              You will be logged out after 30 minutes of inactivity.
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
              <span className="sr-only">Logging in...</span>
              <LoaderIcon
                aria-hidden="true"
                className="mr-2 h-5 w-5 animate-spin"
              />
            </div>
          ) : (
            'Log in'
          )}
        </Button>
      </div>
    </form>
  );
}
