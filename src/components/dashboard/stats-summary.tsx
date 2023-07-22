'use client';

import { CalendarCheckIcon, CalendarOffIcon, ClockIcon } from 'lucide-react';

import { useGetJobsStats } from '~/hooks/api/useJob';

import Skeleton from '../ui/skeleton';

export default function StatsSummary() {
  const { isLoading, isError, data: stats } = useGetJobsStats();

  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(min(15rem,_100%),_1fr))] gap-3 md:gap-6">
      <div className="space-y-3 rounded-lg border bg-slate-500/10 p-3 md:space-y-6 md:p-6">
        <div className="flex items-center justify-between">
          {isLoading || isError ? (
            <Skeleton className="aspect-video w-16" />
          ) : (
            <p className="text-4xl text-blue-800 dark:text-blue-900 md:text-6xl">
              {stats?.statusStats.interview}
            </p>
          )}
          <CalendarCheckIcon
            aria-hidden="true"
            className="rounded-md bg-blue-100 p-2 text-blue-800 dark:bg-blue-200 dark:text-blue-900"
            size={70}
          />
        </div>
        <p className="text-lg font-medium text-foreground">
          Interviews Scheduled
        </p>
      </div>
      <div className="space-y-3 rounded-lg border bg-slate-500/10 p-3 md:space-y-6 md:p-6">
        <div className="flex items-center justify-between">
          {isLoading || isError ? (
            <Skeleton className="aspect-video w-16" />
          ) : (
            <p className="text-4xl text-yellow-800 dark:text-yellow-900 md:text-6xl">
              {stats?.statusStats.pending}
            </p>
          )}
          <ClockIcon
            aria-hidden="true"
            className="rounded-md bg-yellow-100 p-2 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900"
            size={70}
          />
        </div>
        <p className="text-lg font-medium text-foreground">
          Pending Applications
        </p>
      </div>
      <div className="space-y-3 rounded-lg border bg-slate-500/10 p-3 md:space-y-6 md:p-6">
        <div className="flex items-center justify-between">
          {isLoading || isError ? (
            <Skeleton className="aspect-video w-16" />
          ) : (
            <p className="text-4xl text-red-800 dark:text-red-900 md:text-6xl">
              {stats?.statusStats.declined}
            </p>
          )}
          <CalendarOffIcon
            aria-hidden="true"
            className="rounded-md bg-red-100 p-2 text-red-800 dark:bg-red-200 dark:text-red-900"
            size={70}
          />
        </div>
        <p className="text-lg font-medium text-foreground">Jobs Declined</p>
      </div>
    </section>
  );
}
