'use client';

import { TViewType } from '~/lib/types';
import { useGetJobs } from '~/hooks/api/useJob';
import useQueryParams from '~/hooks/useQueryParams';

import Skeleton from '../ui/skeleton';
import JobGrid from './job-grid';
import JobList from './job-list';

export default function Jobs() {
  const { queryParams } = useQueryParams<{ view: TViewType }>();

  const { isLoading, isError, data: jobs } = useGetJobs();

  return (
    <section className="space-y-6">
      {isLoading || isError ? (
        <Skeleton className="h-5 w-32" />
      ) : (
        <h4>{jobs?.paginatedData.totalNumberOfJobs ?? 0} Jobs Found</h4>
      )}

      {queryParams.view !== 'list' ? (
        isLoading || isError ? (
          <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {Array(3)
              .fill('')
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[200px] w-full md:h-[330px]"
                />
              ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {jobs?.paginatedData.currentPageJobs.map((job) => {
              return <JobGrid key={job._id} job={job} />;
            })}
          </ul>
        )
      ) : isLoading || isError ? (
        <ul className="space-y-3 md:space-y-6">
          {Array(3)
            .fill('')
            .map((_, index) => (
              <Skeleton key={index} className="h-[100px] w-full md:h-[150px]" />
            ))}
        </ul>
      ) : (
        <ul className="space-y-3 md:space-y-6">
          {jobs?.paginatedData.currentPageJobs.map((job) => {
            return <JobList key={job._id} job={job} />;
          })}
        </ul>
      )}
    </section>
  );
}
