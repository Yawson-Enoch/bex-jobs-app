'use client';

import { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Profile, profileSchema } from '~/lib/validations/auth';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ProfileUpdateForm() {
  const id = useId();

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Profile> = (data): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 2000);
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(min(20rem,_100%),_1fr))] items-start gap-3 md:gap-6">
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            disabled={isSubmitting || !isValid || !isDirty}
            className="flex w-full"
          >
            {isSubmitting ? (
              <div role="status">
                <span className="sr-only">Updating profile...</span>
                <LoaderIcon
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 animate-spin"
                />
              </div>
            ) : (
              'Update Profile'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
