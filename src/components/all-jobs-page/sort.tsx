'use client';

import { useId, useState } from 'react';

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

const SORT_OPTIONS = ['latest', 'oldest', 'a-z', 'z-a'];

export default function Sort() {
  const [selectedSortOption, setSelectedSortOption] = useState<string>(
    SORT_OPTIONS[0]
  );

  const { setQueryParams } = useQueryParams();

  const handleSortOptionChange = (value: string) => {
    setSelectedSortOption(value);
    setQueryParams({ sort: value });
  };

  const id = useId();

  return (
    <div className="flex items-center gap-1">
      <Label htmlFor={id + '-sort'}>SORT</Label>
      <Select
        value={selectedSortOption}
        onValueChange={handleSortOptionChange}
        defaultValue={SORT_OPTIONS[0]}
      >
        <SelectTrigger
          id={id + '-sort'}
          className="flex h-9 items-center gap-2"
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
