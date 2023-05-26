import { CalendarCheckIcon, CalendarOffIcon, ClockIcon } from 'lucide-react';

export default function StatsSummary() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(min(15rem,_100%),_1fr))] gap-3 md:gap-5">
      <div className="space-y-3 rounded-lg border bg-white/30 p-3 dark:bg-white/5 md:space-y-5 md:p-5">
        <div className="flex items-center justify-between">
          <p className="text-4xl text-blue-800 dark:text-blue-900 md:text-6xl">
            77
          </p>
          <CalendarCheckIcon
            className="rounded-md bg-blue-100 p-2 text-blue-800 dark:bg-blue-200 dark:text-blue-900"
            size={70}
          />
        </div>
        <p className="text-lg font-medium">Interviews Scheduled</p>
      </div>
      <div className="space-y-3 rounded-lg border bg-white/30 p-3 dark:bg-white/5 md:space-y-5 md:p-5">
        <div className="flex items-center justify-between">
          <p className="text-4xl text-yellow-800 dark:text-yellow-900 md:text-6xl">
            7
          </p>
          <ClockIcon
            className="rounded-md bg-yellow-100 p-2 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900"
            size={70}
          />
        </div>
        <p className="text-lg font-medium">Pending Applications</p>
      </div>
      <div className="space-y-3 rounded-lg border bg-white/30 p-3 dark:bg-white/5 md:space-y-5 md:p-5">
        <div className="flex items-center justify-between">
          <p className="text-4xl text-red-800 dark:text-red-900 md:text-6xl">
            3
          </p>
          <CalendarOffIcon
            className="rounded-md bg-red-100 p-2 text-red-800 dark:bg-red-200 dark:text-red-900"
            size={70}
          />
        </div>
        <p className="text-lg font-medium">Jobs Declined</p>
      </div>
    </section>
  );
}
