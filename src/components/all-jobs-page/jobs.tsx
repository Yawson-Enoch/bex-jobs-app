import JobGrid from './job-grid';

export default function Jobs() {
  return (
    <section className="space-y-6">
      <h4>30 Jobs Found</h4>

      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(min(15rem,_100%),_1fr))] gap-3 md:gap-6">
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
        <JobGrid />
      </ul>
    </section>
  );
}
