'use client';

import { useGetJobs } from '~/hooks/api/useJob';
import { useView } from '~/hooks/useQueryParams';

import Skeleton from '../ui/skeleton';
import JobGrid from './job-grid';
import JobList from './job-list';

export default function Jobs() {
  const [view] = useView();

  const { isLoading, isError, data: jobs } = useGetJobs();

  return (
    <section className="space-y-6">
      {isLoading || isError ? (
        <Skeleton className="h-5 w-32" />
      ) : (
        <h4>{jobs?.pagination.totalJobs || 0} Jobs Found</h4>
      )}

      {view !== 'list' ? (
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
            {jobs?.data.map((job) => {
              return <JobGrid key={job.id} job={job} />;
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
          {jobs?.data.map((job) => {
            return <JobList key={job.id} job={job} />;
          })}
        </ul>
      )}
    </section>
  );
}
