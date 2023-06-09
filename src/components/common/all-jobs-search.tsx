'use client';

import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';

import useDebounce from '~/hooks/useDebounce';
import useQueryParams from '~/hooks/useQueryParams';

export default function AllJobsSearch() {
  const [searchValue, setSearchValue] = useState('');

  const { setQueryParams } = useQueryParams();
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    setQueryParams({ search: debouncedSearchValue });
  }, [debouncedSearchValue, setQueryParams]);

  return (
    <div className="group/search flex h-9 items-center gap-2 rounded-md border border-input p-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <SearchIcon
        size={20}
        className="text-muted-foreground group-focus-within/search:text-foreground"
      />
      <input
        type="search"
        placeholder="Search..."
        className="h-full w-full bg-transparent placeholder:truncate placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
