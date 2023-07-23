'use client';

import { useId, useState } from 'react';
import { FilterIcon } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import useQueryParams from '~/hooks/useQueryParams';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const STATUS_OPTIONS = ['all', 'pending', 'interview', 'declined'];
const JOB_TYPES = ['all', 'full-time', 'part-time', 'remote', 'internship'];

type Job = {
  jobStatus: string;
  jobType: string;
};

export default function Filters() {
  const [open, setOpen] = useState(false);
  const [resetSelectKey, setResetSelectKey] = useState(Date.now());

  const id = useId();

  const { setQueryParams, queryParams } = useQueryParams<{
    type: string;
    status: string;
    page: number;
  }>();

  const form = useForm({
    defaultValues: {
      jobStatus: queryParams?.status ?? 'all',
      jobType: queryParams?.type ?? 'all',
    },
    mode: 'onChange',
  });
  const { handleSubmit, control, reset, formState } = form;

  const onSubmit: SubmitHandler<Job> = (data) => {
    setQueryParams({ status: data.jobStatus, type: data.jobType, page: 1 });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-1">
          <span>FILTER</span>
          <FilterIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit bg-background dark:bg-background/90 dark:backdrop-blur-sm"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={id + '-jobStatus'}>Job Status</Label>
              <Controller
                name="jobStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
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
            <div className="space-y-2">
              <Label htmlFor={id + '-jobType'}>Job Type</Label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset({
                    jobStatus: 'all',
                    jobType: 'all',
                  });
                  setResetSelectKey(Date.now());
                  setQueryParams({ status: 'all', type: 'all' });
                }}
                disabled={
                  queryParams.status === 'all' && queryParams.type === 'all'
                }
              >
                Reset
              </Button>
              <Button type="submit" disabled={!formState.isDirty}>
                Apply
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
