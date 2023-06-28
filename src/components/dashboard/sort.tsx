'use client';

import { useEffect, useId, useState } from 'react';

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
  const { setQueryParams, queryParams } = useQueryParams<{
    sort: TSortOption;
  }>();

  const { sort } = queryParams;

  const [selectedSortOption, setSelectedSortOption] = useState<TSortOption>(
    sort ? sort : SORT_OPTIONS[0]
  );

  useEffect(() => {
    if (!sort) {
      setQueryParams({ sort: selectedSortOption });
    }
  }, [selectedSortOption, setQueryParams, sort]);

  const handleSortOptionChange = (value: TSortOption) => {
    setSelectedSortOption(value);
    setQueryParams({ sort: value });
  };

  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={id + '-sort'}>SORT</Label>
      <Select
        value={selectedSortOption}
        onValueChange={handleSortOptionChange}
        defaultValue={selectedSortOption}
      >
        <SelectTrigger
          id={id + '-sort'}
          className="flex w-[5.5rem] items-center gap-1"
        >
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
    </div>
  );
}
