import format from 'date-fns/format';
import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { TJob } from '~/hooks/api/useJob';

import DeleteJobBtn from './delete-job-btn';
import EditJobBtn from './edit-job-btn';
import { statusColors } from './job-list';

export default function JobGrid({ job }: { job: TJob }) {
  const date = new Date(job.createdAt);
  const formattedDate = format(date, 'do MMMM, yyyy');

  return (
    <li className="space-y-3 rounded-lg border bg-slate-500/10 p-3 text-xs md:p-6 md:text-base">
      <div className="space-y-3 border-b-4 border-dotted border-accent pb-3">
        <p className="rounded-md bg-primary py-1 text-center text-5xl font-bold text-primary-foreground">
          {job.company.split('')[0]}
        </p>
        <div>
          <p className="text-sm font-medium text-foreground md:text-lg">
            {job.jobPosition}
          </p>
          <p>{job.company}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <MapPinIcon size={15} />
          <span className="truncate">{job.jobLocation}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDaysIcon size={15} />
          <span className="truncate">{formattedDate}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <BriefcaseIcon size={15} />
            <span className="truncate">{job.jobType}</span>
          </div>
          <span
            className={twMerge(
              'rounded-md px-2.5 py-0.5 text-xs font-medium',
              statusColors[job.jobStatus]
            )}
          >
            {job.jobStatus}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <EditJobBtn />
        <DeleteJobBtn />
      </div>
    </li>
  );
}
