import { useSetAtom } from 'jotai';

import { jobIdAtom } from '~/atoms/job-id';
import { useDeleteJob } from '~/hooks/api/useJob';
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

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';

export default function DeleteJobBtn({ id }: { id: string }) {
  const setJobId = useSetAtom(jobIdAtom);

  const deleteJobMutation = useDeleteJob();

  return (
    <AlertDialog>
      <Button
        asChild
        variant="destructive"
        className="w-full"
        onClick={() => setJobId(id)}
      >
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
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
          <AlertDialogAction onClick={() => deleteJobMutation.mutate()}>
            {deleteJobMutation.isLoading ? (
              <LoadingIndicator msg="Deleting job" />
            ) : (
              'Yes, Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
