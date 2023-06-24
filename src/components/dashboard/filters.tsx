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
  const [resetSelectKey, setResetSelectKey] = useState(Date.now());

  const id = useId();

  const { setQueryParams, deleteQueryParam } = useQueryParams();

  const form = useForm({
    defaultValues: {
      jobStatus: 'all',
      jobType: 'all',
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit: SubmitHandler<Job> = (data) => {
    setQueryParams({ status: data.jobStatus, type: data.jobType });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 gap-1">
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
                    <SelectTrigger id={id + '-jobStatus'} className="h-9">
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
                    <SelectTrigger id={id + '-jobType'} className="h-9">
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
                className="h-9"
                onClick={() => {
                  reset();
                  setResetSelectKey(Date.now());
                  deleteQueryParam('status');
                  deleteQueryParam('type');
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="h-9">
                Apply
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
