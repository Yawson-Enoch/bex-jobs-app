'use client';

import { useEffect, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useDebounce from '~/hooks/useDebounce';
import useQueryParams from '~/hooks/useQueryParams';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  const { setQueryParams, deleteQueryParam } = useQueryParams();
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    if (debouncedSearchValue === '') {
      deleteQueryParam('search');
    } else {
      setQueryParams({ search: debouncedSearchValue, page: 1 });
    }
  }, [debouncedSearchValue, deleteQueryParam, setQueryParams]);

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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value.trim())}
      />
      <Button
        variant="ghost"
        className={twMerge(
          'pointer-events-none invisible h-fit rounded-full p-1',
          searchValue !== '' && 'pointer-events-auto visible',
        )}
        onClick={() => setSearchValue('')}
      >
        <XIcon size={17} />
      </Button>
    </div>
  );
}
