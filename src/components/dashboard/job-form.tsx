'use client';

import { useEffect, useId, useState } from 'react';
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
import { useAddJob, useEditJob, useGetJob } from '~/hooks/api/useJob';

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
  { ssr: false },
);

export default function JobForm({
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

  const { data } = useGetJob();

  const form = useForm<TJob>({
    resolver: zodResolver(jobSchema),
    mode: isJobEdit ? 'onChange' : 'onSubmit',
    /* 
    - must set default values for controller inputs 
    - so the reset(re-rendering) picks the default value 
    */
    defaultValues: {
      jobStatus: data?.job.jobStatus ?? 'pending',
      jobType: data?.job.jobType ?? 'remote',
    },
  });
  const { register, handleSubmit, formState, control, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const resetAllFormFields = () => {
    reset();
    setResetSelectKey(Date.now());
  };

  const addJobMutation = useAddJob();
  const editJobMutation = useEditJob();

  const onSubmit: SubmitHandler<TJob> = (data) => {
    isJobEdit ? editJobMutation.mutate(data) : addJobMutation.mutate(data);
  };

  useEffect(() => {
    if (isJobEdit && data) {
      const newData = jobSchema.parse(data.job);
      reset(newData);
      setResetSelectKey(Date.now());
    }
  }, [data, isJobEdit, reset]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div
        className={twMerge(
          'grid grid-cols-[repeat(auto-fit,_minmax(min(15rem,_100%),_1fr))] items-start gap-3 md:gap-6',
          className,
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
              disabled={
                isJobEdit ? editJobMutation.isLoading : addJobMutation.isLoading
              }
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
              disabled={
                isJobEdit ? editJobMutation.isLoading : addJobMutation.isLoading
              }
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
              disabled={
                isJobEdit ? editJobMutation.isLoading : addJobMutation.isLoading
              }
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
                  defaultValue={field.value}
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
          {isJobEdit ? (
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={editJobMutation.isLoading || !isDirty}
                onClick={resetAllFormFields}
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={editJobMutation.isLoading || !isValid || !isDirty}
              >
                {editJobMutation.isLoading ? (
                  <LoadingIndicator msg={'Editing job...'} />
                ) : (
                  'Edit Job'
                )}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={addJobMutation.isLoading || !isDirty}
                onClick={resetAllFormFields}
              >
                Clear
              </Button>
              <Button type="submit" disabled={addJobMutation.isLoading}>
                {addJobMutation.isLoading ? (
                  <LoadingIndicator msg={'Adding job...'} />
                ) : (
                  'Add Job'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
      {!isModal && <DevTool control={control} />}
    </form>
  );
}
