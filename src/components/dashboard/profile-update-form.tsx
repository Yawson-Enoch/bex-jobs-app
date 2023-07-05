'use client';

import { useId, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Profile, profileSchema } from '~/lib/validations/auth';
import { useGetUser, useUpdateProfile } from '~/hooks/api/useUser';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

export default function ProfileUpdateForm() {
  const id = useId();

  const { data } = useGetUser();

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    mode: 'onSubmit',
    values: useMemo(() => data?.user, [data]),
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const { mutate, isLoading } = useUpdateProfile();

  const onSubmit: SubmitHandler<Profile> = (data) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid items-start gap-3 md:grid-cols-2 md:gap-6">
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-firstName'}>First Name</Label>
            <Input
              type="text"
              id={id + '-firstName'}
              {...register('firstName')}
              autoComplete="name"
              autoCorrect="off"
              autoFocus
              disabled={isLoading}
            />
          </div>
          {errors.firstName && (
            <small className="text-error-form-foreground">
              {errors.firstName.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-lastName'}>Last Name</Label>
            <Input
              type="text"
              id={id + '-lastName'}
              {...register('lastName')}
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {errors.lastName && (
            <small className="text-error-form-foreground">
              {errors.lastName.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-email'}>Email</Label>
            <Input
              type="text"
              id={id + '-email'}
              {...register('email')}
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <small className="text-error-form-foreground">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label>Action</Label>
          <Button type="submit" disabled={isLoading} className="flex w-full">
            {isLoading ? (
              <LoadingIndicator msg="Updating profile..." />
            ) : (
              'Update Profile'
            )}
          </Button>
        </div>
      </div>
      <DevTool control={control} />
    </form>
  );
}
