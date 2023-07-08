import format from 'date-fns/format';
import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { TJobAPI } from '~/schemas/job';
import { jobStatusColors } from '~/lib/misc';

import DeleteJobBtn from './delete-job-btn';
import EditJobBtn from './edit-job-btn';

export default function JobList({ job }: { job: TJobAPI }) {
  const date = new Date(job.createdAt);
  const formattedDate = format(date, 'do MMMM, yyyy');

  return (
    <li className="grid gap-3 rounded-lg border bg-slate-500/10 p-3 text-xs md:grid-cols-[10rem,_2fr,_1fr] md:justify-between md:gap-6 md:p-6 md:text-base lg:grid-cols-[20rem,_2fr,_1fr]">
      <div className="space-y-3 border-b-4 border-dotted border-accent pb-3 md:border-b-0 md:border-r-4 md:pb-0 md:pr-6">
        <p className="rounded-md bg-primary py-1 text-center text-5xl font-bold text-primary-foreground">
          {job.company.split('')[0]}
        </p>
        <div>
          <p className="truncate text-sm font-medium text-foreground md:text-lg">
            {job.jobPosition}
          </p>
          <p className="truncate">{job.company}</p>
        </div>
      </div>

      <div className="space-y-3 md:my-auto md:h-fit md:space-y-6 md:justify-self-center">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <MapPinIcon size={15} />
            <span>{job.jobLocation}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDaysIcon size={15} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <BriefcaseIcon size={15} />
            <span>{job.jobType}</span>
          </div>
          <span
            className={twMerge(
              'rounded-md px-2.5 py-0.5 text-xs font-medium',
              jobStatusColors[job.jobStatus]
            )}
          >
            {job.jobStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:my-auto md:h-fit md:grid-cols-1">
        <EditJobBtn id={job._id} />
        <DeleteJobBtn id={job._id} />
      </div>
    </li>
  );
}
