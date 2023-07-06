'use client';

import { useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import {
  JOB_STATUS,
  JOB_TYPE,
  jobSchema,
  TJob,
  TJobStatus,
  TJobType,
} from '~/schemas/job';
import { useAddJob } from '~/hooks/api/useJob';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

export default function AddJobForm({
  className,
  isJobEdit = false,
  isModal = false,
}: {
  className?: string;
  isJobEdit?: boolean;
  isModal?: boolean;
}) {
  const [resetSelectKey, setResetSelectKey] = useState(Date.now());

  const id = useId();

  const form = useForm<TJob>({
    resolver: zodResolver(jobSchema),
    mode: 'onChange',
    defaultValues: {
      jobStatus: 'pending',
    },
  });
  const { register, handleSubmit, formState, control, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const resetAllFormFields = () => {
    reset();
    setResetSelectKey(Date.now());
  };

  const { mutate, isLoading } = useAddJob();

  const onSubmit: SubmitHandler<TJob> = (data) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div
        className={twMerge(
          'grid grid-cols-[repeat(auto-fit,_minmax(min(15rem,_100%),_1fr))] items-start gap-3 md:gap-6',
          className
        )}
      >
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-jobPosition'}>Job Position</Label>
            <Input
              type="text"
              id={id + '-jobPosition'}
              {...register('jobPosition')}
              autoFocus
              disabled={isLoading}
            />
          </div>
          {errors.jobPosition && (
            <small className="text-error-form-foreground">
              {errors.jobPosition.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-company'}>Company</Label>
            <Input
              type="text"
              id={id + '-company'}
              {...register('company')}
              disabled={isLoading}
            />
          </div>
          {errors.company && (
            <small className="text-error-form-foreground">
              {errors.company.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-jobLocation'}>Job Location</Label>
            <Input
              type="text"
              id={id + '-jobLocation'}
              {...register('jobLocation')}
              disabled={isLoading}
            />
          </div>
          {errors.jobLocation && (
            <small className="text-error-form-foreground">
              {errors.jobLocation.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-jobStatus'}>Job Status</Label>
            <Controller
              name="jobStatus"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange as (value: TJobStatus) => void}
                  defaultValue={field.value}
                  key={resetSelectKey}
                >
                  <SelectTrigger id={id + '-jobStatus'}>
                    <SelectValue placeholder="Select job status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-sm">
                    <SelectGroup>
                      {JOB_STATUS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.jobStatus && (
            <small className="text-error-form-foreground">
              {errors.jobStatus.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <div className="space-y-2">
            <Label htmlFor={id + '-jobType'}>Job Type</Label>
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange as (value: TJobType) => void}
                  key={resetSelectKey}
                >
                  <SelectTrigger id={id + '-jobType'}>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-sm">
                    <SelectGroup>
                      {JOB_TYPE.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.jobType && (
            <small className="text-error-form-foreground">
              {errors.jobType.message}
            </small>
          )}
        </div>
        <div className="space-y-2">
          <Label>Actions</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={resetAllFormFields}
            >
              Clear
            </Button>
            <Button type="submit" disabled={isLoading || !isValid || !isDirty}>
              {isLoading ? (
                <LoadingIndicator msg="Adding new job..." />
              ) : (
                'Add Job'
              )}
            </Button>
          </div>
        </div>
      </div>
      {!isModal && <DevTool control={control} />}
    </form>
  );
}
