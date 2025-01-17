'use client';

import { useId, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Profile } from '~/schemas/auth';
import { useGetUser, useUpdateUserProfile } from '~/hooks/api/useUser';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ProfileUpdateForm() {
  const id = useId();

  const { data: user } = useGetUser();

  const form = useForm<Profile>({
    resolver: zodResolver(Profile),
    mode: 'onChange',
    values: useMemo(() => user?.data, [user]),
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const updateUserProfileMutation = useUpdateUserProfile();

  const onSubmit: SubmitHandler<Profile> = (data) => {
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
              disabled={updateUserProfileMutation.isPending}
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
              disabled={updateUserProfileMutation.isPending}
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
              disabled={updateUserProfileMutation.isPending}
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
              updateUserProfileMutation.isPending || !isValid || !isDirty
            }
            className="flex w-full"
          >
            {updateUserProfileMutation.isPending ? (
              <LoadingIndicator msg="Updating profile..." />
            ) : (
              'Update Profile'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
