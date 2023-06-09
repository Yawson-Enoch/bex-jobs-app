'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { FilterIcon, GridIcon, ListIcon, SearchIcon } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
import AllJobsSearch from './all-jobs-search';

const STATUS_OPTIONS = ['all', 'pending', 'interview', 'declined'];
const JOB_TYPES = ['all', 'full-time', 'part-time', 'remote', 'internship'];
const SORT_OPTIONS = ['latest', 'oldest', 'a-z', 'z-a'];

const displayStyleAtom = atom<'grid' | 'list'>('grid');

export default function AllJobsSubHeader() {
  const [resetSelectKey, setResetSelectKey] = useState(Date.now());

  const [displayStyle, setDisplayStyle] = useAtom(displayStyleAtom);

  const id = useId();

  const form = useForm({
    defaultValues: {
      jobStatus: 'all',
      jobType: 'all',
      sort: 'latest',
    },
  });
  const { handleSubmit, control, reset } = form;

  const resetAllFormFields = () => {
    reset();
    setResetSelectKey(Date.now());
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
      <AllJobsSearch />

      <div className="flex items-center gap-3 font-medium">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 gap-1">
              <span>Filter</span>
              <FilterIcon size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit bg-background/90 backdrop-blur-sm">
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
                    onClick={resetAllFormFields}
                    className="h-9"
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

        <form noValidate>
          <div className="flex items-center gap-2">
            <Label htmlFor={id + '-sort'}>SORT</Label>
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  key={resetSelectKey}
                >
                  <SelectTrigger
                    id={id + '-sort'}
                    className="flex h-9 items-center gap-2"
                  >
                    <SelectValue placeholder="Select sort option" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-sm">
                    <SelectGroup>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setDisplayStyle('grid')} className="text-sm">
          GRID
        </button>
        <div className="flex h-9 items-center gap-1 rounded-md bg-background p-1">
          <button
            className="relative rounded-sm p-1"
            onClick={() => setDisplayStyle('grid')}
          >
            {displayStyle === 'grid' && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-sm bg-accent"
                layout="position"
                layoutId="display-style"
                transition={{
                  layout: { type: 'spring', duration: 0.5 },
                }}
              />
            )}
            <GridIcon size={20} className="relative z-10" />
          </button>
          <button
            className="relative rounded-sm p-1"
            onClick={() => setDisplayStyle('list')}
          >
            {displayStyle === 'list' && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-sm bg-accent"
                layout="position"
                layoutId="display-style"
                transition={{
                  layout: { type: 'spring', duration: 0.5 },
                }}
              />
            )}
            <ListIcon size={20} className="relative z-10" />
          </button>
        </div>
        <button onClick={() => setDisplayStyle('list')} className="text-sm">
          LIST
        </button>
      </div>
    </section>
  );
}
