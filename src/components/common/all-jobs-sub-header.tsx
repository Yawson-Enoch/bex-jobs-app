import AllJobsDisplay from './all-jobs-display';
import AllJobsFilters from './all-jobs-filters';
import AllJobsSearch from './all-jobs-search';
import AllJobsSort from './all-jobs-sort';

export default function AllJobsSubHeader() {
  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
      <AllJobsSearch />

      <div className="flex items-center gap-3 font-medium">
        <AllJobsFilters />
        <AllJobsSort />
      </div>

      <AllJobsDisplay />
    </section>
  );
}
