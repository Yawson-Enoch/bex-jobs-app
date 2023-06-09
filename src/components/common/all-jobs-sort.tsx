'use client';

import { useId } from 'react';

import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const SORT_OPTIONS = ['latest', 'oldest', 'a-z', 'z-a'];

export default function AllJobsSort() {
  const id = useId();

  return (
    <div className="flex items-center gap-1">
      <Label htmlFor={id + '-sort'}>SORT</Label>
      <Select
      //   onValueChange={field.onChange}
      //   defaultValue={field.value}
      //   key={resetSelectKey}
      >
        <SelectTrigger
          id={id + '-sort'}
          className="flex h-9 items-center gap-2"
        >
          <SelectValue placeholder="Sort option" />
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
    </div>
  );
}
