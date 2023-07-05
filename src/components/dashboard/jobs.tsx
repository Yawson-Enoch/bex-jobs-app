'use client';

import { useGetJobs } from '~/hooks/api/useJob';
import useQueryParams from '~/hooks/useQueryParams';

import JobGrid from './job-grid';
import JobList from './job-list';
import { TViewTypes } from './view-types';

export default function Jobs() {
  const { queryParams } = useQueryParams<{ view: TViewTypes }>();
  const { combinedQueryParams } = useQueryParams();

  const params = combinedQueryParams();

  const { data: jobs } = useGetJobs(params);

  return (
    <section className="space-y-6">
      <h4>{jobs?.paginatedData?.totalNumberOfJobs ?? 0} Jobs Found</h4>

      {queryParams.view !== 'list' ? (
        <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
          {jobs?.paginatedData.currentPageJobs.map((job) => {
            return <JobGrid key={job._id} job={job} />;
          })}
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
