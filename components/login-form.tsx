'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { loginSchema, type Login } from '@/lib/validations/auth';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function LoginForm() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      persistLogin: true,
    },
  });

  const isPersistLogin = watch('persistLogin');

  const onSubmit: SubmitHandler<Login> = async (data): Promise<void> => {
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
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isSubmitting}
            {...register('password')}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Switch
                id="persist-login"
                checked={isPersistLogin}
                onCheckedChange={() =>
                  setValue('persistLogin', !isPersistLogin)
                }
                disabled={isSubmitting}
                {...register('persistLogin')}
              />
              <Label htmlFor="persist-login" className="cursor-pointer text-xs">
                Stay logged in for 30 days
              </Label>
            </div>
            {!isPersistLogin && (
              <p className="rounded-md border border-warning-border bg-warning px-3 py-2 text-xs text-warning-foreground">
                You will be logged out after 30 minutes of inactivity.
              </p>
            )}
          </div>
          {errors?.persistLogin && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.persistLogin.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isValid || !isDirty}
        >
          {isSubmitting ? (
            <div role="status">
              <span className="sr-only">Logging in...</span>
              <Loader
                aria-hidden="true"
                className="mr-2 h-5 w-5 animate-spin"
              />
            </div>
          ) : (
            'Log in'
          )}
        </Button>
      </div>
      {/* <pre className="mt-2 text-sm">{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
}
