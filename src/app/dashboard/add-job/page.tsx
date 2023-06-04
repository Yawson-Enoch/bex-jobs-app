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
import AddJobForm from '~/components/common/add-job-form';
import AnimatedCharacters from '~/components/common/animated-characters';

const title = 'Add A New Job';
const description =
  'Just applied to a new job? Add it to easily track its progress';
const url = '/dashboard/add-job';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
  },
  twitter: {
    title,
    description,
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
  },
  alternates: {
    canonical: url,
  },
};

export default function AddJobPage() {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-background/70 p-3 md:space-y-6 md:p-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Add Job
      </h3>
      <AddJobForm />
    </div>
  );
}
