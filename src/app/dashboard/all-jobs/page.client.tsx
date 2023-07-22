'use client';

import Link from 'next/link';

import { useGetJobs } from '~/hooks/api/useJob';
import Skeleton from '~/components/ui/skeleton';
import Filters from '~/components/dashboard/filters';
import Jobs from '~/components/dashboard/jobs';
import PaginationButtons from '~/components/dashboard/pagination-buttons';
import Search from '~/components/dashboard/search';
import Sort from '~/components/dashboard/sort';
import ViewTypes from '~/components/dashboard/view-types';

export default function AllJobsPageClient() {
  const { isLoading, isError, isSuccess, data } = useGetJobs();

  if (isSuccess && data.paginatedData.totalNumberOfJobs === 0) {
    return (
      <p>
        You have no jobs available,
        <Link
          href="/dashboard/add-job"
          className="font-medium text-foreground underline underline-offset-4"
        >
          add a job
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-6 md:space-y-12">
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
      <Jobs />
      {isLoading || isError ? (
        <Skeleton className="h-9 w-full" />
      ) : (
        <PaginationButtons />
      )}
    </div>
  );
}
