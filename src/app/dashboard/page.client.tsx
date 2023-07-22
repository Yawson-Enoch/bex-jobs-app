'use client';

import Link from 'next/link';

import { useGetJobsStats } from '~/hooks/api/useJob';
import ChartsContainer from '~/components/dashboard/charts-container';
import StatsSummary from '~/components/dashboard/stats-summary';

export default function StatsPageClient() {
  const { isSuccess, data: stats } = useGetJobsStats();

  if (isSuccess && stats.monthlyApplications.length === 0) {
    return (
      <p>
        You have no jobs available,
        <Link
          href="/dashboard/add-job"
          className="font-medium text-foreground underline underline-offset-4"
        >
          add a job
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-6 md:space-y-12">
      <StatsSummary />
      <ChartsContainer />
    </div>
  );
}
