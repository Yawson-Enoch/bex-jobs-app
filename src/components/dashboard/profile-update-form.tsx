'use client';

import { useId, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { profileSchema, TProfile } from '~/schemas/auth';
import { useGetUser, useUpdateUserProfile } from '~/hooks/api/useUser';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

export default function ProfileUpdateForm() {
  const id = useId();

  const { data } = useGetUser();

  const form = useForm<TProfile>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    values: useMemo(() => data?.user, [data]),
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors, isDirty, isValid } = formState;

  const updateUserProfileMutation = useUpdateUserProfile();

  const onSubmit: SubmitHandler<TProfile> = (data) => {
    updateUserProfileMutation.mutate(data);
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
              disabled={updateUserProfileMutation.isLoading}
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
              disabled={updateUserProfileMutation.isLoading}
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
              disabled={updateUserProfileMutation.isLoading}
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
          <Button
            type="submit"
            disabled={
              updateUserProfileMutation.isLoading || !isValid || !isDirty
            }
            className="flex w-full"
          >
            {updateUserProfileMutation.isLoading ? (
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
