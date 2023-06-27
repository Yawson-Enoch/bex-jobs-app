'use client';

import { useRouter } from 'next/navigation';
import { atom, useAtom } from 'jotai';
import { LogOutIcon, MenuIcon, UserCircleIcon, UserIcon } from 'lucide-react';

import useGetUser from '~/hooks/api/useUser';
import useAuth from '~/hooks/useAuth';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import ErrorDisplay from '~/components/common/error-display';
import LoadingIndicator from '~/components/common/loading-indicator';
import TabsThemeToggler from '~/components/common/tabs-theme-toggler';

export const isMobileNavbarOpenAtom = atom(false);

export default function Header() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useAtom(
    isMobileNavbarOpenAtom
  );

  const { logOut } = useAuth();

  const router = useRouter();

  const { data, isLoading, isError, error } = useGetUser();

  return (
    <header className="dashboard-header sticky top-0 z-10 h-16 border-b bg-background/70 backdrop-blur-sm">
      <div className="container flex h-full items-center justify-between gap-3">
        <button
          aria-expanded={isMobileNavbarOpen}
          aria-controls="mobile-navbar"
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsMobileNavbarOpen(true)}
        >
          <span className="sr-only">Open Mobile Nav</span>
          <MenuIcon aria-hidden="true" />
        </button>
        {isLoading ? (
          <LoadingIndicator msg="Fetching user..." />
        ) : isError ? (
          <ErrorDisplay msg={error.message} />
        ) : (
          <p className="text-xl font-medium">
            Hi, <span className="text-foreground">{data.user.firstName}</span>
          </p>
        )}
        <div className="flex items-center gap-3 md:gap-6">
          <TabsThemeToggler />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="w-9 rounded-full px-0"
              >
                <UserIcon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Profile menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background dark:bg-background/90 dark:backdrop-blur-sm"
            >
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
