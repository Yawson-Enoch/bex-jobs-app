'use client';

import { useRouter } from 'next/navigation';
import {
  LogInIcon,
  LogOutIcon,
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react';

import useAuth from '~/hooks/useAuth';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { Button } from '../ui/button';

export default function AuthActions() {
  const router = useRouter();
  const { logOut, isLoggedIn } = useAuth();

  return (
    <section>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="aspect-square w-9 rounded-full p-0"
            >
              <UserIcon aria-hidden="true" />
              <span className="sr-only">Profile menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-background dark:bg-background/90 dark:backdrop-blur-sm"
          >
            {!isLoggedIn ? (
              <>
                <DropdownMenuItem onClick={() => router.push('/login')}>
                  <LogInIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/signup')}>
                  <UserPlusIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                  <span>Sign Up</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/profile')}
                >
                  <UserCircleIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full">
                  <AlertDialogTrigger>
                    <LogOutIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent className="grid w-[min(calc(100%_-_1rem),_400px)] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Logout Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to conclude your current session and close the
              page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full sm:w-auto">
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => logOut()}>
              Yes, Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
