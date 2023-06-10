import JobGrid from './job-grid';
import JobList from './job-list';

export default function Jobs() {
  return (
    <section className="space-y-6">
      <h4>30 Jobs Found</h4>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
      </ul>
      <ul className="space-y-3 md:space-y-6">
        <JobList />
        <JobList />
        <JobList />
        <JobList />
      </ul>
    </section>
  );
}
