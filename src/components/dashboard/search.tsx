'use client';

import { useEffect, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useDebounce from '~/hooks/useDebounce';
import useQueryParams from '~/hooks/useQueryParams';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  const { setQueryParams, deleteQueryParam } = useQueryParams();
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    if (debouncedSearchValue === '') {
      deleteQueryParam('search');
    } else {
      setQueryParams({ search: debouncedSearchValue });
    }
  }, [debouncedSearchValue, deleteQueryParam, setQueryParams]);

  return (
    <div className="group/search grid h-9 grid-cols-[auto,_1fr,_auto] items-center gap-2 rounded-md bg-muted pl-2 pr-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <SearchIcon
        size={20}
        className="text-muted-foreground group-focus-within/search:text-foreground"
      />
      <input
        type="search"
        placeholder="Search job..."
        className="bg-transparent placeholder:truncate placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value.trim())}
      />
      <button
        className={twMerge(
          'pointer-events-none invisible rounded-full border-2 border-transparent p-0.5 focus-visible:border-background focus-visible:outline-none active:border-background',
          searchValue !== '' && 'pointer-events-auto visible'
        )}
        onClick={() => setSearchValue('')}
      >
        <XIcon size={17} />
      </button>
    </div>
  );
}
