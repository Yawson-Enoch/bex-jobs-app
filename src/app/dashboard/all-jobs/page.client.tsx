'use client';

import { useGetJobs } from '~/hooks/api/useJob';
import useQueryParams from '~/hooks/useQueryParams';
import ErrorDisplay from '~/components/common/error-display';
import LoadingIndicator from '~/components/common/loading-indicator';
import Filters from '~/components/dashboard/filters';
import Jobs from '~/components/dashboard/jobs';
import PaginationButtons from '~/components/dashboard/pagination-buttons';
import Search from '~/components/dashboard/search';
import Sort from '~/components/dashboard/sort';
import ViewTypes from '~/components/dashboard/view-types';

export default function AllJobsPageClient() {
  const { combinedQueryParams } = useQueryParams();

  const params = combinedQueryParams();

  const { isLoading, isError, error } = useGetJobs(params);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingIndicator msg="Fetching jobs..." type="both" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorDisplay msg={error.message} />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6 [&>*]:grow [&>*]:lg:grow-0">
        <Search />
        <div className="flex items-center gap-3 font-medium">
          <Filters />
          <Sort />
        </div>
        <ViewTypes />
      </div>
      <Jobs />
      <PaginationButtons />
    </div>
  );
}
