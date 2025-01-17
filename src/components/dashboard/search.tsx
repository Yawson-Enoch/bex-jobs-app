'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useFilter } from '~/hooks/useQueryParams';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Search() {
  const [filter, setFilter] = useFilter();

  return (
    <div className="group/search grid h-9 grid-cols-[auto,_1fr,_auto] content-center items-center rounded-md bg-muted pl-3 pr-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <SearchIcon
        size={20}
        className="text-muted-foreground group-focus-within/search:text-foreground"
      />
      <Input
        type="search"
        placeholder="Search for job..."
        className="border-0 placeholder:truncate placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
        value={filter.search}
        onChange={(e) => {
          setFilter({
            search: e.target.value,
            page: null,
          });
        }}
      />
      <Button
        variant="ghost"
        className={twMerge(
          'pointer-events-none invisible h-fit rounded-full p-1',
          filter.search !== '' && 'pointer-events-auto visible',
        )}
        onClick={() => {
          setFilter({ search: null, page: null });
        }}
      >
        <XIcon size={17} />
      </Button>
    </div>
  );
}
