import JobForm from '~/components/dashboard/job-form';

export default function AddJobPage() {
  return (
    <div className="grid h-full content-center">
      <title>Add Job</title>
      <div className="space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
        <h3>Add Job</h3>
        <JobForm />
      </div>
    </div>
  );
}
