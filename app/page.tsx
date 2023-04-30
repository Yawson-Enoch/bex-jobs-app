import { Button } from '@/components/ui/button';

export default function IndexPage() {
  return (
    <section className="container space-y-7 py-5 text-center">
      <h1 className="text-2xl font-bold lg:text-4xl">
        BexJobs - Effortlessly Manage Your Job Search
      </h1>
      <p className="text-muted-foreground lg:text-lg">
        BexJobs is a user-friendly job search management tool designed to help
        you keep track of all your job applications in one place. With BexJobs,
        you can easily add job listings and track their status, whether
        it&apos;s pending, interview scheduled, or declined. Say goodbye to the
        hassle of managing your job search with spreadsheets or sticky notes,
        and say hello to BexJobs - your ultimate job search companion.
      </p>
      <Button>Start Managing Your Jobs</Button>
    </section>
  );
}
