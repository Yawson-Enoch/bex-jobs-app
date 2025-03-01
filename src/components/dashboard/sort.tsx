'use client';

import { useId } from 'react';

import { SORT_OPTIONS } from '~/lib/contants';
import { useFilter } from '~/hooks/useQueryParams';

import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type TSortOption = (typeof SORT_OPTIONS)[number];

export default function Sort() {
  const id = useId();

  const [filter, setFilter] = useFilter();

  return (
    <form className="flex items-center gap-2">
      <Label htmlFor={id + '-sort'}>SORT</Label>
      <Select
        value={filter.sort}
        onValueChange={(value: TSortOption) => setFilter({ sort: value })}
      >
        <SelectTrigger id={id + '-sort'} className="flex items-center gap-1">
          <SelectValue placeholder="Sort option" />
        </SelectTrigger>
        <SelectContent className="bg-background dark:bg-background/90 dark:backdrop-blur-sm">
          <SelectGroup>
            {SORT_OPTIONS.map((sortOption) => (
              <SelectItem key={sortOption} value={sortOption}>
                {sortOption}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
}
