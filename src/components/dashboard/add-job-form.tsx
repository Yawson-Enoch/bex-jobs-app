'use client';

import { useId, useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

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

const STATUS_OPTIONS = ['pending', 'interview', 'declined'] as const;
const JOB_TYPES = ['full-time', 'part-time', 'remote', 'internship'] as const;

const addJobSchema = z.object({
  jobPosition: z
    .string({
      required_error: 'Position is required',
      invalid_type_error: 'Position must be a string',
    })
    .min(2, { message: 'Position must be 2 or more characters long' })
    .max(200, {
      message: 'Position cannot be more than 200 characters long',
    }),
  company: z
    .string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name must be a string',
    })
    .min(2, { message: 'Company name must be 2 or more characters long' })
    .max(100, {
      message: 'Company name cannot be more than 100 characters long',
    }),
  jobLocation: z
    .string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    })
    .min(2, { message: 'Location name must be 2 or more characters long' })
    .max(100, {
      message: 'Location name cannot be more than 200 characters long',
    }),
  jobStatus: z.enum(STATUS_OPTIONS).default('pending'),
  jobType: z.enum(JOB_TYPES, {
    errorMap: () => ({ message: 'Please select job type' }),
  }),
});

type Job = z.infer<typeof addJobSchema>;
type TStatusOption = z.infer<typeof addJobSchema.shape.jobStatus>;
type TJobType = z.infer<typeof addJobSchema.shape.jobType>;

export default function AddJobForm({
  className,
  isModalForm = false,
}: {
  className?: string;
  isModalForm: boolean;
}) {
  const [resetSelectKey, setResetSelectKey] = useState(Date.now());

  const id = useId();

  const form = useForm<Job>({
    resolver: zodResolver(addJobSchema),
    mode: 'onChange',
    defaultValues: {
      jobStatus: 'pending',
    },
  });
  const { register, handleSubmit, formState, control, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const resetAllFormFields = () => {
    reset();
    setResetSelectKey(Date.now());
  };

  const onSubmit: SubmitHandler<Job> = (data): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 2000);
    });
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                  onValueChange={
                    field.onChange as (value: TStatusOption) => void
                  }
                  defaultValue={field.value}
                  key={resetSelectKey}
                >
                  <SelectTrigger id={id + '-jobStatus'}>
                    <SelectValue placeholder="Select job status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-sm">
                    <SelectGroup>
                      {STATUS_OPTIONS.map((status) => (
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
                      {JOB_TYPES.map((type) => (
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
              disabled={isSubmitting}
              onClick={resetAllFormFields}
            >
              Clear
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
            >
              {isSubmitting ? (
                <LoadingIndicator msg="Adding new job..." />
              ) : (
                'Add Job'
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* <DevTool control={control} /> */}
    </form>
  );
}
