import { PlusIcon } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

import { Button } from '../ui/button';
import JobForm from './job-form';

export default function AddJobFloatingBtn() {
  return (
    <Dialog>
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <Button
            asChild
            className="max-h-dm fixed bottom-10 right-4 z-30 h-fit w-fit rounded-full p-2 lg:bottom-20"
          >
            <TooltipTrigger asChild>
              <DialogTrigger>
                <PlusIcon className="h-7 w-7" />
              </DialogTrigger>
            </TooltipTrigger>
          </Button>
          <TooltipContent
            side="left"
            align="start"
            alignOffset={10}
            className="relative"
          >
            <span>Add New Job</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="left-1/2 w-[min(calc(100%_-_1rem),_500px)] -translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
        <div className="my-6 space-y-3 rounded-lg border bg-background p-3 md:my-0 md:space-y-6 md:p-6">
          <DialogHeader className="flex flex-row items-start justify-between text-left">
            <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Add New Job
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <JobForm isModal className="grid-cols-1 md:grid-cols-2" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
