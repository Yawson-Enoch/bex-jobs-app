'use client';

import { useId, useState } from 'react';
import { FilterIcon } from 'lucide-react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { STATUS_OPTIONS, TYPE_OPTIONS } from '~/lib/contants';
import { useFilter } from '~/hooks/useQueryParams';

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

type Job = {
  jobStatus: (typeof STATUS_OPTIONS)[number];
  jobType: (typeof TYPE_OPTIONS)[number];
};

export default function Filters() {
  const [filter, setFilter] = useFilter();

  const [open, setOpen] = useState(false);
  const [resetSelectKey, setResetSelectKey] = useState(
    filter.status + filter.type,
  );

  const id = useId();

  const form = useForm({
    defaultValues: {
      jobStatus: filter.status || 'all',
      jobType: filter.type || 'all',
    },
    mode: 'onChange',
  });

  const [status, type] = useWatch({
    control: form.control,
    name: ['jobStatus', 'jobType'],
  });

  const onSubmit: SubmitHandler<Job> = (data) => {
    setFilter({ status: data.jobStatus, type: data.jobType, page: null });
    form.reset({ jobStatus: status, jobType: type });
    setResetSelectKey(status + type);
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
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={id + '-jobStatus'}>Job Status</Label>
              <Controller
                name="jobStatus"
                control={form.control}
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
                control={form.control}
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
                        {TYPE_OPTIONS.map((type) => (
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
                  setFilter({ status: null, type: null, page: null });
                  form.reset({ jobStatus: 'all', jobType: 'all' });
                  setResetSelectKey(status + type);
                  setOpen(false);
                }}
                disabled={status === 'all' && type === 'all'}
              >
                Reset
              </Button>
              <Button type="submit" disabled={!form.formState.isDirty}>
                Apply
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
