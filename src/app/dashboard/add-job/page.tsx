import type { Metadata } from 'next';

import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '~/lib/shared-metadata';
import JobForm from '~/components/dashboard/job-form';

const title = 'Add A New Job';
const description =
  'Just applied to a new job? Add it to easily track its progress';
const url = '/dashboard/add-job';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
    title,
    description,
    url,
  },
  twitter: {
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
    title,
    description,
  },
  alternates: {
    canonical: url,
  },
};

export default function AddJobPage() {
  return (
    <div className="grid h-full content-center">
      <div className="space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
        <h3>Add Job</h3>
        <JobForm />
      </div>
    </div>
  );
}
