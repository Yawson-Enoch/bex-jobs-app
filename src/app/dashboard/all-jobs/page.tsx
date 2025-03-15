'use client';

import { InfoIcon } from 'lucide-react';

import { useGetJobs } from '~/hooks/api/useJobs';
import Skeleton from '~/components/ui/skeleton';
import Filters from '~/components/dashboard/filters';
import Jobs from '~/components/dashboard/jobs';
import PaginationButtons from '~/components/dashboard/pagination-buttons';
import Search from '~/components/dashboard/search';
import Sort from '~/components/dashboard/sort';
import ViewTypes from '~/components/dashboard/view-types';

export default function AllJobsPageClient() {
  const { isLoading, isError, isSuccess, data: jobs } = useGetJobs();

  function Content() {
    if (isSuccess && jobs.data.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <InfoIcon className="mx-auto size-14" />
          <p className="mt-3 text-center font-sans text-xl font-medium text-foreground md:text-2xl">
            Oops! No matches.
          </p>
          <p>Adjust your filter or modify your search query.</p>
        </div>
      );
    }
    return <Jobs />;
  }

  return (
    <div className="flex h-full flex-col space-y-6 md:space-y-12">
      <title>All Jobs</title>
      {isLoading || isError ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-9" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 grow" />
            <Skeleton className="h-9 grow" />
          </div>
          <Skeleton className="h-9" />
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6 [&>*]:grow [&>*]:lg:grow-0">
          <Search />
          <div className="flex items-center gap-3 font-medium">
            <Filters />
            <Sort />
          </div>
          <ViewTypes />
        </div>
      )}

      <Content />

      {isLoading || isError ? (
        <Skeleton className="h-9 w-full" />
      ) : (
        <PaginationButtons />
      )}
    </div>
  );
}
