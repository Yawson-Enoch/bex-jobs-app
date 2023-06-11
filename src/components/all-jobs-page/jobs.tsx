'use client';

import useQueryParams from '~/hooks/useQueryParams';

import JobGrid from './job-grid';
import JobList from './job-list';
import { TViewTypes } from './view-types';

export default function Jobs() {
  const { queryParams } = useQueryParams<{ view: TViewTypes }>();

  return (
    <section className="space-y-6">
      <h4>30 Jobs Found</h4>

      {queryParams.view !== 'list' ? (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          <JobGrid status="interview" />
          <JobGrid status="pending" />
          <JobGrid status="declined" />
          <JobGrid status="interview" />
        </ul>
      ) : (
        <ul className="space-y-3 md:space-y-6">
          <JobList status="interview" />
          <JobList status="pending" />
          <JobList status="declined" />
          <JobList status="interview" />
        </ul>
      )}
    </section>
  );
}
