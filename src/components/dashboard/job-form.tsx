'use client';

import { useEffect, useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { Job, JobStatus, JobType } from '~/schemas/job';
import { JOB_STATUS, JOB_TYPE } from '~/lib/contants';
import { jobIdAtom } from '~/atoms/job-id';
import { useAddJob, useEditJob, useGetJob } from '~/hooks/api/useJobs';

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

  const { data: job } = useGetJob();

  const form = useForm<Job>({
    resolver: zodResolver(Job),
    mode: isJobEdit ? 'onChange' : 'onSubmit',
    defaultValues: {
      jobStatus: job?.data.jobStatus ?? 'pending',
      jobType: job?.data.jobType ?? 'remote',
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
  const jobId = useAtomValue(jobIdAtom);

  const onSubmit: SubmitHandler<Job> = (data) => {
    isJobEdit
      ? editJobMutation.mutate({ jobId, data })
      : addJobMutation.mutate(data, {
          onSuccess() {
            resetAllFormFields();
          },
        });
  };

  useEffect(() => {
    if (isJobEdit && job) {
      const newData = Job.parse(job.data);
      reset(newData);
      setResetSelectKey(Date.now());
    }
  }, [job, isJobEdit, reset]);

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
                isJobEdit ? editJobMutation.isPending : addJobMutation.isPending
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
                isJobEdit ? editJobMutation.isPending : addJobMutation.isPending
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
                isJobEdit ? editJobMutation.isPending : addJobMutation.isPending
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
                  onValueChange={field.onChange as (value: JobStatus) => void}
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
                  onValueChange={field.onChange as (value: JobType) => void}
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
                disabled={editJobMutation.isPending || !isDirty}
                onClick={resetAllFormFields}
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={editJobMutation.isPending || !isValid || !isDirty}
              >
                {editJobMutation.isPending ? (
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
                disabled={addJobMutation.isPending || !isDirty}
                onClick={resetAllFormFields}
              >
                Clear
              </Button>
              <Button type="submit" disabled={addJobMutation.isPending}>
                {addJobMutation.isPending ? (
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
