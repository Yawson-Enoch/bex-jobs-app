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

import { Button } from '../ui/button';

export default function DeleteJobBtn() {
  return (
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
  );
}
