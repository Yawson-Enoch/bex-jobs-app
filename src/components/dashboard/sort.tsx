'use client';

import { useId } from 'react';

import useQueryParams from '~/hooks/useQueryParams';

import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const SORT_OPTIONS = ['latest', 'oldest', 'a-z', 'z-a'] as const;
type TSortOption = (typeof SORT_OPTIONS)[number];

export default function Sort() {
  const id = useId();

  const { setQueryParams, queryParams } = useQueryParams<{
    sort: TSortOption;
  }>();

  return (
    <form className="flex items-center gap-2">
      <Label htmlFor={id + '-sort'}>SORT</Label>
      <Select
        value={queryParams?.sort ?? 'latest'}
        onValueChange={(value: TSortOption) => setQueryParams({ sort: value })}
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
