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
import Jobs from '~/components/all-jobs-page/jobs';
import PaginationButtons from '~/components/all-jobs-page/pagination-buttons';
import SubHeader from '~/components/all-jobs-page/sub-header';

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
  return (
    <div className="space-y-6 md:space-y-12">
      <SubHeader />
      <Jobs />
      <PaginationButtons />
    </div>
  );
}
