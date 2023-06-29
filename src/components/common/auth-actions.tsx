'use client';

import {
  LogInIcon,
  LogOutIcon,
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react';

import useAuth from '~/hooks/useAuth';
import useCustomRouter from '~/hooks/useCustomRouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { Button } from '../ui/button';

export default function AuthActions() {
  const router = useCustomRouter();
  const { logOut, isLoggedIn } = useAuth();

  return (
    <section>
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
              <DropdownMenuItem onClick={() => logOut()}>
                <LogOutIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
