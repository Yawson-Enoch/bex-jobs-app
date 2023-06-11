'use client';

import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';

import useDebounce from '~/hooks/useDebounce';
import useQueryParams from '~/hooks/useQueryParams';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  const { setQueryParams, deleteQueryParam } = useQueryParams();
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    if (debouncedSearchValue.trim() === '') {
      deleteQueryParam('search');
    } else {
      setQueryParams({ search: debouncedSearchValue });
    }
  }, [debouncedSearchValue, deleteQueryParam, setQueryParams]);

  return (
    <div className="group/search flex h-9 items-center gap-2 rounded-md bg-muted px-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <SearchIcon
        size={20}
        className="text-muted-foreground group-focus-within/search:text-foreground"
      />
      <input
        type="search"
        placeholder="Search job..."
        className="h-full w-full bg-transparent placeholder:truncate placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
