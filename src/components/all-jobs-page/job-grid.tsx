import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';

import { Button } from '../ui/button';

export default function JobGrid() {
  return (
    <li className="space-y-3 rounded-lg border bg-slate-500/10 p-3 md:space-y-6 md:p-6">
      <div className="flex gap-3 border-b-4 border-dotted border-accent py-3 md:gap-6">
        <div className="flex aspect-square w-16 items-center justify-center rounded-md bg-primary p-1 text-5xl font-bold text-primary-foreground">
          G
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">Frontend Dev</p>
          <p>Meta</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <MapPinIcon size={15} />
            <span>Location</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDaysIcon size={15} />
            <span>10th June 2010</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <BriefcaseIcon size={15} />
            <span>Type</span>
          </div>
          <span className="rounded-md bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-500 dark:bg-blue-500/10">
            Status
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button className="bg-yellow-500 text-[rgb(248,_250,_252)] dark:bg-yellow-700 [&:not(:disabled)]:hover:bg-yellow-500/90 [&:not(:disabled)]:dark:hover:bg-yellow-700/90">
          Edit
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </li>
  );
}
