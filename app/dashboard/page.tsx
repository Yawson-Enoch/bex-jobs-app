import type { Metadata } from 'next';

import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '@/lib/shared-metadata';
import StatsBarChart from '@/components/common/stats-bar-chart';
import StatsLineChart from '@/components/common/stats-line-chart';
import StatsSummary from '@/components/common/stats-summary';

const title = 'Stats';
const description = 'View your jobs statistics';
const url = '/dashboard';

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

export default function StatsPage() {
  return (
    <div className="space-y-3 md:space-y-5">
      <StatsSummary />
      <StatsBarChart />
      <StatsLineChart />
    </div>
  );
}
