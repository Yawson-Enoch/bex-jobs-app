import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { Button } from '../ui/button';
import AddJobForm from './add-job-form';

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 text-[rgb(248,_250,_252)] dark:bg-yellow-700 [&:not(:disabled)]:hover:bg-yellow-500/90 [&:not(:disabled)]:dark:hover:bg-yellow-700/90">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="left-1/2 w-[min(calc(100%_-_1rem),_500px)] -translate-x-1/2 py-3 md:top-1/2 md:-translate-y-1/2 md:py-6">
            <div className="space-y-3 rounded-lg border bg-background p-3 md:space-y-6 md:p-6">
              <DialogHeader className="flex flex-row items-start justify-between text-left">
                <div>
                  <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Edit Job
                  </DialogTitle>
                  <DialogDescription>Make changes to job.</DialogDescription>
                </div>
                <DialogClose />
              </DialogHeader>
              <AddJobForm isModalForm className="grid-cols-1 md:grid-cols-2" />
            </div>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive" className="w-full">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="grid w-[min(calc(100%_-_1rem),_400px)] justify-items-center rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                Delete Job Confirmation
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this job?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full sm:w-auto">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Yes, Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
