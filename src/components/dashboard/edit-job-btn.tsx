import { useSetAtom } from 'jotai';

import { jobIdAtom } from '~/atoms/job-id';
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
import JobForm from './job-form';

export default function EditJobBtn({ id }: { id: string }) {
  const setJobId = useSetAtom(jobIdAtom);

  return (
    <Dialog>
      <Button
        asChild
        className="bg-yellow-500 text-[rgb(248,_250,_252)] hover:bg-yellow-500/90 dark:bg-yellow-700 dark:hover:bg-yellow-700/90"
        onClick={() => setJobId(id)}
      >
        <DialogTrigger>Edit</DialogTrigger>
      </Button>
      <DialogContent className="left-1/2 w-[min(calc(100%_-_1rem),_500px)] -translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
        <div className="my-6 space-y-3 rounded-lg border bg-background p-3 md:my-0 md:space-y-6 md:p-6">
          <DialogHeader className="flex flex-row items-start justify-between text-left">
            <div>
              <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Edit Job
              </DialogTitle>
              <DialogDescription>Make changes to job.</DialogDescription>
            </div>
            <DialogClose />
          </DialogHeader>
          <JobForm isModal isJobEdit className="grid-cols-1 md:grid-cols-2" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
