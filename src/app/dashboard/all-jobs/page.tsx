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

const title = 'All Jobs';
const description = 'Manage your jobs - View, edit and delete your jobs';
const url = '/dashboard/all-jobs';

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

export default function AllJobsPage() {
  return <p>This is the all jobs page</p>;
}
