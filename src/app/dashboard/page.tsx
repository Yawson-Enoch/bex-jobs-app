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
import ChartsContainer from '~/components/dashboard/charts-container';
import StatsSummary from '~/components/dashboard/stats-summary';

const title = 'Stats';
const description = 'View your jobs statistics';
const url = '/dashboard';

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

export default function StatsPage() {
  return (
    <div className="space-y-6 md:space-y-12">
      <StatsSummary />
      <ChartsContainer />
    </div>
  );
}
