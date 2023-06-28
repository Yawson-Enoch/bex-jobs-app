import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import DeleteJobBtn from './delete-job-btn';
import EditJobBtn from './edit-job-btn';

export const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500 dark:bg-yellow-500/10',
  interview: 'bg-blue-500/20 text-blue-500 dark:bg-blue-500/10',
  declined: 'bg-red-500/20 text-red-500 dark:bg-red-500/10',
};

export default function JobList({
  status,
}: {
  status: keyof typeof statusColors;
}) {
  return (
    <li className="grid gap-3 rounded-lg border bg-slate-500/10 p-3 text-xs md:grid-cols-[auto,_2fr,1fr] md:justify-between md:gap-6 md:p-6 md:text-base">
      <div className="space-y-3 border-b-4 border-dotted border-accent pb-3 md:border-b-0 md:border-r-4 md:pb-0 md:pr-6">
        <p className="rounded-md bg-primary py-1 text-center text-5xl font-bold text-primary-foreground">
          G
        </p>
        <div>
          <p className="text-sm font-medium text-foreground md:text-lg">
            Frontend Dev
          </p>
          <p>Meta</p>
        </div>
      </div>

      <div className="space-y-3 md:my-auto md:h-fit md:space-y-6 md:justify-self-center">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <MapPinIcon size={15} />
            <span>Location</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDaysIcon size={15} />
            <span>10th June 2010</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <BriefcaseIcon size={15} />
            <span>Type</span>
          </div>
          <span
            className={twMerge(
              'rounded-md px-2.5 py-0.5 text-xs font-medium',
              statusColors[status]
            )}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:my-auto md:h-fit md:grid-cols-1">
        <EditJobBtn />
        <DeleteJobBtn />
      </div>
    </li>
  );
}
